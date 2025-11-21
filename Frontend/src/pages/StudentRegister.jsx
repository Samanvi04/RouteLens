import React, { useState } from "react";
import axios from "axios";
import bgImage from "/src/pages/images/bus1.jpg";
import "./StudentRegister.css";

export default function StudentRegister() {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    grade: ""
  });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    if (!form.name || !form.email || !form.password || !form.grade) {
      alert("Please fill all required fields!");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    // Ask for location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position;

        const url = `${API}/api/students/register`;
        console.log("📡 Student Register API:", url);

        try {
          const res = await axios.post(url, {
            ...form,
            lat: latitude,
            lng: longitude
          });

          console.log("🟢 API RESPONSE:", res.data);

          if (res.data.success) {
            alert("Student registered successfully!");
          } else {
            alert(res.data.error || "Registration failed");
          }
        } catch (err) {
          console.error("❌ Error:", err);
          alert("Something went wrong: " + (err.response?.data?.error || err.message));
        }
      },
      () => {
        alert("Please enable location to register!");
      }
    );
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
        <input name="password" type="password" placeholder="Password" onChange={change} />
        <input name="grade" placeholder="Grade/Class" onChange={change} />

        <button onClick={register}>Create Account 🚀</button>
      </div>
    </div>
  );
}
