import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectBus.css";

export default function SelectBus() {
  const navigate = useNavigate();
  const [selectedBus, setSelectedBus] = useState("");

  // In this UI we navigate to the same page after clicking any bus card.
  // We save the selected bus to localStorage so the landing page can read it.

  const buses = [
    {
      number: "BUS-1",
      stops: ["Vijaynagar 1st Stage", "Vijaynagar Bus Stand", "Hinkal", "Metagalli", "KRS Road"],
      destination: "Mysore Palace"
    },
    {
      number: "BUS-2",
      stops: ["Bogadi Circle", "Kamakshi Hospital", "Kuvempunagar", "Jayanagar", "Hardinge Circle"],
      destination: "Mysore Palace"
    },
    {
      number: "BUS-3",
      stops: ["Hebbal 2nd Stage", "Hebbal Ring Road", "Infosys Road", "Mysore University", "RTO Circle"],
      destination: "Mysore Palace"
    },
    {
      number: "BUS-4",
      stops: ["Jayalakshmipuram", "CFTRI", "Yadavagiri", "Nazarbad", "LIC Circle"],
      destination: "Mysore Palace"
    },
    {
      number: "BUS-5",
      stops: ["Saraswathipuram", "Kukkrahalli Lake", "Manasagangotri", "DC Office", "KR Circle"],
      destination: "Mysore Palace"
    },
    {
      number: "BUS-6",
      stops: ["Nanjangud Road", "Vidyaranyapuram", "Ashokpuram", "Town Hall", "Devaraja Market"],
      destination: "Mysore Palace"
    },
    {
      number: "BUS-7",
      stops: ["Hootagalli", "Belawadi", "Ring Road Junction", "Hunsur Road", "JLB Road"],
      destination: "Mysore Palace"
    },
    {
      number: "BUS-8",
      stops: ["Srirampura", "Gandinagar", "Bannimantap", "HUDCO Layout", "Mysore Bus Stand"],
      destination: "Mysore Palace"
    },
    {
      number: "BUS-9",
      stops: ["KR Nagar Road", "Bogadi Extension", "Madhav Nagar", "Hinkal Bridge", "Suburban Bus Stand"],
      destination: "Mysore Palace"
    },
    {
      number: "BUS-10",
      stops: ["Suttur Road", "Varuna", "Alanahalli", "Ring Road East", "Mysore Zoo Road"],
      destination: "Mysore Palace"
    }
  ];

  return (
    <div className="db-page">
      <h1 className="db-title">🚌 Select Your Bus</h1>
      <p className="db-sub">Choose the bus assigned to your route</p>

      <div className="db-bus-list">
        {buses.map((bus) => (
          <div
            key={bus.number}
            className={`db-bus-item ${selectedBus === bus.number ? "active" : ""}`}
            onClick={() => {
              // store selection and navigate to the shared route
              setSelectedBus(bus.number);
              try { localStorage.setItem('selectedBus', bus.number); } catch (e) { /* ignore */ }
              navigate('/driver/start-journey');
            }}
          >
            <div className="bus-header">
              <h3>{bus.number}</h3>
              <span className="route-badge">Route • 5 Stops</span>
            </div>

            <ul className="db-stop-list">
              {bus.stops.map((stop, i) => (
                <li key={i}>• {stop}</li>
              ))}
            </ul>

            <div className="db-final">
              🏁 <strong>{bus.destination}</strong>
            </div>
          </div>
        ))}
      </div>

      <button
        className="db-btn-primary"
        disabled={!selectedBus}
        onClick={() => {
          try { localStorage.setItem('selectedBus', selectedBus); } catch (e) {}
          navigate('/driver/start-journey');
        }}
      >
        Confirm Bus ✔
      </button>
    </div>
  );
}
