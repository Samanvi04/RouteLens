import React, { useState, useEffect, useRef } from "react";
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

  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [trackingStatus, setTrackingStatus] = useState("idle");
  const watchIdRef = useRef(null);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    if (!form.name || !form.email || !form.password || !form.grade) {
      alert("Please fill all required fields!");
      return;
    }

    // Use tracked coords if available
    let latitude = coords.lat;
    let longitude = coords.lng;

    if ((latitude == null || longitude == null) && navigator.geolocation) {
      try {
        const p = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
        });
        latitude = p.coords?.latitude ?? latitude;
        longitude = p.coords?.longitude ?? longitude;
        setCoords({ lat: latitude, lng: longitude });
        setTrackingStatus(latitude != null ? 'tracking' : trackingStatus);
      } catch (err) {
        console.warn('[StudentRegister] one-time geolocation failed', err.message || err);
        setTrackingStatus('denied');
      }
    }

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
  };

  return (
    <div
      className="student-reg-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Tracking status banner */}
      <div style={{ position: 'fixed', top: 12, right: 12, background: '#fff8', padding: '8px 12px', borderRadius: 8, zIndex: 4000 }}>
        <strong>Location:</strong>
        {trackingStatus === 'tracking' && coords.lat != null ? (
          <span style={{ marginLeft: 8 }}>
            Tracking ✓ ({coords.lat.toFixed(5)}, {coords.lng.toFixed(5)})
          </span>
        ) : trackingStatus === 'denied' ? (
          <span style={{ marginLeft: 8, color: 'crimson' }}>Permission denied</span>
        ) : trackingStatus === 'error' ? (
          <span style={{ marginLeft: 8, color: 'crimson' }}>Tracking error</span>
        ) : (
          <span style={{ marginLeft: 8 }}>Idle</span>
        )}
        {trackingStatus === 'tracking' && (
          <button style={{ marginLeft: 10 }} onClick={stopTracking}>Stop</button>
        )}
      </div>
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
