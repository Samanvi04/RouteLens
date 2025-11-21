import React, { useState } from "react";
import bgImage from "/src/pages/images/bus1.jpg"; // Local image
import "./StudentRegister.css";

export default function StudentRegister() {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    alert("Student Registered (Backend API not added yet)");
  };

  return (
    <div
      className="student-reg-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Floating Corner Emojis */}
      <span className="stu-emoji se1">🎓</span>
      <span className="stu-emoji se2">✨</span>
      <span className="stu-emoji se3">📘</span>
      <span className="stu-emoji se4">⭐</span>

      <div className="student-reg-box">
        <h2>Student Signup 🎓</h2>

        <input name="name" placeholder="Full Name" onChange={change} />
        <input name="email" placeholder="Email" onChange={change} />
        <input name="phone" placeholder="Phone Number" onChange={change} />
        <input name="password" type="password" placeholder="Password" onChange={change} />

        <button onClick={register}>Create Account 🚀</button>
      </div>
    </div>
  );
}
