import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DriverDashboard.css";

export default function DriverDashboard() {
  const navigate = useNavigate();

  // State for emergency popup
  const [showEmergency, setShowEmergency] = useState(false);
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);
  const [showHealthOptions, setShowHealthOptions] = useState(false);

  // 🔴 ALERT admin (placeholder function)
  const alertAdmin = (type) => {
    alert(`Admin has been alerted about: ${type}`);
    // Later → call backend API: POST /api/emergency-alert
  };

  return (
    <div className="driver-container">

      {/* 🔵 TOP NAVIGATION */}
      <nav className="driver-navbar">
        <h2 className="logo">Driver Dashboard</h2>
        <ul>
          <li onClick={() => navigate("/driver/select-bus")}>Select Bus</li>
          <li onClick={() => navigate("/driver/select-vehicle")}>Select Vehicle</li>
          <li onClick={() => navigate("/driver/start-journey")}>Start Journey</li>
          <li onClick={() => navigate("/driver/active-journey")}>Active Journey</li>
          <li onClick={() => navigate("/driver/profile")}>Profile</li>
        </ul>
      </nav>

      {/* ⭐ WELCOME SCREEN */}
      <section className="welcome-hero">
        <h1>Welcome, Driver</h1>
        <p>"Safe journeys begin with responsible driving."</p>

        <button
          className="btn-start"
          onClick={() => navigate("/driver/select-bus")}
        >
          Start Your Duty
        </button>

        {/* 🚨 EMERGENCY BUTTON */}
        <button
          className="btn-emergency"
          onClick={() => setShowEmergency(true)}
        >
          🚨 Emergency
        </button>
      </section>

      {/* ================================
             EMERGENCY POPUP MODAL
         ================================ */}
      {showEmergency && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Emergency Type</h2>
            <button
              className="modal-btn vehicle"
              onClick={() => {
                setShowVehicleOptions(true);
                setShowEmergency(false);
              }}
            >
              🚐 Vehicle Problem
            </button>

            <button
              className="modal-btn health"
              onClick={() => {
                setShowHealthOptions(true);
                setShowEmergency(false);
              }}
            >
              🏥 Health Issue
            </button>

            <button className="close-btn" onClick={() => setShowEmergency(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* =====================================
            VEHICLE ISSUE OPTIONS
         ===================================== */}
      {showVehicleOptions && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Nearby Vehicle Helpline</h2>

            <ul className="info-list">
              <li>🔧 24/7 Breakdown Help: 1800-111-222</li>
              <li>🔩 Emergency Tow Service: 1800-333-444</li>
              <li>🛠 Mechanic Finder: www.mechanic-nearby.com</li>
            </ul>

            <button
              className="alert-admin-btn"
              onClick={() => alertAdmin("Vehicle Problem")}
            >
              Alert Admin
            </button>

            <button
              className="close-btn"
              onClick={() => setShowVehicleOptions(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =====================================
            HEALTH ISSUE OPTIONS
         ===================================== */}
      {showHealthOptions && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Nearby Hospitals</h2>

            <ul className="info-list">
              <li>🏥 City Hospital – 1.2 km away</li>
              <li>🚑 CarePlus Medical Center – 2.5 km away</li>
              <li>🩺 Emergency Helpline: 108</li>
            </ul>

            <button
              className="alert-admin-btn"
              onClick={() => alertAdmin("Driver Health Issue")}
            >
              Alert Admin
            </button>

            <button
              className="close-btn"
              onClick={() => setShowHealthOptions(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
