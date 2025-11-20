import React from "react";
import "./AdminPages.css";

export default function AdminProfile() {
  return (
    <div className="page-container">
      <h2 className="page-title">Admin Profile & Settings</h2>

      <div className="form-group">
        <label>Twilio API Key</label>
        <input type="text" placeholder="Enter Twilio Key" />
      </div>

      <div className="form-group">
        <label>Google Maps API Key</label>
        <input type="text" placeholder="Enter Maps Key" />
      </div>

      <button className="btn-primary">Save Settings</button>
    </div>
  );
}
