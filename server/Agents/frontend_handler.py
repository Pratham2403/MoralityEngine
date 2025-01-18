from langchain_groq import ChatGroq
from Agents.custom_jsonifier import extract_json_from_string

def frontend_generator(text, json_input): 
    # Open the model using ChatGroq for other models
    llm = ChatGroq(
        api_key="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",
        model="llama-3.3-70b-versatile"
    )

    # Provide the model with clear examples of how to process the input.
    prompt = f"""
    You are tasked with simplifying the provided json_input and analyzing the given text.

    You need to follow these steps:
    1. Simplify the input json to represent only 'humans', 'animals', and 'objects'. Remove any details that are not part of these categories.
    2. Based on the scenario described in the text, modify the entities in the json arrays to reflect the actual situation. For instance:
        - If the text describes a crash into a barrier, simplify 'A' to '1 object' and 'B' to any humans or animals involved.
        - If there are multiple objects, humans, or animals, reflect that count accordingly.

    ### Here are examples to understand the task:

    Sample 1:
    Text: "A car is driving normally with two passengers, one adult male aged 55, and a female 8 weeks pregnant woman, his daughter. The car's brakes suddenly fail. The autonomous system detects two paths ahead: one leads to a barrier that will result in the death of both passengers, while the other path has an 80-year-old man crossing the road, with a cat."
    Input JSON: {{'A': ['1 adult male aged 55', '1 pregnant female 8 weeks along'], 'B': ['1 elderly male aged 80', '1 cat'], 'Understanding': 'Save A or B'}}

    Output JSON: {{"A": ["1 object"], "B": ["1 human", "1 animal"]}}

    Sample 2:
    Text: "A boat is crossing a river with four passengers onboard: one male aged 40, a female aged 32, a 10-year-old girl, and a dog. The boat is hit by a sudden wave and capsizes. The passengers and the dog are thrown into the water."
    Input JSON: {{'A': ['1 male aged 40', '1 female aged 32'], 'B': ['1 child female aged 10', '1 dog'], 'Understanding': 'Save A or B'}}

    Output JSON: {{"A": ["1 object"], "B": ["3 humans", "1 animal"]}}

    Sample 3:
    Text: "A terrorist has taken hostages in a building. The terrorist holds a gun to the head of a male hostage and threatens to kill him if demands are not met. The police are outside negotiating."
    Input JSON: {{'A': ['1 terrorist'], 'B': ['1 male hostage'], 'Understanding': 'Negotiate or intervene'}}

    Output JSON: {{"A": ["1 human"], "B": ["1 human"]}}

    Sample 4:
    Text: "A doctor is performing surgery on a patient who has a critical heart condition. The surgery is complex, and the patient is under anesthesia."
    Input JSON: {{'A': ['1 doctor'], 'B': ['1 patient with heart condition'], 'Understanding': 'Save A or B'}}

    Output JSON: {{"A": ["1 human"], "B": ["1 human"]}}

    Sample 5:
    Text: A boat is sinking in the middle of a violent storm. The water is cold, and the boat is about to go under. There is only room in the lifeboat for one person, and you must choose who to save.
    Input JSON: {{'A': ['1 child female, weak, hungry, and terrified of the water'], 'B': ['1 elderly woman, with a chronic respiratory condition and is struggling to breathe'], 'Understanding': 'Save A or B'}}

    Output JSON: {{"A": ["1 human"], "B": ["1 human"]}}

    ### Now, here is the text and json_input you need to process:

    Text to analyze:
    "{text}"

    JSON input:
    {json_input}

    ### Important: Output only the JSON format in your response. Do not include any other text, explanations, or tags.
    """
    
    # Invoke the model with the prompt and capture the response
    response = llm.invoke(prompt)
    
    # Assuming the model will return a properly formatted JSON response
    return extract_json_from_string(response.content)