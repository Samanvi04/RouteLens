import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "/src/pages/images/bus1.jpg";
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  // Extract base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 🔍 Log .env variable on component load  
  useEffect(() => {
    console.log("🔧 Loaded .env API Base URL:", API_BASE_URL);
    if (!API_BASE_URL) {
      console.warn("⚠️ VITE_API_BASE_URL is NOT LOADED! Check your .env file.");
    }
  }, []);

  // Form State  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Input Handler  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Register Handler (with logs)
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields!");
      return;
    }

    console.log("📦 Sending Registration Data:", form);
    console.log(`🔗 Final POST URL: ${API_BASE_URL}/admins/register`);

    try {
      const res = await axios.post(`${API_BASE_URL}/admins/register`, {
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
      console.error("❌ ERROR OCCURRED DURING REGISTRATION");
      console.error("🔍 Error Message:", err.message);

      if (err.response) {
        console.error("⚠️ Backend Returned Error:");
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      } else if (err.request) {
        console.error("⚠️ No Response Received from Server.");
      } else {
        console.error("⚠️ Error Setting Up Request:", err);
      }

      alert("Error: " + (err.response?.data?.error || "Server issue"));
    }
  };

  return (
    <div
      className="reg-bg"
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
