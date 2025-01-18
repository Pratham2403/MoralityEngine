<<<<<<< HEAD
from Agents.custom_jsonifier import extract_json_from_string
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI

def ve_dec(input_llm_string, a, b, understanding):
    if input_llm_string == "gemini-1.5-flash":
        # Open the model using ChatGoogleGenerativeAI
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            google_api_key="AIzaSyBuqhVIq3qZZI05tgJUmnck31MfTAWLYMs",
            temperature=0.2
        )
    else:
        # Open the model using ChatGroq for other models
        llm = ChatGroq(
            api_key="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",
            model=input_llm_string
        )
    prompt = f"""
You are a decision-making bot designed to help people make moral decisions based on virtue ethics. Virtue ethics focuses on the character traits and virtues that a person should develop in order to live a flourishing and morally good life. Your task is to choose between two options, A and B, based on which one best reflects virtuous character traits and promotes personal growth toward moral excellence.

For this task:
1. Consider which virtues (e.g., courage, honesty, kindness, wisdom) are relevant to each option.
2. Evaluate which option would best help develop a virtuous character and lead to a flourishing life.
3. Choose the option that aligns with the highest virtues and explain your reasoning based on virtue ethics.
4. Provide your answer in the following format, where "A" implies preference for option A, and "B" implies preference for option B:
    {{"A": 1, "B": 0, "Explanation": "A concise explanation here, based on virtue ethics in less than 100 words."}}
1 implies that you are choosing that option.
Choose carefully, that option may not just be about saving, it could also be related to doing something else.
Think wisely, you can choose only one option.
IMPORTANT:
The information you are provided is the only thing we could fetch, and that is why it is important to return a choice, either A or B.
You are instructed to not output any response other than json, with a valid output.
Please choose between the two options below and explain your reasoning based on virtue ethics:

Option A: {a}
Option B: {b}
Understanding of the situation: {understanding}

Please answer with your best reasoned choice.
"""
    response = llm.invoke(prompt)
    return extract_json_from_string(response.content)
=======
from Agents.custom_jsonifier import extract_json_from_string
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI

def ve_dec(input_llm_string, a, b, understanding):
    if input_llm_string == "gemini-1.5-flash":
        # Open the model using ChatGoogleGenerativeAI
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            google_api_key="AIzaSyBuqhVIq3qZZI05tgJUmnck31MfTAWLYMs",
            temperature=0.2
        )
    else:
        # Open the model using ChatGroq for other models
        llm = ChatGroq(
            api_key="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",
            model=input_llm_string
        )
    prompt = f"""
You are a decision-making bot designed to help people make moral decisions based on virtue ethics. Virtue ethics focuses on the character traits and virtues that a person should develop in order to live a flourishing and morally good life. Your task is to choose between two options, A and B, based on which one best reflects virtuous character traits and promotes personal growth toward moral excellence.

For this task:
1. Consider which virtues (e.g., courage, honesty, kindness, wisdom) are relevant to each option.
2. Evaluate which option would best help develop a virtuous character and lead to a flourishing life.
3. Choose the option that aligns with the highest virtues and explain your reasoning based on virtue ethics.
4. Provide your answer in the following format, where "A" implies preference for option A, and "B" implies preference for option B:
    {{"A": 1, "B": 0, "Explanation": "A concise explanation here, based on virtue ethics in less than 100 words."}}
1 implies that you are choosing that option.
Choose carefully, that option may not just be about saving, it could also be related to doing something else.
Think wisely, you can choose only one option.
IMPORTANT:
The information you are provided is the only thing we could fetch, and that is why it is important to return a choice, either A or B.
You are instructed to not output any response other than json, with a valid output.
Please choose between the two options below and explain your reasoning based on virtue ethics:

Option A: {a}
Option B: {b}
Understanding of the situation: {understanding}

Please answer with your best reasoned choice.
"""
    response = llm.invoke(prompt)
    return extract_json_from_string(response.content)
>>>>>>> 1353d2856f718070086cdae62eb67ac729b896db
