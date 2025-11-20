import React from "react";
import "./AdminPages.css";

export default function DashboardHome() {
  return (
    <div className="page-container">
      <h2 className="page-title">Admin Dashboard</h2>

      <div className="kpi-grid">
        <div className="kpi-card">Active Journeys: 12</div>
        <div className="kpi-card">Average Delay: 4 min</div>
        <div className="kpi-card">Daily Trips: 39</div>
      </div>

      <div className="chart-box">Chart.js Graph Placeholder</div>
    </div>
  );
}
