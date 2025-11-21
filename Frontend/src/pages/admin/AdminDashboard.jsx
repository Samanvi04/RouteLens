import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">

      {/* NAVIGATION BAR */}
      <nav className="admin-navbar">
        <h2 className="admin-logo">Admin Dashboard</h2>

        <ul>
          <li onClick={() => navigate("/admin/driversbuses")}>Drivers & Buses</li>
          <li onClick={() => navigate("/admin/assignments")}>Assignments</li>
          <li onClick={() => navigate("/admin/live-map")}>Live Map</li>
          <li onClick={() => navigate("/admin/maintenance")}>Maintenance</li>
        </ul>
      </nav>

      {/* MAIN SECTION */}
      <section className="admin-section">
        <div className="admin-left">
          <h1>Welcome, Admin</h1>
          <p>“Control, monitor, and manage your transportation system effortlessly.”</p>

          <button
            className="btn-admin"
            onClick={() => navigate("/admin/manage")}
          >
            Manage Buses, Drivers & Routes
          </button>
        </div>
      </section>

    </div>
  );
}
