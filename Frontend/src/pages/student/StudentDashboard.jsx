import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

export default function StudentDashboard() {

  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="student-container">

      {/* 🔵 TOP NAVIGATION */}
      <nav className="student-navbar">
        <h2 className="logo">Student Dashboard</h2>

        <ul>
          <li onClick={() => navigate("/student/subscriptions")}>Manage Subscriptions</li>
          <li onClick={() => navigate("/student/live-tracking")}>Live Tracking</li>
          <li onClick={() => navigate("/student/history")}>History</li>
<li onClick={() => navigate("/student/chatbot")}>💬 ChatBot</li>
<li onClick={() => navigate("/student/rating")}>Rating ⭐</li>

          {/* 🔔 NOTIFICATION BUTTON */}
          <li 
            className="notif-icon"
            onClick={() => navigate("/student/notifications")}
          >
            🔔
          </li>
        </ul>
      </nav>

      {/* ⭐ WELCOME HERO */}
      <section className="student-welcome">
        <h1>Welcome, Student</h1>
        <p>Track your college bus and stay notified at every stop.</p>

        <button 
          className="btn-start"
          onClick={() => navigate("/student/subscriptions")}
        >
          Get Started
        </button>
      </section>

      {/* 🤖 CHATBOT FLOATING BUTTON */}
      <button 
        className="chatbot-btn" 
        onClick={() => setShowChat(true)}
      >
        💬
      </button>

      {/* CHATBOT POPUP */}
      {showChat && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h3>Bus Assistant 🤖</h3>
            <button className="close-chat" onClick={() => setShowChat(false)}>✖</button>
          </div>

          <div className="chatbot-body">
            <p>Ask me anything about buses!</p>
            <ul>
              <li>• Where is BUS-1 now?</li>
              <li>• When will the bus reach my stop?</li>
              <li>• Show route for BUS-3</li>
            </ul>
            <input className="chat-input" placeholder="Type your question..." />
          </div>
        </div>
      )}

    </div>
  );
}
