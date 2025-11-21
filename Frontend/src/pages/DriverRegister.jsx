import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import bgImage from "/src/pages/images/bus1.jpg"; // your local image
import "./DriverRegister.css";

export default function DriverRegister() {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [form, setForm] = useState({
    name: "",
    email: "",
    license_no: "",
    vehicle_pref: "",
    password: ""
  });

  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [trackingStatus, setTrackingStatus] = useState("idle"); // 'idle' | 'tracking' | 'denied' | 'error'
  const watchIdRef = useRef(null);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    if (!form.name || !form.email || !form.license_no || !form.password) {
      alert("Please fill name, email, license and password");
      return;
    }

    // Use the latest tracked coords if available
    let latitude = coords.lat;
    let longitude = coords.lng;

    // If we don't have tracked coords, attempt a one-time get (this will prompt for permission)
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
        console.warn('[DriverRegister] one-time geolocation failed', err.message || err);
        setTrackingStatus('denied');
      }
    }

    const url = `${API}/api/drivers/register`;
    console.log("📡 Driver Register API:", url);
    console.log("📦 Payload (will include latest coords):", { ...form, lat: latitude, lng: longitude });

    try {
      const res = await axios.post(url, {
        ...form,
        lat: latitude,
        lng: longitude
      });

      console.log("🟢 API RESPONSE:", res.data);

      if (res.data?.success) {
        alert("Driver registered successfully!");
      } else {
        alert(res.data?.error || "Registration failed");
      }
    } catch (err) {
      console.error("❌ Error registering driver:", err?.response || err.message || err);
      alert("Something went wrong: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    // Start live tracking on mount
    if (!navigator.geolocation) {
      setTrackingStatus('error');
      return;
    }

    try {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { coords } = position || {};
          const latitude = coords?.latitude ?? null;
          const longitude = coords?.longitude ?? null;
          setCoords({ lat: latitude, lng: longitude });
          setTrackingStatus('tracking');
        },
        (err) => {
          console.warn('[DriverRegister] watchPosition error', err.message || err);
          if (err.code === 1) setTrackingStatus('denied');
          else setTrackingStatus('error');
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
      watchIdRef.current = id;
    } catch (e) {
      console.warn('[DriverRegister] geolocation watch failed', e.message || e);
      setTrackingStatus('error');
    }

    return () => {
      // Clean up watch
      if (watchIdRef.current != null && navigator.geolocation) {
        try { navigator.geolocation.clearWatch(watchIdRef.current); } catch (e) {}
      }
    };
  }, []);

  const stopTracking = () => {
    if (watchIdRef.current != null && navigator.geolocation) {
      try { navigator.geolocation.clearWatch(watchIdRef.current); } catch (e) {}
      watchIdRef.current = null;
      setTrackingStatus('idle');
    }
  };

  return (
    <div
      className="driver-reg-bg"
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
      {/* Floating Emojis */}
      <span className="driver-emoji de1">🚌</span>
      <span className="driver-emoji de2">✨</span>
      <span className="driver-emoji de3">📍</span>
      <span className="driver-emoji de4">⭐</span>

      <div className="driver-reg-box">
        <h2>Driver Signup 🚌</h2>

        <input name="name" placeholder="Driver Name" onChange={change} />
        <input name="email" placeholder="Email" onChange={change} />
        <input name="license_no" placeholder="License Number" onChange={change} />
        <input name="vehicle_pref" placeholder="Vehicle Preference (optional)" onChange={change} />
        <input name="password" type="password" placeholder="Password" onChange={change} />

        <button onClick={register}>Register Driver 🚀</button>
      </div>
    </div>
  );
}
