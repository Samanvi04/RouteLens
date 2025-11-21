import React from "react";
import "./ActiveJourney.css";

export default function ActiveJourney() {
  return (
    <div className="aj-page">
      <h1 className="aj-title">🛰 Live Journey</h1>

      <div className="aj-map">
        <span className="aj-placeholder">📍 Map Loading...</span>
      </div>

      <div className="aj-info">
        <p>Next Stop: <b>Block A</b></p>
        <p>ETA: <b>5 minutes</b></p>
      </div>

      <button className="aj-stop">Arrived at Stop ✔</button>
      <button className="aj-end">End Journey ❌</button>
    </div>
  );
}
