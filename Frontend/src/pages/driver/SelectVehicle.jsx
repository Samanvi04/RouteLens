import React from "react";
import "./DriverDashboard.css";

export default function SelectVehicle() {
  return (
    <div className="page-container">
      <h2>Select Vehicle (Optional)</h2>

      <div className="bus-list">
        <div className="bus-item">Vehicle 1</div>
        <div className="bus-item">Vehicle 2</div>
        <div className="bus-item">Vehicle 3</div>
      </div>

      <button className="btn-primary">Confirm Vehicle</button>
    </div>
  );
}
