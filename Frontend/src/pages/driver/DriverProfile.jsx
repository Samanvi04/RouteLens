import React from "react";
import "./DriverProfile.css";

export default function DriverProfile() {
  return (
    <div className="dp-page">
      <h1 className="dp-title">👨‍✈️ Driver Profile</h1>

      <div className="dp-box">
        <p><strong>Name:</strong> Ravi Kumar</p>
        <p><strong>Driver ID:</strong> DRV-102</p>
        <p><strong>License No:</strong> DL-2394019</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
      </div>

      <button className="dp-edit">Edit Profile ✏️</button>
      <button className="dp-logout">Logout 🚪</button>
    </div>
  );
}
