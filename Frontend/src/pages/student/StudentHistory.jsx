import React from "react";
import "./StudentPages.css";

export default function StudentHistory() {
  return (
    <div className="page-container">
      <h2 className="page-title">Trip Notification History</h2>

      <div className="history-item">2025-11-19 • Bus R1 • “Bus arriving in 10 min”</div>
      <div className="history-item">2025-11-18 • Bus R2 • “Bus delayed by 6 min”</div>
      <div className="history-item">2025-11-17 • Bus R1 • “Bus arrived”</div>
    </div>
  );
}
