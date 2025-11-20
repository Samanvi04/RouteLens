import React from "react";
import "./DriverDashboard.css";

export default function DriverHome() {
  return (
    <div className="page-container">
      <h1>Welcome, Driver</h1>
      <p>"Safe journeys begin with responsible driving."</p>

      <button className="btn-start">Start Your Duty</button>
    </div>
  );
}
