import React from "react";
import "./StudentPages.css";

export default function StudentHistory() {
  const history = [
    { date: "2025-11-20", bus: "BUS-3", time: "7:45 AM", msg: "Travel completed successfully" },
    { date: "2025-11-19", bus: "BUS-7", time: "8:10 AM", msg: "Reached Mysore Palace" },
    { date: "2025-11-18", bus: "BUS-1", time: "7:55 AM", msg: "Boarded at Vijaynagar Bus Stand" },
    { date: "2025-11-17", bus: "BUS-5", time: "8:00 AM", msg: "Journey started" },
    { date: "2025-11-16", bus: "BUS-9", time: "7:40 AM", msg: "Bus delayed by 3 minutes" },
    { date: "2025-11-15", bus: "BUS-2", time: "7:50 AM", msg: "Arrived at destination" },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Travel History</h2>

      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <div className="history-date">{item.date} • {item.time}</div>
            <div className="history-bus">{item.bus}</div>
            <div className="history-msg">“{item.msg}”</div>
          </div>
        ))}
      </div>
    </div>
  );
}
