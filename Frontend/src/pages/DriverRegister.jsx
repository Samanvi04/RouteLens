import React, { useState } from "react";
import bgImage from "/src/pages/images/bus1.jpg"; // your local image
import "./DriverRegister.css";

export default function DriverRegister() {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    license: "",
    phone: "",
    password: ""
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    alert("Driver Registered (Backend API not added yet)");
  };

  return (
    <div
      className="driver-reg-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Floating Emojis */}
      <span className="driver-emoji de1">🚌</span>
      <span className="driver-emoji de2">✨</span>
      <span className="driver-emoji de3">📍</span>
      <span className="driver-emoji de4">⭐</span>

      <div className="driver-reg-box">
        <h2>Driver Signup 🚌</h2>

        <input
          name="name"
          placeholder="Driver Name"
          onChange={change}
        />
        <input
          name="license"
          placeholder="License Number"
          onChange={change}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={change}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={change}
        />

        <button onClick={register}>Register Driver 🚀</button>
      </div>
    </div>
  );
}
