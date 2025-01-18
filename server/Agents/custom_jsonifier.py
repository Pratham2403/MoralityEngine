<<<<<<< HEAD
import json

# Function to convert a string into JSON
def extract_json_from_string(response_string):
    try:
        # Step 1: Check for presence of triple backticks and extract the JSON content between them
        if "```" in response_string:
            start_index = response_string.find("```") + 3
            end_index = response_string.rfind("```")
            json_string = response_string[start_index:end_index].strip()

            # Check if the content starts with 'json' and remove it
            if json_string.startswith("json"):
                json_string = json_string[4:].strip()

        else:
            # Step 2: Extract the JSON content based on curly braces
            start_index = response_string.find("{")
            end_index = response_string.rfind("}") + 1
            json_string = response_string[start_index:end_index].strip()

        # Parse the extracted JSON string
        return json.loads(json_string)

    except Exception as e:
        print(response_string)  # Print the input for debugging
=======
import json

# Function to convert a string into JSON
def extract_json_from_string(response_string):
    try:
        # Step 1: Check for presence of triple backticks and extract the JSON content between them
        if "```" in response_string:
            start_index = response_string.find("```") + 3
            end_index = response_string.rfind("```")
            json_string = response_string[start_index:end_index].strip()

            # Check if the content starts with 'json' and remove it
            if json_string.startswith("json"):
                json_string = json_string[4:].strip()

        else:
            # Step 2: Extract the JSON content based on curly braces
            start_index = response_string.find("{")
            end_index = response_string.rfind("}") + 1
            json_string = response_string[start_index:end_index].strip()

        # Parse the extracted JSON string
        return json.loads(json_string)

    except Exception as e:
        print(response_string)  # Print the input for debugging
>>>>>>> 1353d2856f718070086cdae62eb67ac729b896db
        return {"error": "Unable to extract valid JSON", "details": str(e)}