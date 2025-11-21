import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "/src/pages/images/bus1.jpg"; // local image
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  const handleLogin = () => {
    if (!role) return;

    if (role === "admin") navigate("/register/admin");
    if (role === "driver") navigate("/register/driver");
    if (role === "student") navigate("/register/student");
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const url = `${API}/api/auth/login`;

    try {
      const res = await axios.post(url, { email, password });
      console.log("Login response:", res.data);

      if (res.data?.success) {
        // store role and userId for navigation and session
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userId", String(res.data.userId || ""));
        // navigate based on role
        if (res.data.role === "admin") navigate("/admin/dashboard");
        if (res.data.role === "driver") navigate("/driver/dashboard");
        if (res.data.role === "student") navigate("/student/dashboard");
      } else {
        alert(res.data?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err?.response || err.message || err);
      alert(err.response?.data?.message || "Error logging in");
    }
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
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter your email" />
        </div>

        <div className="field">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
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
