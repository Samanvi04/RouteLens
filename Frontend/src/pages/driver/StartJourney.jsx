import React from "react";
import "./StartJourney.css";

export default function StartJourney() {
  return (
    <div className="sj-container">

      <h1 className="sj-title">🚦 Ready to Start Journey?</h1>
      <p className="sj-subtext">Ensure you have selected your bus & vehicle before starting.</p>

      {/* MAP */}
      <div className="map-box">
        <div className="map-header">
          <h3>🗺 Route to Mysore Palace</h3>
          <p>Live GPS navigation will appear here</p>
        </div>

        {/* Fake Map UI */}
        <div className="map-area">

          {/* Route Line */}
          <div className="route-line"></div>

          {/* Start Point */}
          <div className="point start">Start</div>

          {/* Destination */}
          <div className="point end">Mysore Palace</div>

        </div>
      </div>

      {/* START BUTTON */}
      <button className="sj-btn">Start Journey 🚀</button>
    </div>
  );
}
