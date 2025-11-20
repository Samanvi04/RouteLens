import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

export default function StudentDashboard() {

  const navigate = useNavigate();

  return (
    <div className="student-container">

      {/* 🔵 TOP NAVIGATION */}
      <nav className="student-navbar">
        <h2 className="logo">Student Dashboard</h2>
        <ul>
          <li onClick={() => navigate("/student/subscriptions")}>Manage Subscriptions</li>
          <li onClick={() => navigate("/student/live-tracking")}>Live Tracking</li>
          <li onClick={() => navigate("/student/preferences")}>Preferences</li>
          <li onClick={() => navigate("/student/history")}>History</li>
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

    </div>
  );
}
