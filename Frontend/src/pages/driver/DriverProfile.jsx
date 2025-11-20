import React from "react";
import "./DriverDashboard.css";

export default function DriverProfile() {
  return (
    <div className="page-container">
      <h2>Driver Profile</h2>

      <div className="profile-box">
        <p><strong>Name:</strong> Ravi Kumar</p>
        <p><strong>Driver ID:</strong> DRV-102</p>
        <p><strong>License No:</strong> DL-2394019</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Emergency Contact:</strong> +91 91234 56789</p>
      </div>

      <button className="btn-primary">Edit Profile</button>
      <button className="btn-danger logout-btn">Logout</button>
    </div>
  );
}
