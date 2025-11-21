import React, { useState } from "react";
import "./LiveMap.css";

export default function LiveMap() {

  // 🔷 STATIC 10 BUSES (same drivers, routes & numbering used earlier)
  const busesList = [
    { id: "1", plate: "BUS-1", driverName: "Ramesh Kumar", routeName: "Vijaynagar → Mysore Palace", lastUpdate: "Just now", eta: "12 mins" },
    { id: "2", plate: "BUS-2", driverName: "Suresh Yadav", routeName: "Bogadi → Mysore Palace", lastUpdate: "1 min ago", eta: "8 mins" },
    { id: "3", plate: "BUS-3", driverName: "Mahesh Gowda", routeName: "Hebbal → Mysore Palace", lastUpdate: "3 mins ago", eta: "15 mins" },
    { id: "4", plate: "BUS-4", driverName: "Vijay Kumar", routeName: "Jayalakshmipuram → Mysore Palace", lastUpdate: "5 mins ago", eta: "10 mins" },
    { id: "5", plate: "BUS-5", driverName: "Lokesh", routeName: "Saraswathipuram → Mysore Palace", lastUpdate: "Just now", eta: "7 mins" },
    { id: "6", plate: "BUS-6", driverName: "Pradeep", routeName: "Nanjangud Road → Mysore Palace", lastUpdate: "2 mins ago", eta: "11 mins" },
    { id: "7", plate: "BUS-7", driverName: "Shankar", routeName: "Hootagalli → Mysore Palace", lastUpdate: "4 mins ago", eta: "9 mins" },
    { id: "8", plate: "BUS-8", driverName: "Harish", routeName: "Srirampura → Mysore Palace", lastUpdate: "6 mins ago", eta: "16 mins" },
    { id: "9", plate: "BUS-9", driverName: "Vishal", routeName: "KR Nagar Road → Mysore Palace", lastUpdate: "7 mins ago", eta: "13 mins" },
    { id: "10", plate: "BUS-10", driverName: "Lokesh", routeName: "Suttur Road → Mysore Palace", lastUpdate: "5 mins ago", eta: "10 mins" }
  ];

  const [buses] = useState(busesList);
  const [selectedBus, setSelectedBus] = useState(null);

  return (
    <div className="livemap-container">

      {/* HEADER */}
      <div className="lm-header">
        <h2>🗺️ Live Map & Tracking</h2>

        <div className="selector-row">
          <label>Select Bus</label>
          <select
            className="bus-select"
            onChange={(e) => {
              const chosen = buses.find((b) => b.id === e.target.value);
              setSelectedBus(chosen || null);
            }}
          >
            <option value="">Choose a bus</option>
            {buses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.plate} — {b.routeName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FULL MAP AREA */}
      <div className="full-map-area">

        {selectedBus ? (
          <div className="selected-map-box">
            <h3>Live Tracking — {selectedBus.plate}</h3>

            <div className="map-placeholder">
              {/* Replace with Google Maps later */}
              Showing live map for <strong>{selectedBus.plate}</strong>
            </div>

            <div className="bus-details">
              <p><strong>Driver:</strong> {selectedBus.driverName}</p>
              <p><strong>Route:</strong> {selectedBus.routeName}</p>
              <p><strong>Last Updated:</strong> {selectedBus.lastUpdate}</p>
              <p><strong>ETA:</strong> {selectedBus.eta}</p>
            </div>

          </div>
        ) : (
          <div className="map-placeholder empty">
            Select a bus to view the live map
          </div>
        )}

      </div>
    </div>
  );
}
