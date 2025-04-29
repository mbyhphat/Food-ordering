import json
from copy import deepcopy
from utils import get_chatbot_response


class ClassificationAgent:
    def __init__(self, temperature=0):
        self.temperature = temperature

    def get_response(self, messages):
        messages = deepcopy(messages)
        system_prompt = """You are a helpful AI assistant for a food ordering application.
            Your task is to determine what agent should handle the user input. You have 2 agents to choose from:
            1. details_agent: This agent is responsible for answering questions about the restaurant, like location, working hours, details about menue items. Or listing items in the menu items. Or by asking what we have.
            2. order_taking_agent: This agent is responsible for taking orders from the user. It's responsible to have a conversation with the user about the order untill it's complete.

            Your output should be in a structured json format like so. each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "chain of thought": go over each of the agents above and write some your thoughts about what agent is this input relevant to.
            "decision": "details_agent" or "order_taking_agent". Pick one of those. and only write the word.
            "message": leave the message empty.
            }"""
        input_messages = [{"role": "system", "content": system_prompt}]
        input_messages += messages[-3:]
        chatbot_output = get_chatbot_response(input_messages, self.temperature)
        output = self.postprocess(chatbot_output)

        return output

    def postprocess(self, output):
        output = json.loads(output)

        return {
            "role": "assistant",
            "content": output["message"],
            "memory": {
                "agent": "classification_agent",
                "classification_decision": output["decision"],
            },
        }
