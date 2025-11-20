import React from "react";
import "./StartJourney.css";

export default function StartJourney() {
  return (
    <div className="sj-page">
      <h1 className="sj-title">🚦 Ready to Start Journey?</h1>

      <p className="sj-text">Make sure you selected bus & vehicle.</p>

      <button className="sj-btn">Start Journey 🚀</button>
    </div>
  );
}
