import json
from copy import deepcopy
from .utils import get_chatbot_response, get_agent


class DetailsAgent:
    def __init__(self, temperature=0.2):
        self.temperature = temperature

    def get_response(self, messages):
        messages = deepcopy(messages)
        system_prompt = """You are an intelligent assistant with exceptional skills in querying databases to answer user questions.

                        To respond to a question, you will:
                        1. Understand the database structure (tables, columns).
                        2. Write an appropriate and optimized SQL query based on the question.
                        3. Execute the query to retrieve the data.
                        4. Analyze the query results.
                        5. Summarize and present the information clearly and understandably.

                        Always ensure that the SQL queries are syntactically correct and optimized.  
                        If the question is unclear, ask the user to clearify the question.

                        Important: You are only allowed to perform SELECT queries to retrieve data.  
                        You must not perform any actions that modify the database, such as INSERT, UPDATE, DELETE, DROP, or ALTER.
 
                        If your answer has multiple points (such as several items), write each point on a separate line.
                        When the user asks for a list of items (e.g., menu items or categories lists), respond with a limited number of results from your query, and present them naturally — not with phrasing such as 'Items in the database include:' or 'Here is the list from the database', which mentioned about the database. 
                        Instead, speak as if you're introducing the items directly to the user. Always answer in Vietnamese language."""
        input_messages = messages[-3:]
        agent = get_agent(system_prompt)
        chatbot_output = get_chatbot_response(input_messages, self.temperature, agent)
        output = self.postprocess(chatbot_output)

        return output

    def postprocess(self, output):
        return {
            "role": "assistant",
            "content": output,
            "memory": {
                "agent": "details_agent",
            },
        }
