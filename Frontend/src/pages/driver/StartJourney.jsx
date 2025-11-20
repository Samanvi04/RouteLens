import React from "react";
import "./DriverDashboard.css";

export default function StartJourney() {
  return (
    <div className="page-container">
      <h2 className="page-title">Start Journey</h2>

      <div className="start-journey-box">
        <p className="info-text">
          Press the button below to begin your journey tracking.
        </p>

        <button className="btn-primary journey-btn">
          Start Journey
        </button>
      </div>
    </div>
  );
}
