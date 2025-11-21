import React, { useState } from "react";
import "./AdminCrowd.css";

export default function AdminCrowd() {
  // Static bus list (BUS-1 .. BUS-10) with sample crowd % (0-100)
  const buses = [
    { id: "1", plate: "BUS-1", route: "Vijaynagar → Mysore Palace", crowdPercent: 22 },
    { id: "2", plate: "BUS-2", route: "Bogadi → Mysore Palace", crowdPercent: 48 },
    { id: "3", plate: "BUS-3", route: "Hebbal → Mysore Palace", crowdPercent: 79 },
    { id: "4", plate: "BUS-4", route: "Jayalakshmipuram → Mysore Palace", crowdPercent: 35 },
    { id: "5", plate: "BUS-5", route: "Saraswathipuram → Mysore Palace", crowdPercent: 60 },
    { id: "6", plate: "BUS-6", route: "Nanjangud Road → Mysore Palace", crowdPercent: 12 },
    { id: "7", plate: "BUS-7", route: "Hootagalli → Mysore Palace", crowdPercent: 88 },
    { id: "8", plate: "BUS-8", route: "Srirampura → Mysore Palace", crowdPercent: 53 },
    { id: "9", plate: "BUS-9", route: "KR Nagar Road → Mysore Palace", crowdPercent: 70 },
    { id: "10", plate: "BUS-10", route: "Suttur Road → Mysore Palace", crowdPercent: 41 }
  ];

  const [selectedBusId, setSelectedBusId] = useState(null);

  const selected = buses.find((b) => b.id === selectedBusId) || null;

  const getStatus = (pct) => {
    if (pct < 40) return { label: "Less Crowded", color: "green" };
    if (pct <= 75) return { label: "Medium Crowded", color: "amber" };
    return { label: "Overcrowded", color: "red" };
  };

  const status = selected ? getStatus(selected.crowdPercent) : null;

  // For radial gauge (circle math)
  const R = 60; // radius
  const C = 2 * Math.PI * R; // circumference

  const percentToStroke = (p) => {
    const v = Math.max(0, Math.min(100, p));
    return (C * v) / 100;
  };

  return (
    <div className="crowd-page">
      <div className="crowd-panel">
        <h2 className="crowd-title">Crowd Monitoring — Buses</h2>
        <p className="crowd-sub">Select a bus to view current crowd level</p>

        <div className="crowd-layout">
          {/* LEFT: Bus list */}
          <div className="bus-list">
            {buses.map((b) => (
              <div
                key={b.id}
                className={`bus-item ${selectedBusId === b.id ? "active" : ""}`}
                onClick={() => setSelectedBusId(b.id)}
              >
                <div className="bus-left">
                  <div className="bus-plate">{b.plate}</div>
                  <div className="bus-route">{b.route}</div>
                </div>

                <div className="bus-right">
                  <div className="small-pill">{b.crowdPercent}%</div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Visualization */}
          <div className="viz-area">
            {!selected ? (
              <div className="viz-empty">Choose a bus from the left to view crowd stats</div>
            ) : (
              <div className="viz-card">
                <div className="viz-header">
                  <div>
                    <h3>{selected.plate}</h3>
                    <p className="route-small">{selected.route}</p>
                  </div>

                  <div className={`status-chip ${status.color}`}>
                    {status.label}
                  </div>
                </div>

                <div className="gauge-row">
                  <svg className="gauge" width="150" height="150" viewBox="0 0 150 150">
                    <defs>
                      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3ea6ff" />
                        <stop offset="100%" stopColor="#66c0ff" />
                      </linearGradient>
                    </defs>

                    <g transform="translate(75,75)">
                      <circle cx="0" cy="0" r={R} className="g-bg" />
                      <circle
                        cx="0"
                        cy="0"
                        r={R}
                        className="g-fg"
                        strokeDasharray={`${percentToStroke(selected.crowdPercent)} ${C}`}
                        transform="rotate(-90)"
                      />
                      <text x="0" y="8" textAnchor="middle" className="g-text">
                        {selected.crowdPercent}%
                      </text>
                    </g>
                  </svg>

                  <div className="bars">
                    <div className="bar-row">
                      <div className="bar-label">Less</div>
                      <div className="bar-track">
                        <div
                          className="bar-fill green"
                          style={{ width: `${Math.min(selected.crowdPercent, 100)}%`, opacity: selected.crowdPercent < 40 ? 1 : 0.25 }}
                        />
                      </div>
                    </div>

                    <div className="bar-row">
                      <div className="bar-label">Medium</div>
                      <div className="bar-track">
                        <div
                          className="bar-fill amber"
                          style={{ width: `${Math.min(Math.max(selected.crowdPercent - 40, 0), 35)}%` , opacity: selected.crowdPercent >= 40 && selected.crowdPercent <=75 ? 1 : 0.25}}
                        />
                      </div>
                    </div>

                    <div className="bar-row">
                      <div className="bar-label">Overcrowded</div>
                      <div className="bar-track">
                        <div
                          className="bar-fill red"
                          style={{ width: `${Math.min(Math.max(selected.crowdPercent - 75, 0), 25)}%`, opacity: selected.crowdPercent > 75 ? 1 : 0.15 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="viz-footer">
                  <p className="muted">Snapshot timestamp: {new Date().toLocaleString()}</p>
                  <button
                    className="btn-alert"
                    onClick={() => alert(`Alert sent to admin: ${selected.plate} is ${status.label}`)}
                  >
                    Alert Student
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
