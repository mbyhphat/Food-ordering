from flask import Flask, request, jsonify
from flask_cors import CORS

from agents import (
    GuardAgent,
    ClassificationAgent,
    DetailsAgent,
    OrderTakingAgent,
    AgentProtocol,
)

app = Flask(__name__)
CORS(app)  # cho phép React gọi cross-origin

# Khởi tạo agents một lần
guard_agent = GuardAgent()
classification_agent = ClassificationAgent()
agent_dict: dict[str, AgentProtocol] = {
    "details_agent": DetailsAgent(),
    "order_taking_agent": OrderTakingAgent(),
}


@app.route("/api/chat", methods=["POST"])
def chat():
    """
    Nhận vào JSON: { "messages": [ {role, content}, ... ] }
    Trả về JSON dạng response của agent cuối cùng:
      { role, content, memory:{...} }
    """
    data = request.get_json(force=True)
    messages = data.get("messages", [])

    # 1) Guard check
    guard_resp = guard_agent.get_response(messages)
    if (
        guard_resp["memory"]["guard_decision"] == "not allowed"
        or guard_resp["memory"]["guard_decision"] == "greeting"
    ):
        return jsonify(guard_resp)

    # 2) Phân loại agent kế tiếp
    class_resp = classification_agent.get_response(messages)
    chosen = class_resp["memory"]["classification_decision"]
    agent = agent_dict.get(chosen, agent_dict["details_agent"])

    # 3) Lấy response từ agent được chọn
    final_resp = agent.get_response(messages)
    return jsonify(final_resp)


if __name__ == "__main__":
    # Chạy debug ở localhost:5000
    app.run(host="0.0.0.0", port=5000, debug=True)
