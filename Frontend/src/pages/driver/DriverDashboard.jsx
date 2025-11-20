import React from "react";
import { useNavigate } from "react-router-dom";
import "./DriverDashboard.css";

export default function DriverDashboard() {

  const navigate = useNavigate();

  return (
    <div className="driver-container">

      {/* 🔵 TOP NAVIGATION */}
      <nav className="driver-navbar">
        <h2 className="logo">Driver Dashboard</h2>
        <ul>
          <li onClick={() => navigate("/driver/select-bus")}>Select Bus</li>
          <li onClick={() => navigate("/driver/select-vehicle")}>Select Vehicle</li>
          <li onClick={() => navigate("/driver/start-journey")}>Start Journey</li>
          <li onClick={() => navigate("/driver/active-journey")}>Active Journey</li>
          <li onClick={() => navigate("/driver/profile")}>Profile</li>
        </ul>
      </nav>

      {/* ⭐ WELCOME SCREEN */}
      <section className="welcome-hero">
        <h1>Welcome, Driver</h1>
        <p>"Safe journeys begin with responsible driving."</p>

        <button 
          className="btn-start"
          onClick={() => navigate("/driver/select-bus")}
        >
          Start Your Duty
        </button>
      </section>

    </div>
  );
}
