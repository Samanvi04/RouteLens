import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelect.css";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("role", role);
    navigate("/login");
  };

  return (
    <div className="rs-container">

      <div className="overlay"></div>

      <div className="rs-content">
        <h1 className="rs-title">
          Welcome to <span className="highlight">RouteLens</span> 🚌✨
        </h1>

        <p className="rs-subtitle">Choose your role to continue</p>

        <div className="rs-grid">

          <div className="role-box admin-box" onClick={() => selectRole("admin")}>
            <span className="emoji">👩‍💼</span>
            <h3>Admin</h3>
            <p>Manage buses, drivers & routes</p>
          </div>

          <div className="role-box driver-box" onClick={() => selectRole("driver")}>
            <span className="emoji">🚌</span>
            <h3>Driver</h3>
            <p>Start journeys & send GPS updates</p>
          </div>

          <div className="role-box student-box" onClick={() => selectRole("student")}>
            <span className="emoji">🎓</span>
            <h3>Student / Parent</h3>
            <p>Track buses & get alerts</p>
          </div>

        </div>
      </div>
    </div>
  );
}
