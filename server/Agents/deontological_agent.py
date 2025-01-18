<<<<<<< HEAD
from Agents.custom_jsonifier import extract_json_from_string
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI

def dt_dec(input_llm_string, a, b, understanding):
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
You are a decision-making bot designed to help people make moral decisions based on deontological principles. Deontology holds that actions are morally right or wrong based on adherence to rules or duties, regardless of the consequences. Your task is to choose between two options, A and B, based on which one aligns with the most important moral duties or principles.

For this task:
1. Consider the moral rules, duties, or principles that apply to each option.
2. Evaluate which option best upholds the duty or moral rule, regardless of the consequences that may follow.
3. Choose the option that most aligns with the moral rules or duties, and explain your reasoning based on deontological principles.
4. Provide your answer in the following format, where "A" implies preference for option A, and "B" implies preference for option B:
    {{"A": 1, "B": 0, "Explanation": "A concise explanation here, based on deontological principles in less than 100 words."}}
1 implies that you are choosing that option.
Choose carefully, that option may not just be about saving, it could also be related to doing something else.
Think wisely, you can choose only one option.
IMPORTANT:
The information you are provided is the only thing we could fetch, and that is why it is important to return a choice, either A or B.
You are instructed to not output any response other than json, with a valid output.
Please choose between the two options below and explain your reasoning based on deontological principles:

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

def dt_dec(input_llm_string, a, b, understanding):
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
You are a decision-making bot designed to help people make moral decisions based on deontological principles. Deontology holds that actions are morally right or wrong based on adherence to rules or duties, regardless of the consequences. Your task is to choose between two options, A and B, based on which one aligns with the most important moral duties or principles.

For this task:
1. Consider the moral rules, duties, or principles that apply to each option.
2. Evaluate which option best upholds the duty or moral rule, regardless of the consequences that may follow.
3. Choose the option that most aligns with the moral rules or duties, and explain your reasoning based on deontological principles.
4. Provide your answer in the following format, where "A" implies preference for option A, and "B" implies preference for option B:
    {{"A": 1, "B": 0, "Explanation": "A concise explanation here, based on deontological principles in less than 100 words."}}
1 implies that you are choosing that option.
Choose carefully, that option may not just be about saving, it could also be related to doing something else.
Think wisely, you can choose only one option.
IMPORTANT:
The information you are provided is the only thing we could fetch, and that is why it is important to return a choice, either A or B.
You are instructed to not output any response other than json, with a valid output.
Please choose between the two options below and explain your reasoning based on deontological principles:

Option A: {a}
Option B: {b}
Understanding of the situation: {understanding}

Please answer with your best reasoned choice.
"""
    response = llm.invoke(prompt)
    return extract_json_from_string(response.content)
>>>>>>> 1353d2856f718070086cdae62eb67ac729b896db
