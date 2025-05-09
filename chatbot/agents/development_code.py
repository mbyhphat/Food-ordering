from guard_agent import GuardAgent
from classification_agent import ClassificationAgent
from agent_protocol import AgentProtocol
from details_agent import DetailsAgent
from order_taking_agent import OrderTakingAgent


def main():
    guard_agent = GuardAgent()
    classification_agent = ClassificationAgent()
    agent_dict: dict[str, AgentProtocol] = {
        "details_agent": DetailsAgent(),
        "order_taking_agent": OrderTakingAgent(),
    }

    messages = []
    while True:
        print("\n\nPrint Messages ...............")
        for message in messages:
            print(f"{message['role'].capitalize()}: {message['content']}")
        # Get user input
        prompt = input("User: ")
        messages.append({"role": "user", "content": prompt})
        # Get GuardAgent's response
        guard_agent_response = guard_agent.get_response(messages)

        if guard_agent_response["memory"]["guard_decision"] == "not allowed":
            messages.append(guard_agent_response)
            continue

        classification_agent_response = classification_agent.get_response(messages)
        chosen_agent = classification_agent_response["memory"][
            "classification_decision"
        ]
        print("Chosen Agent: ", chosen_agent)
        agent = agent_dict[chosen_agent]
        response = agent.get_response(messages)
        print(response)


if __name__ == "__main__":
    main()
