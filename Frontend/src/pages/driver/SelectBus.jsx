import React, { useState } from "react";
import "./SelectBus.css";

export default function SelectBus() {
  const [selectedBus, setSelectedBus] = useState("");

  const buses = ["MH-01-AB-1234", "MH-01-XY-9988", "MH-04-BZ-6721"];

  return (
    <div className="db-page">
      <h1 className="db-title">🚌 Select Bus</h1>

      <div className="db-bus-list">
        {buses.map((bus) => (
          <div
            key={bus}
            className={`db-bus-item ${selectedBus === bus ? "active" : ""}`}
            onClick={() => setSelectedBus(bus)}
          >
            {bus}
          </div>
        ))}
      </div>

      <button className="db-btn-primary" disabled={!selectedBus}>
        Confirm Bus ✔
      </button>
    </div>
  );
}
