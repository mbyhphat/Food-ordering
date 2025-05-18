import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Chat = () => {
    const [messages, setMessages] = useState([]); // history
    const [input, setInput] = useState(""); // giá trị ô input
    const [loading, setLoading] = useState(false); // loading indicator
    const bottomRef = useRef(null);
    const { handleQuantityChange } = useContext(StoreContext);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = { role: "user", content: input.trim() };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setLoading(true);
        setInput("");
        try {
            const { data: botMsg } = await axios.post(
                "http://localhost:5000/api/chat",
                { messages: updated }
            );
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.log(err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Có lỗi xảy ra." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="card">
            <div class="chat-header">Mama's Food Bot</div>
            <div class="chat-window">
                <ul className="list-unstyled message-list">
                    {messages.map((message, idx) => {
                        const isUser = message?.role === "user";
                        if (
                            !isUser &&
                            message.memory.agent === "order_taking_agent"
                        ) {
                            handleQuantityChange(
                                message.memory.order.id,
                                message.memory.order.quantity,
                                message.memory.order.initial_stock
                            );
                        }
                        return (
                            <li
                                key={idx}
                                className={`d-flex ${
                                    isUser
                                        ? "justify-content-end  me-2 mt-1"
                                        : "justify-content-start ms-3"
                                } mb-2`}
                            >
                                <div
                                    className={`message-bubble p-2 px-3 border rounded-5 ${
                                        isUser
                                            ? "bg-yellow-custom border-secondary text-start"
                                            : "bg-light border-primary text-start"
                                    }`}
                                >
                                    <span className="small">
                                        {message.content}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div ref={bottomRef} />
            </div>
            <div class="chat-input">
                <input
                    type="text"
                    class="message-input"
                    placeholder="Nhập tin nhắn"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={loading}
                />
                <button
                    class="send-button"
                    onClick={sendMessage}
                    disabled={loading}
                >
                    {loading ? "..." : "Gửi"}
                </button>
            </div>
        </div>
    );
};

export default Chat;
