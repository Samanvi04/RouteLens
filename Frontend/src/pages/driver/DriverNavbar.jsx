import React from "react";
import { Link } from "react-router-dom";
import "./DriverDashboard.css";

export default function DriverNavbar() {
  return (
    <nav className="driver-navbar">
      <h2 className="logo">Driver Dashboard</h2>

      <ul>
        <li><Link to="/driver/home">Home</Link></li>
        <li><Link to="/driver/select-bus">Select Bus</Link></li>
        <li><Link to="/driver/select-vehicle">Select Vehicle</Link></li>
        <li><Link to="/driver/start-journey">Start Journey</Link></li>
        <li><Link to="/driver/active-journey">Active Journey</Link></li>
        <li><Link to="/driver/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}
