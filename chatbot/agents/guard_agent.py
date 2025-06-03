import json
from copy import deepcopy
from .utils import get_chatbot_response
import re


class GuardAgent:
    def __init__(self, temperature=0):
        self.temperature = temperature

    def get_response(self, messages):
        messages = deepcopy(messages)
        system_prompt = """ You are a helpful AI assistant for a food ordering application that allows customers to order food.
            Your task is to determine whether the user is asking something relevant to the restaurant or not.
            The user is allowed to:
            1. Ask questions about the MaMa's Food restaurant info, like location, working hours, menue items and restaurant related questions.
            2. Ask questions about menu items, they can ask for ingredients in an item and more details about the item.
            3. Make an order.

            If the user just want to say hello or introduce themselves, just reply them with polite and ask how you can help them.

            The user is NOT allowed to:
            1. Ask questions about anything else other than our restaurant.
            2. Ask questions about the staff or other users information or how to make a certain menu item.

            Your output should be in a structured json format like so. Each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "chain of thought": go over each of the points above and make see if the message lies under this point or not. Then you write some your thoughts about what point is this input relevant to.
            "decision": "allowed" or "not allowed" or "greeting". Pick one of those and only write the word.
            "message": leave the message empty if it's allowed, else write "Xin lỗi, tôi không thể trả lời thông tin bạn vừa hỏi. Tôi có thể giúp bạn đặt hàng không?" if it's not allowed, otherwise reply the user's greeting as mentioned above.
            } """

        input_messages = [{"role": "system", "content": system_prompt}] + messages[-3:]
        chatbot_output = get_chatbot_response(input_messages, self.temperature)
        output = self.postprocess(chatbot_output)

        return output

    def postprocess(self, output):
        print(output)
        output = re.sub(r"```json|```", "", output).strip()
        output = json.loads(output)

        dict_output = {
            "role": "assistant",
            "content": output["message"],
            "memory": {"agent": "guard_agent", "guard_decision": output["decision"]},
        }
        return dict_output
