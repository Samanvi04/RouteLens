import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "/src/pages/images/bus1.jpg"; // local image
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogin = () => {
    if (!role) return;

    if (role === "admin") navigate("/register/admin");
    if (role === "driver") navigate("/register/driver");
    if (role === "student") navigate("/register/student");
  };

  const handleSubmit = () => {
    if (role === "admin") navigate("/admin/dashboard");
    if (role === "driver") navigate("/driver/dashboard");
    if (role === "student") navigate("/student/dashboard");
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Floating Emojis */}
      <span className="login-emoji le1">🚌</span>
      <span className="login-emoji le2">✨</span>
      <span className="login-emoji le3">✨</span>
      <span className="login-emoji le4">🚌</span>

      <div className="login-card">
        <h2 className="title">Welcome Back ✨</h2>
        <p className="role">Role: <b>{role?.toUpperCase()}</b></p>

        <div className="field">
          <label>Email</label>
          <input type="text" placeholder="Enter your email" />
        </div>

        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <button className="login-btn" onClick={handleSubmit}>
          Login 🚀
        </button>

        <p className="register-line">
          Don’t have an account?
          <span onClick={handleLogin}> Register</span>
        </p>
      </div>
    </div>
  );
}
