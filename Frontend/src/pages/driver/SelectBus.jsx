import React from "react";
import "./DriverDashboard.css";

export default function SelectBus() {
  return (
    <div className="page-container">
      <h2>Select Bus</h2>

      <div className="bus-list">
        <div className="bus-item">MH-01-AB-1234</div>
        <div className="bus-item">MH-01-XY-9988</div>
        <div className="bus-item">MH-04-BZ-6721</div>
      </div>

      <button className="btn-primary">Confirm Bus</button>
    </div>
  );
}
