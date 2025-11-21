import React from "react";
import "./DriverBuses.css";

export default function DriversBuses() {
  const busData = [
    {
      number: "BUS-1",
      driver: "Ramesh Kumar",
      stops: ["Vijaynagar 1st Stage", "Vijaynagar Bus Stand", "Hinkal", "Metagalli", "KRS Road"],
      destination: "Mysore Palace",
    },
    {
      number: "BUS-2",
      driver: "Suresh Yadav",
      stops: ["Bogadi Circle", "Kamakshi Hospital", "Kuvempunagar", "Jayanagar", "Hardinge Circle"],
      destination: "Mysore Palace",
    },
    {
      number: "BUS-3",
      driver: "Mahesh Gowda",
      stops: ["Hebbal 2nd Stage", "Hebbal Ring Road", "Infosys Road", "Mysore University", "RTO Circle"],
      destination: "Mysore Palace",
    },
    {
      number: "BUS-4",
      driver: "Pradeep Kumar",
      stops: ["Jayalakshmipuram", "CFTRI", "Yadavagiri", "Nazarbad", "LIC Circle"],
      destination: "Mysore Palace",
    },
    {
      number: "BUS-5",
      driver: "Naveen R",
      stops: ["Saraswathipuram", "Kukkrahalli Lake", "Manasagangotri", "DC Office", "KR Circle"],
      destination: "Mysore Palace",
    },
    {
      number: "BUS-6",
      driver: "Raghavendra",
      stops: ["Nanjangud Road", "Vidyaranyapuram", "Ashokpuram", "Town Hall", "Devaraja Market"],
      destination: "Mysore Palace",
    },
    {
      number: "BUS-7",
      driver: "Shankar",
      stops: ["Hootagalli", "Belawadi", "Ring Road Junction", "Hunsur Road", "JLB Road"],
      destination: "Mysore Palace",
    },
    {
      number: "BUS-8",
      driver: "Vijay Kumar",
      stops: ["Srirampura", "Gandinagar", "Bannimantap", "HUDCO Layout", "Mysore Bus Stand"],
      destination: "Mysore Palace",
    },
    {
      number: "BUS-9",
      driver: "Harish",
      stops: ["KR Nagar Road", "Bogadi Extension", "Madhav Nagar", "Hinkal Bridge", "Suburban Bus Stand"],
      destination: "Mysore Palace",
    },
    {
      number: "BUS-10",
      driver: "Lokesh",
      stops: ["Suttur Road", "Varuna", "Alanahalli", "Ring Road East", "Mysore Zoo Road"],
      destination: "Mysore Palace",
    }
  ];

  return (
    <div className="dbus-page">
      <h1 className="dbus-title">Drivers & Buses</h1>

      <div className="dbus-grid">
        {busData.map((bus, index) => (
          <div key={index} className="dbus-card">
            <div className="dbus-header">
              <h3>{bus.number}</h3>
              <span className="driver-tag">{bus.driver}</span>
            </div>

            <p className="dbus-subtitle">Stops:</p>
            <ul className="dbus-stops">
              {bus.stops.map((stop, i) => (
                <li key={i}>• {stop}</li>
              ))}
            </ul>

            <p className="dbus-destination">
              🏁 Final: <strong>{bus.destination}</strong>
            </p>

            <button className="dbus-btn">Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}
