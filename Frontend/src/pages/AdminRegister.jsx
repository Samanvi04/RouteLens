import React, { useState } from "react";
import axios from "axios";
import bgImage from "/src/pages/images/bus1.jpg"; // local bg image
import "./AdminRegister.css";

export default function AdminRegister() {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    const base = API || "http://localhost:5000";
    const url = `${base}/api/admins/register`;
    try {
      const res = await axios.post(url, form);
      console.log("Register response:", res.data);
      if (res.data?.success) {
        alert("Admin Registered ✔️");
      } else {
        alert(res.data?.error || "Registration failed");
      }
    } catch (err) {
      alert("Error registering admin");
      console.error("Registration error:", err?.response || err.message || err);
    }
  };

  return (
    <div
      className="admin-reg-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Floating Emojis */}
      <span className="admin-emoji ae1">👩‍💼</span>
      <span className="admin-emoji ae2">✨</span>
      <span className="admin-emoji ae3">🔐</span>
      <span className="admin-emoji ae4">⭐</span>

      <div className="admin-reg-box">
        <h2>Admin Signup 👩‍💼</h2>

        <input
          name="name"
          placeholder="Admin Name"
          onChange={change}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={change}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={change}
        />

        <button onClick={register}>Create Admin Account 🚀</button>
      </div>
    </div>
  );
}
