import React from "react";
import "./StudentPages.css";

export default function StudentSubscriptions() {
  return (
    <div className="page-container">
      <h2 className="page-title">Manage Subscriptions</h2>

      <div className="form-group">
        <label>Phone Number for SMS Alerts</label>
        <input type="text" placeholder="Enter phone number" />
      </div>

      <div className="form-group">
        <label>Select Route</label>
        <select>
          <option>Choose a route</option>
          <option>Route R1 — Campus Loop</option>
          <option>Route R2 — North Shuttle</option>
        </select>
      </div>

      <div className="form-group">
        <label>Select Bus</label>
        <select>
          <option>Choose a bus</option>
          <option>MH-01-AB-1234</option>
          <option>MH-01-XY-9988</option>
        </select>
      </div>

      <button className="btn-primary">Subscribe</button>
    </div>
  );
}
