import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">

      {/* 🔵 ADMIN NAVIGATION BAR */}
      <nav className="admin-navbar">
        <h2 className="admin-logo">Admin Dashboard</h2>
        <ul>
          <li onClick={() => navigate("/admin/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/admin/drivers")}>Drivers</li>
          <li onClick={() => navigate("/admin/buses")}>Buses</li>
          <li onClick={() => navigate("/admin/routes")}>Routes</li>
          <li onClick={() => navigate("/admin/assignments")}>Assignments</li>
          <li onClick={() => navigate("/admin/live-map")}>Live Map</li>
          <li onClick={() => navigate("/admin/maintenance")}>Maintenance</li>
          <li onClick={() => navigate("/admin/profile")}>Profile</li>
        </ul>
      </nav>

      {/* ⭐ MAIN 2-COLUMN SECTION */}
      <section className="admin-section">

        {/* LEFT SIDE — WELCOME */}
        <div className="admin-left">
          <h1>Welcome, Admin</h1>
          <p>“Control, monitor, and manage your transportation system effortlessly.”</p>

          <button className="btn-admin" onClick={() => navigate("/admin/dashboard")}>
            Go to Main Panel
          </button>
        </div>

        

      </section>
    </div>
  );
}
