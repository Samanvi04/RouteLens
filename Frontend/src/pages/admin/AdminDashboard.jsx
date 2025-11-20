import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="admin-container">

      {/* 🔵 TOP TOOLBAR */}
      <nav className="top-toolbar">
        <h2 className="admin-logo">College Transport Admin</h2>

        <ul className="toolbar-menu">
          <li onClick={() => navigate("/admin/dashboard-home")}>Dashboard</li>
          <li onClick={() => navigate("/admin/drivers-buses")}>Drivers & Buses</li>
          <li onClick={() => navigate("/admin/routes-stops")}>Routes & Stops</li>
          <li onClick={() => navigate("/admin/assignments")}>Assignments</li>
          <li onClick={() => navigate("/admin/live-map")}>Live Map</li>
          <li onClick={() => navigate("/admin/maintenance")}>Maintenance</li>
          <li onClick={() => navigate("/admin/logs")}>Logs</li>
          <li onClick={() => navigate("/admin/profile")}>Admin Profile</li>
        </ul>

        <div className="admin-profile">Admin</div>
      </nav>

      {/* ⭐ WELCOME HERO */}
      <section className="admin-welcome">
        <h1>Welcome, Administrator</h1>
        <p>Monitor buses, drivers, routes, tracking, and analytics.</p>

        <button 
          className="btn-start"
          onClick={() => navigate("/admin/dashboard-home")}
        >
          Go to Dashboard
        </button>
      </section>

    </div>
  );
}
