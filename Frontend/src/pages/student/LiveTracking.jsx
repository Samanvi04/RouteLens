import React from "react";
import "./StudentPages.css";

export default function LiveTracking() {
  return (
    <div className="page-container">
      <h2 className="page-title">Live Bus Tracking</h2>

      <div className="map-box">
        <div className="map-placeholder">Live Map Placeholder</div>
      </div>

      <div className="eta-box">
        <span>Selected Bus: MH-01-AB-1234</span>
        <span>ETA: 12 mins</span>
      </div>
    </div>
  );
}
