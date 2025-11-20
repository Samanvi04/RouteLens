import React from "react";
import "./DriverDashboard.css";

export default function ActiveJourney() {
  return (
    <div className="page-container">
      <h2>Active Journey</h2>

      <div className="map-box">
        <div className="map-placeholder">Live Map Placeholder</div>
      </div>

      <div className="eta-box">
        <span>Next Stop: Block A</span>
        <span>ETA: 5 mins</span>
      </div>

      <button className="btn-secondary">Stop Check-in</button>
      <button className="btn-danger end-journey">End Journey</button>
    </div>
  );
}
