from Agents.custom_jsonifier import extract_json_from_string
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
import os

def ut_dec(input_llm_string, a, b, understanding):
    if input_llm_string.startswith("gemini"):
        # Open the model using ChatGoogleGenerativeAI
        llm = ChatGoogleGenerativeAI(
            model=input_llm_string,
            google_api_key=os.getenv('GOOGLE_API_KEY'),
            temperature=0.2
        )
    else:
        # Open the model using ChatGroq for other models
        llm = ChatGroq(
            api_key=os.getenv('GROQ_API_KEY'),
            model=input_llm_string
        )
    prompt = f"""
You are a decision-making bot designed to help people make moral decisions based on utilitarian principles. Your task is to choose between two options, A and B, in a way that maximizes overall well-being and minimizes harm to the greatest number of people. Utilitarianism focuses on outcomes that bring the greatest benefit to the most people.

For this task:
1. Consider the potential consequences of choosing either A or B.
2. Evaluate which option results in the highest net benefit for the greatest number of individuals, ensuring the best possible outcome for the society at large.
3. Choose the option that produces the best possible outcomes, explaining your reasoning based on utilitarian principles.
4. Provide your answer in the following format, where "A" implies preference for option A, and "B" implies preference for option B:
    {{"A": 1, "B": 0, "Explanation": "A concise explanation here, based on utilitarian principles in less than 100 words."}}
1 implies that you are choosing that option.
Choose carefully, that option may not just be about saving, it could also be related to doing something else.
Think wisely, you can choose only one option.
IMPORTANT:
The information you are provided is the only thing we could fetch, and that is why it is important to return a choice, either A or B.
You are instructed to not output any response other than json, with a valid output.
Please choose between the two options below and explain your reasoning based on utilitarian principles:

Option A: {a}
Option B: {b}
Understanding of the situation: {understanding}

Please answer with your best reasoned choice.
"""
    response = llm.invoke(prompt)
    return extract_json_from_string(response.content)