import React, { useState } from "react";
import "./Chat.css";
import axios from "axios";

const Chat = () => {
    const [messages, setMessages] = useState([]); // history
    const [input, setInput] = useState(""); // giá trị ô input
    const [loading, setLoading] = useState(false); // loading indicator

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
            <div class="chat-header">Chat</div>
            <div class="chat-window">
                <ul class="message-list"></ul>
                {messages.map((message, idx) => (
                    <li key={idx}>
                        <strong>{message.role}:</strong> {message.content}
                    </li>
                ))}
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
