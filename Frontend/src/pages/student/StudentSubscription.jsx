import React, { useState } from "react";
import "./StudentPages.css";

export default function StudentSubscriptions() {
  const [selectedBus, setSelectedBus] = useState("");

  // 🔵 SAME BUS DATA YOU USED BEFORE — NO CHANGES
  const buses = [
    { number: "BUS-1", stops: ["Vijaynagar 1st Stage", "Vijaynagar Bus Stand", "Hinkal", "Metagalli", "KRS Road"], destination: "Mysore Palace" },
    { number: "BUS-2", stops: ["Bogadi Circle", "Kamakshi Hospital", "Kuvempunagar", "Jayanagar", "Hardinge Circle"], destination: "Mysore Palace" },
    { number: "BUS-3", stops: ["Hebbal 2nd Stage", "Hebbal Ring Road", "Infosys Road", "Mysore University", "RTO Circle"], destination: "Mysore Palace" },
    { number: "BUS-4", stops: ["Jayalakshmipuram", "CFTRI", "Yadavagiri", "Nazarbad", "LIC Circle"], destination: "Mysore Palace" },
    { number: "BUS-5", stops: ["Saraswathipuram", "Kukkrahalli Lake", "Manasagangotri", "DC Office", "KR Circle"], destination: "Mysore Palace" },
    { number: "BUS-6", stops: ["Nanjangud Road", "Vidyaranyapuram", "Ashokpuram", "Town Hall", "Devaraja Market"], destination: "Mysore Palace" },
    { number: "BUS-7", stops: ["Hootagalli", "Belawadi", "Ring Road Junction", "Hunsur Road", "JLB Road"], destination: "Mysore Palace" },
    { number: "BUS-8", stops: ["Srirampura", "Gandinagar", "Bannimantap", "HUDCO Layout", "Mysore Bus Stand"], destination: "Mysore Palace" },
    { number: "BUS-9", stops: ["KR Nagar Road", "Bogadi Extension", "Madhav Nagar", "Hinkal Bridge", "Suburban Bus Stand"], destination: "Mysore Palace" },
    { number: "BUS-10", stops: ["Suttur Road", "Varuna", "Alanahalli", "Ring Road East", "Mysore Zoo Road"], destination: "Mysore Palace" }
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Manage Subscriptions</h2>

      {/* Phone */}
      <div className="form-group">
        <label>Phone Number for SMS Alerts</label>
        <input type="text" placeholder="Enter phone number" />
      </div>

      

      {/* 🔵 Select Bus (NEW UI) */}
      <h3 className="bus-select-title">Select Bus</h3>

      <div className="student-bus-list">
        {buses.map((bus) => (
          <div
            key={bus.number}
            className={`student-bus-item ${selectedBus === bus.number ? "active" : ""}`}
            onClick={() => setSelectedBus(bus.number)}
          >
            <div className="student-bus-header">
              <h4>{bus.number}</h4>
              <span className="student-badge">5 Stops</span>
            </div>

            <ul className="student-stop-list">
              {bus.stops.map((stop, i) => (
                <li key={i}>• {stop}</li>
              ))}
            </ul>

            <p className="student-destination">
              🏁 Destination: <strong>{bus.destination}</strong>
            </p>
          </div>
        ))}
      </div>

      <button className="btn-primary" disabled={!selectedBus}>
        Select
      </button>
    </div>
  );
}
