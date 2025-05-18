import json
from copy import deepcopy
from .utils import get_chatbot_response, get_db
import re


class OrderTakingAgent:
    def __init__(self, temperature=0):
        self.temperature = temperature

    def get_response(self, messages):
        messages = deepcopy(messages)
        db = get_db()
        food_list = db.run("SELECT item_id, name, price, quantity FROM food_items;")
        system_prompt = f"""
            You are a customer support Bot for a restaurant called "MaMa's Food".

            Here is the menu for this restaurant. The meaning of 4 columns are: id, food name, food price, and the stock.

            {food_list}

            Things to NOT DO:
            * DON't ask how to pay by cash or Card.
            * Don't tell the user to go to the counter
            * Don't tell the user to go to place to get the order


            You're task is as follows:
            1. Take the User's Order
            2. Validate that all their items are in the menu and have enough stocks for each item.
            3. if an item is not in the menu or does not have enough stock, tell the user and repeat back the remaining valid order
            4. Ask them if they need anything else.
            5. If they do then repeat starting from step 3
            6. If they don't want anything else. Using the "order" object that is in the output. Make sure to hit all three points
                1. list down all the items and their prices
                2. calculate the total. 
                3. Thank the user for the order and close the conversation with no more questions

            The user message will contain a section called memory. This section will contain the following:
            "order"
            "step number"
            please utilize this information to determine the next step in the process.
            
            produce the following output without any additions, not a single letter outside of the structure bellow.
            Your output should be in a structured json format like so. each key is a string and each value is a string. Make sure to follow the format exactly:
            {{
            "chain of thought": Write down your critical thinking about what is the maximum task number the user is on write now. Then write down your critical thinking about the user input and it's relation to the coffee shop process. Then write down your thinking about how you should respond in the response parameter taking into consideration the Things to NOT DO section. and Focus on the things that you should not do. 
            "step number": Determine which task you are on based on the conversation.
            "order": this is going to be a list of jsons like so. [{{"id": put the item's id, "item":put the item name, "quanitity": put the number that the user wants from this item, "price":put the total price of the item, "initial_stock": put the initial quantity of the items here }}]
            "response": write the a response to the user
            }}
        """

        last_order_taking_status = ""

        for message_index in range(len(messages) - 1, 0, -1):
            message = messages[message_index]

            agent_name = message.get("memory", {}).get("agent", "")
            if message["role"] == "assistant" and agent_name == "order_taking_agent":
                step_number = message["memory"]["step number"]
                order = message["memory"]["order"]
                last_order_taking_status = f"""
                step number: {step_number}
                order: {order}
                """

        messages[-1]["content"] = (
            last_order_taking_status + " \n " + messages[-1]["content"]
        )

        input_messages = [{"role": "system", "content": system_prompt}] + messages
        chatbot_output = get_chatbot_response(input_messages)
        output = self.postprocess(chatbot_output)
        return output

    def postprocess(self, output):
        output = re.sub(r"```json|```", "", output).strip()
        output = json.loads(output)

        if type(output["order"]) == str:
            output["order"] = json.loads(output["order"])

        response = output["response"]

        dict_output = {
            "role": "assistant",
            "content": response,
            "memory": {
                "agent": "order_taking_agent",
                "step number": output["step number"],
                "order": output["order"],
            },
        }

        return dict_output
