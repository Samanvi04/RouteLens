import React, { useState } from "react";
import "./SelectVehicle.css";

export default function SelectVehicle() {
  const [vehicle, setVehicle] = useState("");

  const vehicles = ["Van-01", "Van-02", "SUV-03"];

  return (
    <div className="dv-page">
      <h1 className="dv-title">🚐 Select Vehicle</h1>

      <div className="dv-list">
        {vehicles.map((v) => (
          <div
            key={v}
            className={`dv-item ${vehicle === v ? "active" : ""}`}
            onClick={() => setVehicle(v)}
          >
            {v}
          </div>
        ))}
      </div>

      <button className="dv-btn" disabled={!vehicle}>
        Confirm Vehicle ✔
      </button>
    </div>
  );
}
