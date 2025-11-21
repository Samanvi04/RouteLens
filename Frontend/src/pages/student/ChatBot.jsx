import React, { useState } from "react";
import "./ChatBot.css";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! 👋 Ask me anything about buses, routes, or timings." }
  ]);
  const [input, setInput] = useState("");

  // 🔵 PREVIOUS BUS DATA YOU USED
  const buses = [
    { number: "BUS-1", route: "Vijaynagar → Mysore Palace", driver: "Ramesh Kumar" },
    { number: "BUS-2", route: "Bogadi → Mysore Palace", driver: "Suresh Yadav" },
    { number: "BUS-3", route: "Hebbal → Mysore Palace", driver: "Mahesh Gowda" },
    { number: "BUS-4", route: "Jayalakshmipuram → Mysore Palace", driver: "Vijay Kumar" },
    { number: "BUS-5", route: "Saraswathipuram → Mysore Palace", driver: "Lokesh" },
    { number: "BUS-6", route: "Nanjangud Road → Mysore Palace", driver: "Raghavendra" },
    { number: "BUS-7", route: "Hootagalli → Mysore Palace", driver: "Pradeep Kumar" },
    { number: "BUS-8", route: "Srirampura → Mysore Palace", driver: "Harish" },
    { number: "BUS-9", route: "KR Nagar Road → Mysore Palace", driver: "Naveen R" },
    { number: "BUS-10", route: "Suttur Road → Mysore Palace", driver: "Vijay" }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages([...messages, userMsg]);

    // Generate bot response
    const question = input.toLowerCase();
    let reply = "Sorry, I didn't understand. Try asking about a bus number like BUS-3.";

    // 🔍 Check bus number
    const bus = buses.find(b => question.includes(b.number.toLowerCase()));
    if (bus) {
      reply = `🚌 *${bus.number}*  
Route: ${bus.route}  
Driver: ${bus.driver}`;
    }

    // 🔍 General route question
    if (question.includes("route")) {
      reply = "All buses go to Mysore Palace with different starting points.";
    }

    // 🔍 Driver info
    if (question.includes("driver")) {
      reply = "Each bus has 1 driver. Ask like: driver of BUS-5";
    }

    // 🔍 ETA demo reply
    if (question.includes("eta") || question.includes("time")) {
      reply = "ETA feature active! Most buses reach Mysore Palace in 10–15 minutes.";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: reply }]);
    }, 500);

    setInput("");
  };

  return (
    <div className="chatbot-page">
      <h2 className="chat-title">Bus Chat Assistant</h2>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-msg ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about buses, routes, drivers..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
