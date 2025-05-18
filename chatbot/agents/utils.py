from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
import os
from dotenv import load_dotenv
from langchain_community.agent_toolkits import create_sql_agent
from langchain_community.utilities import SQLDatabase

load_dotenv()
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY


def get_client(temperature=0, top_p=0.8, max_tokens=2000):
    llm = ChatGoogleGenerativeAI(
        model=os.getenv("MODEL_NAME"),
        temperature=temperature,
        top_p=top_p,
        max_tokens=max_tokens,
    )
    return llm


def get_agent(system_prompt):
    llm = get_client()
    db = get_db()

    agent = create_sql_agent(
        llm=llm,
        db=db,
        agent_type="openai-tools",
        verbose=True,
        system_message=system_prompt,
        # include_tables=include_tables,
    )

    return agent


def get_db():
    db = SQLDatabase.from_uri(
        "mysql+mysqlconnector://root:@localhost/foodordering",
        sample_rows_in_table_info=10,
    )
    return db


def get_chatbot_response(messages, temperature=0, agent=None):
    # Tạo ChatOpenAI object
    client = get_client(temperature)

    # Chuyển đổi messages sang dạng chuẩn của langchain
    input_messages = []
    for message in messages:
        role = message["role"]
        content = message["content"]

        if role == "system":
            input_messages.append(SystemMessage(content=content))
        elif role == "user":
            input_messages.append(HumanMessage(content=content))
        elif role == "assistant":
            input_messages.append(AIMessage(content=content))
        else:
            raise ValueError(f"Unknown role: {role}")

    # Gửi message vào model
    if agent is None:
        response = client.invoke(input_messages)
        return response.content

    response = agent.invoke(input_messages)
    return response["output"]
