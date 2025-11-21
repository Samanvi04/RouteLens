import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentPages.css";

export default function StudentSubscriptions() {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [selectedBus, setSelectedBus] = useState("");
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get(`${API}/api/buses`);
        setBuses(res.data.buses || []);
      } catch (err) {
        console.error('Failed to fetch buses', err);
      }
    };
    fetchBuses();
  }, []);

  const handleSelect = async () => {
    const studentId = localStorage.getItem("userId");
    if (!studentId) return alert("You must be logged in as a student to subscribe to a bus");
    if (!selectedBus) return alert("Select a bus first");

    setLoading(true);
    try {
      await axios.put(`${API}/api/students/${studentId}/assign-bus`, { bus_id: selectedBus });
      // after successful assign, navigate to student map route
      navigate('/student/map');
    } catch (err) {
      console.error('Assign bus error', err);
      alert(err.response?.data?.message || 'Failed to assign bus');
    } finally {
      setLoading(false);
    }
  };

  const onCardClick = (bus) => {
    setSelectedBus(String(bus.id || bus.number));
    try { localStorage.setItem('selectedBus', String(bus.id || bus.number)); } catch (e) {}
    // Navigate to the common student map route for any bus card
    navigate('/student/map');
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Manage Subscriptions</h2>

      {/* Phone */}
      <div className="form-group">
        <label>Phone Number for SMS Alerts</label>
        <input type="text" placeholder="Enter phone number" />
      </div>

      {/* 🔵 Select Bus (NEW UI) */}
      <h3 className="bus-select-title">Select Bus</h3>

      <div className="student-bus-list">
        {buses.map((bus) => (
          <div
            key={bus.id || bus.number}
            className={`student-bus-item ${selectedBus === String(bus.id || bus.number) ? "active" : ""}`}
            onClick={() => onCardClick(bus)}
          >
            <div className="student-bus-header">
              <h4>{bus.name || bus.number || `Bus ${bus.id || ''}`}</h4>
              <span className="student-badge">{bus.capacity || "-"} Capacity</span>
            </div>

            <p className="student-destination">
              🏁 Bus ID: <strong>{bus.id || bus.number}</strong>
            </p>
          </div>
        ))}
        {buses.length === 0 && <p>No buses available</p>}
      </div>

      <button className="btn-primary" disabled={!selectedBus || loading} onClick={handleSelect}>
        {loading ? 'Assigning...' : 'Select'}
      </button>
    </div>
  );
}
