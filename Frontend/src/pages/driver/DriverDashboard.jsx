import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DriverDashboard.css";

export default function DriverDashboard() {
  const navigate = useNavigate();

  const [showEmergency, setShowEmergency] = useState(false);
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);
  const [showHealthOptions, setShowHealthOptions] = useState(false);

  const alertAdmin = (type) => {
    alert(`Admin has been alerted: ${type}`);
  };

  return (
    <div className="driver-container">

      {/* TOP NAVIGATION */}
      <nav className="driver-navbar">
        <h2 className="logo">Driver Dashboard</h2>

        <ul>
          <li onClick={() => navigate("/driver/select-bus")}>Select Bus</li>
          <li onClick={() => navigate("/driver/start-journey")}>Start Journey</li>
          <li onClick={() => navigate("/driver/profile")}>Profile</li>

          <li className="nav-emergency" onClick={() => setShowEmergency(true)}>
            🚨
          </li>
        </ul>
      </nav>

      {/* WELCOME */}
      <section className="welcome-hero">
        <h1>Welcome, Driver</h1>
        <p>"Safe journeys begin with responsible driving."</p>

        <button
          className="btn-start"
          onClick={() => navigate("/driver/select-bus")}
        >
          Start Your Duty
        </button>
      </section>

      {/* EMERGENCY POPUP */}
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

      {/* VEHICLE ISSUE POPUP */}
      {showVehicleOptions && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Nearby Support</h2>

            <ul className="info-list">
              <li>⛽ <strong>Petrol Bunk:</strong> HP Petrol Station (1.1 km)</li>
              <li>⛽ Shell Petrol Pump – 1.9 km</li>
              <li>🔧 Ramesh Auto Garage – 800m</li>
              <li>🔧 QuickFix Mechanics – 1.5 km</li>
            </ul>

            <button
              className="alert-admin-btn"
              onClick={() => alertAdmin("Vehicle Breakdown")}
            >
              Alert Admin 🚨
            </button>

            <button className="close-btn" onClick={() => setShowVehicleOptions(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* HEALTH ISSUE POPUP */}
      {showHealthOptions && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Nearby Hospitals</h2>

            <ul className="info-list">
              <li>🏥 City Hospital – 1.2 km</li>
              <li>🚑 CarePlus Medical Center – 2.5 km</li>
              <li>🩺 Apollo Clinic – 3 km</li>
              <li>📞 Emergency Helpline: 108</li>
            </ul>

            <button
              className="alert-admin-btn"
              onClick={() => alertAdmin("Driver Health Emergency")}
            >
              Alert Admin 🚨
            </button>

            <button className="close-btn" onClick={() => setShowHealthOptions(false)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
