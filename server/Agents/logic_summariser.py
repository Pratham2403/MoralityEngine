from Agents.custom_jsonifier import extract_json_from_string
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI

def summarise_concept(text):
    # Open the model using ChatGroq for other models
    llm = ChatGroq(
        api_key="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",
        model="llama-3.3-70b-versatile"
    )

    # The prompt asks the model to summarize the input text in less than 100 words, while retaining the details
    prompt = f"""
    You are a summarizer bot. I will provide you with a text, and your task is to:
    1. Summarize the text in **less than 100 words**.
    2. Ensure that **no important details** are lost in the summary.
    3. **Do not generate any output on your own**. Just summarize the provided text accordingly.

    Text to summarize:
    "{text}"
    """
    
    # Invoke the model with the prompt and capture the response
    response = llm.invoke(prompt)

    # Parse and return the summary extracted from the response
    return response.content
