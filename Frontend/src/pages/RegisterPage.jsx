import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "/src/pages/images/bus1.jpg";
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  // Base URL from .env
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // -------------------- DEBUG ENV --------------------
  useEffect(() => {
    console.log("🔧 Loaded .env API Base URL:", API_BASE_URL);
    if (!API_BASE_URL) {
      console.warn("⚠ VITE_API_BASE_URL missing! Check .env");
    }
  }, []);

  // -------------------- STATE --------------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // -------------------- REGISTER --------------------
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields!");
      return;
    }

    // Log form payload (useful for debugging)
    console.log("📦 Sending Registration Data:", form);

    // Build POST URL from environment variable with fallback
    const url = `${API_BASE_URL || "http://localhost:5000"}/api/admins/register`;
    console.log(`🔗 Final POST URL: ${url}`);

    try {
      // FIXED: Proper axios URL formatting
      const res = await axios.post(url, {
        name: form.name,
        email: form.email,
        password: form.password
      });

      console.log("✅ SERVER RESPONSE:", res.data);

      if (res.data.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert(res.data.error || "Registration failed");
      }
    } catch (err) {
      console.error("❌ Registration Error:", err.message);

      if (err.response) {
        console.error("⚠ Backend Error:", err.response.data);
      } else if (err.request) {
        console.error("⚠ No Response from Server");
      } else {
        console.error("⚠ Request Setup Error:", err);
      }

      alert("Error: " + (err.response?.data?.error || "Server issue"));
    }
  };

  return (
    <div
      className="reg-bg"
      // FIXED: Correct background image syntax
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="reg-panel">
        <h1>Create Account ✨</h1>
        <p className="reg-desc">Join RouteLens to track your buses easily.</p>

        <div className="reg-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="reg-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button className="reg-submit" onClick={handleRegister}>
          Sign Up 🚀
        </button>

        <p className="reg-footer">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>
      </div>
    </div>
  );
}
