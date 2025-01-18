from Agents.utilitarian_agent import ut_dec
from Agents.deontological_agent import dt_dec
from Agents.virtue_ethics_agent import ve_dec

def initiate_masters(json_input):
    a = json_input["A"]
    b = json_input["B"]
    understanding = json_input["Understanding"]

    llms = ["llama-3.3-70b-versatile", "gemma2-9b-it", "mixtral-8x7b-32768", "gemini-1.5-flash"]

    results = []  # This will hold the final results

    def process_llm(llm):
        llm_results = {"ut": None, "dt": None, "ve": None}  # Local result for this LLM
        
        try:
            # Run ut, dt, ve synchronously
            ut_result = ut_dec(llm, a, b, understanding)
            dt_result = dt_dec(llm, a, b, understanding)
            ve_result = ve_dec(llm, a, b, understanding)

            # Directly assign results since JSON is assumed to be returned correctly
            llm_results["ut"] = ut_result
            llm_results["dt"] = dt_result
            llm_results["ve"] = ve_result

            # print(f"Results for {llm}: {llm_results}")  # Debug print statement

        except Exception as e:
            print(f"Error processing tasks for {llm}: {e}")

        # Return the processed results for the current LLM
        return llm_results

    # Process each LLM synchronously and collect results
    for llm in llms:
        results.append(process_llm(llm))

    # Debug print statement to check the final results before returning
    # print(f"Final Results: {results}")

    # Return the final results
    return results
