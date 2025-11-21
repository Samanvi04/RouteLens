import React from "react";
import DriverSection from "./DriverSection";
import BusSection from "./BusSection";
import RouteSection from "./RouteSection";

import "./AdminManage.css";

export default function AdminManage() {
  return (
    <div className="admin-manage">
      <h1>Admin Management Dashboard</h1>
      <div className="sections-container">
        <DriverSection />
        <BusSection />
        <RouteSection />
       
      </div>
    </div>
  );
}
