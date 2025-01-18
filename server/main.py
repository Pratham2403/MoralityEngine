from fastapi import FastAPI
from fastapi.responses import JSONResponse
import math
import json

# Import the necessary functions
from Agents.converter_agent import convert_json
from Agents.master_agents import initiate_masters
from Agents.logic_summariser import summarise_concept
from Agents.frontend_handler import frontend_generator

# Initialize the FastAPI app
app = FastAPI()

@app.post("/moralise")
async def moralise(input_data: dict):
    # Print the input data for debugging
    print("Input Data:", input_data)

    # Extract the values from the input JSON
    boat_case = {
        "env": input_data.get("env"),
        "A": input_data.get("A"),
        "B": input_data.get("B")
    }
    print("Boat Case:", boat_case)

    # Extract probabilities for the decision-making
    ut_pr = float(input_data.get("ut_pr", 0.33))
    dt_pr = float(input_data.get("dt_pr", 0.33))
    ve_pr = float(input_data.get("ve_pr", 0.34))
    print("Probabilities - ut_pr:", ut_pr, "dt_pr:", dt_pr, "ve_pr:", ve_pr)

    # Step 1: Convert input JSON using convert_json
    converted_json = convert_json(boat_case)
    print("Converted JSON:", converted_json)
    
    # Step 2: Pass converted JSON to initiate_masters
    result = initiate_masters(converted_json)
    print("Result from initiate_masters:", result)
    
    total_A = 0
    total_B = 0
    collective_explanation = ""

    for case in result:
        # Safely access the keys and handle missing cases with default values (0 for totals and empty string for explanations)
        
        # Using .get() to avoid errors if the key is missing
        ut_A = case.get('ut', {}).get('A', 0)
        dt_A = case.get('dt', {}).get('A', 0)
        ve_A = case.get('ve', {}).get('A', 0)
        
        ut_B = case.get('ut', {}).get('B', 0)
        dt_B = case.get('dt', {}).get('B', 0)
        ve_B = case.get('ve', {}).get('B', 0)
        
        ut_explanation_A = case.get('ut', {}).get('Explanation', "")
        dt_explanation_A = case.get('dt', {}).get('Explanation', "")
        ve_explanation_A = case.get('ve', {}).get('Explanation', "")
        
        ut_explanation_B = case.get('ut', {}).get('Explanation', "")
        dt_explanation_B = case.get('dt', {}).get('Explanation', "")
        ve_explanation_B = case.get('ve', {}).get('Explanation', "")

        # For A and B, multiply the values by the respective float numbers and sum them
        total_A += (ut_A * ut_pr) + (dt_A * dt_pr) + (ve_A * ve_pr)
        total_B += (ut_B * ut_pr) + (dt_B * dt_pr) + (ve_B * ve_pr)
        
        # Append the explanations for A and B to the collective_explanation
        collective_explanation += ut_explanation_A + "\n\n"  # Explanation for A from 'ut'
        collective_explanation += dt_explanation_A + "\n\n"  # Explanation for A from 'dt'
        collective_explanation += ve_explanation_A + "\n\n"  # Explanation for A from 've'
        
        collective_explanation += ut_explanation_B + "\n\n"  # Explanation for B from 'ut'
        collective_explanation += dt_explanation_B + "\n\n"  # Explanation for B from 'dt'
        collective_explanation += ve_explanation_B + "\n\n"  # Explanation for B from 've'

    print("Total A:", total_A)
    print("Total B:", total_B)
    softmax_A = total_A / (total_A + total_B)
    softmax_B = total_B / (total_A + total_B)

    print("Softmax A:", softmax_A)
    print("Softmax B:", softmax_B)

    # Summarize the collective explanation
    summarised_value = summarise_concept(collective_explanation)
    print("Summarised Explanation:", summarised_value)

    # Generate frontend response (you can modify as needed)
    new_response = frontend_generator(boat_case["env"], converted_json)
    print("Frontend Response:", new_response)
    
    # Determine the final decision (A or B) based on softmax values
    to_save = "A" if softmax_A > softmax_B else "B"
    morality_score = softmax_A if softmax_A > softmax_B else softmax_B

    print("Final Decision (to_save):", to_save)
    print("Morality Score:", morality_score)

    # Create the final output dictionary
    final_output = {
        "morality_score": morality_score,
        "to_save": to_save,
        "description": summarised_value
    }

    # Merge additional response details
    final_output.update(new_response)

    print("Final Output:", final_output)

    # Return the final JSON response
    return JSONResponse(content=final_output)

# To run the FastAPI server, use:
# uvicorn main:app --reload --host 0.0.0.0 --port 8000