import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "/src/pages/images/bus1.jpg"; // <-- your local image
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div 
      className="reg-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="reg-panel">
        <h1>Create Account</h1>
        <p className="reg-desc">Join RouteLens to track your buses easily.</p>

        <div className="reg-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div className="reg-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="reg-group">
          <label>Password</label>
          <input type="password" placeholder="Create a password" />
        </div>

        <button className="reg-submit">Sign Up</button>

        <p className="reg-footer">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>
      </div>
    </div>
  );
}
