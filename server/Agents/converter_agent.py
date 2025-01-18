import os
from langchain_groq import ChatGroq
from Agents.custom_jsonifier import extract_json_from_string

def convert_json(json_input):
    # Initialize the model
    llm = ChatGroq(
        api_key="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",
        model="llama-3.1-8b-instant",
    )
    
    # Extracting data from json_input
    environment = json_input["env"]
    situation_a = json_input["A"]
    situation_b = json_input["B"]
    
    # Updated, more explicit prompt to make the model understand the separation between A and B
    prompt = f"""
Please follow these instructions carefully. You must treat Situation A and Situation B as separate scenarios, where you will list only the people or objects involved in that specific situation. 

The key is that **each situation (A and B) must be entirely independent**—do not mix the people, animals, or objects from A and B. Each situation has its own set of involved individuals or objects, and they must be described only within their respective situations.

Only print output as JSON (without additional text or comments), as I will directly parse it.

Given the following context:
Environment: "{environment}"
Situation A: "{situation_a}"
Situation B: "{situation_b}"

**Instructions:**
1. For Situation A:
    - Identify **only the individuals or objects involved in Situation A** (exclude all others).
    - Provide a **list** with **only the relevant individuals/objects** involved in A, using descriptions such as "1 adult male", "1 child female", "1 elderly male", etc.  
2. For Situation B:
    - Identify **only the individuals or objects involved in Situation B** (exclude all others).
    - Provide a **list** with **only the relevant individuals/objects** involved in B, using the same format as above.
3. Finally, provide a short explanation in the "Understanding" field. This should describe the **moral consequence** of the decision:
    - If choosing Situation A means sacrificing someone or something in Situation B, explain this clearly.  
    - If choosing Situation B means sacrificing someone or something in Situation A, explain this clearly.
    - The "Understanding" field should describe the trade-off in a **one-choice** scenario where the decision is irreversible.
    - Ensure to describe the consequences in detail so that the moral choice is clear.

IMPORTANT:
- Be as descriptive as possible, so that no information is lost.
- The explanation in the "Understanding" field must describe **one single choice** (e.g., "Choose A and sacrifice B," "Choose A to save B," etc.)
- Do not provide json tags as it messes up the output.

### Example Inputs and Outputs (For reference only):

**Example 1:**
Input:
{{
    "env": "A car is driving normally with two passengers, one adult male aged 55, and a female 8 weeks pregnant woman, his daughter. The car's brakes suddenly fail. The autonomous system detects two paths ahead: one leads to a barrier that will result in the death of both passengers, while the other path has an 80-year-old man crossing the road.",
    "A": "The car chooses to steer towards the elderly man, potentially risking his life to save the passengers.",
    "B": "The car steers toward the barrier, ensuring the passengers' survival but causing the elderly man's death."
}}

Output:
{{
    "A": ["save 1 adult male aged 55", "save 1 pregnant female 8 weeks along"],
    "B": ["save 1 elderly male aged 80"],
    "Understanding": "Choosing A means sacrificing the elderly man to save the passengers. Choosing B means sacrificing the elderly man’s life to save the passengers."
}}

**Example 2:**
Input:
{{
    "env": "A doctor is faced with a decision to declare a critically ill female patient dead and harvest her organs for transplant to save five children who will die without them. The patient is influential but is known for illegal animal cruelty, including murdering animals for their skins.",
    "A": "The doctor declares the woman dead and proceeds with organ harvesting, saving the lives of five children.",
    "B": "The doctor refrains from declaring the woman dead, potentially condemning the five children to die, due to ethical concerns regarding the woman’s history."
}}

Output:
{{
    "A": ["sacrifice 1 female patient"],
    "B": ["not save 5 children"],
    "Understanding": "Choosing A means sacrificing the life of the woman to save the five children. Choosing B means sacrificing the lives of five children by not harvesting the woman’s organs."
}}

**Example 3:**
Input:
{{
    "env": "A terrorist threatening to kill a woman (age not defined) if provoked or threatened, a sniper aims at the terrorist.",
    "A": "Do not shoot the rifle, risking the woman's life",  
    "B": "Shoot the rifle with a 10 percent chance of killing the woman"
}}

Output:
{{
    "A": ["not kill 1 terrorist"],
    "B": ["do not try to rescue 1 woman"],
    "Understanding": "Choosing A means risking the woman's life by not neutralizing the terrorist. Choosing B means risking the woman's life at a 10% chance by killing the terrorist."
}}

### End of Example Inputs and Outputs
"""

    # Retry logic for handling errors during the extraction process
    retries = 3
    for attempt in range(retries):
        try:
            # Invoke the model
            response = llm.invoke(prompt)

            # Extracting JSON data
            return extract_json_from_string(response.content)
        except Exception as e:
            # If extraction fails, retry after logging the error
            if attempt < retries - 1:
                print(f"Error during extraction attempt {attempt + 1}: {e}. Retrying...")
            else:
                print(f"Error after {retries} attempts: {e}. Returning None.")
                return None
