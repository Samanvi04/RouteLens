import React from "react";
import "./StudentPages.css";

export default function StudentPreferences() {
  return (
    <div className="page-container">
      <h2 className="page-title">Notification Preferences</h2>

      <div className="checkbox-group">
        <label><input type="checkbox" /> SMS Alerts</label>
        <label><input type="checkbox" /> Push Notifications</label>
      </div>

      <div className="form-group">
        <label>Alert Timing</label>
        <select>
          <option>10 minutes before</option>
          <option>5 minutes before</option>
          <option>At arrival</option>
        </select>
      </div>

      <div className="checkbox-group">
        <label><input type="checkbox" /> Delay Alerts</label>
      </div>

      <button className="btn-primary">Save Preferences</button>
    </div>
  );
}
