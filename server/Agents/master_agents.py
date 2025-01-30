from concurrent.futures import ThreadPoolExecutor, as_completed
from Agents.utilitarian_agent import ut_dec
from Agents.deontological_agent import dt_dec
from Agents.virtue_ethics_agent import ve_dec

def initiate_masters(json_input):
    a = json_input["A"]
    b = json_input["B"]
    understanding = json_input["Understanding"]

    llms = ["llama-3.3-70b-versatile", "gemma2-9b-it", "mixtral-8x7b-32768", "gemini-1.5-flash-8b"]
    # llms = ["llama-3.3-70b-versatile", "gemma2-9b-it", "mixtral-8x7b-32768"]

    results = []  # This will hold the final results

    def process_llm(llm):
        """
        Process a single LLM by making all three API calls (ut, dt, ve) in parallel.
        """
        with ThreadPoolExecutor() as executor:
            futures = {
                executor.submit(ut_dec, llm, a, b, understanding): "ut",
                executor.submit(dt_dec, llm, a, b, understanding): "dt",
                executor.submit(ve_dec, llm, a, b, understanding): "ve",
            }

            llm_results = {}

            for future in as_completed(futures):
                key = futures[future]
                try:
                    llm_results[key] = future.result()
                except Exception as e:
                    print(f"Error processing {key} for {llm}: {e}")
                    llm_results[key] = None  # Default to None if there's an error

            return llm_results

    # Process all LLMs in parallel
    with ThreadPoolExecutor() as executor:
        future_to_llm = {executor.submit(process_llm, llm): llm for llm in llms}

        for future in as_completed(future_to_llm):
            llm = future_to_llm[future]
            try:
                results.append(future.result())
            except Exception as e:
                print(f"Error processing LLM {llm}: {e}")
                results.append({"llm": llm, "error": str(e)})  # Record the error in the results

    return results
