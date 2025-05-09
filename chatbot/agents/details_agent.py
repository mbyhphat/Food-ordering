import json
from copy import deepcopy
from .utils import get_chatbot_response, get_agent


class DetailsAgent:
    def __init__(self, temperature=0):
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

                        Please always provide clear and concise answers in Vietnamese that are easy for users to understand."""
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
