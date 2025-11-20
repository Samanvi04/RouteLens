import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./images/bus1.jpg";   // local image
import "./RoleSelect.css";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("role", role);
    navigate("/login");
  };

  return (
    <div
      className="rs-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      {/* ✨ Floating corner emojis */}
      <span className="floating-emoji fe1">✨</span>
      <span className="floating-emoji fe2">✨</span>
      <span className="floating-emoji fe3">⚡</span>
      <span className="floating-emoji fe4">⚡</span>

      {/* Overlay */}
      <div className="overlay"></div>

      <div className="rs-content">
        <h1 className="rs-title">
          Welcome to <span className="highlight">RouteLens</span> 🚍💫
        </h1>

        <p className="rs-subtitle">Choose your role to get started</p>

        <div className="rs-grid">

          {/* ADMIN */}
          <div className="role-box admin-box" onClick={() => selectRole("admin")}>
            <span className="emoji">👩‍💼💼</span>
            <h3>Admin</h3>
            <p>Manage drivers, buses, routes & system controls</p>
          </div>

          {/* DRIVER */}
          <div className="role-box driver-box" onClick={() => selectRole("driver")}>
            <span className="emoji">🚌🛣️</span>
            <h3>Driver</h3>
            <p>Start journeys, update GPS & manage route stops</p>
          </div>

          {/* STUDENT */}
          <div className="role-box student-box" onClick={() => selectRole("student")}>
            <span className="emoji">🎓📱</span>
            <h3>Student / Parent</h3>
            <p>Track buses live & receive notifications</p>
          </div>

        </div>
      </div>
    </div>
  );
}
