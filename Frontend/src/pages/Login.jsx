import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogin = () => {
    if (!role) return;

    if (role === "admin") navigate("/admin/dashboard");
    if (role === "driver") navigate("/driver/dashboard");
    if (role === "student") navigate("/student/dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2 className="title">Login to RouteLens</h2>
        <p className="role">Role: <b>{role?.toUpperCase()}</b></p>

        <div className="field">
          <label>Username</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Password</label>
          <input type="password" />
        </div>

        <button className="login-btn" onClick={handleLogin}>Login</button>

        <p className="register-line">
          Don't have an account? 
          <span onClick={() => navigate("/register")}> Sign up</span>
        </p>

      </div>
      
    </div>
  );
}
