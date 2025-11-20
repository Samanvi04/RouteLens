import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LiveMap.css";

const API = import.meta.env.VITE_API_BASE_URL;

export default function LiveMap() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
    // optional: setInterval to poll positions
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await axios.get(`${API}/live/buses`);
      setBuses(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page livemap-page">
      <div className="panel">
        <h2>Live Map & Tracking 🗺️</h2>

        <div className="map-area">
          {/* Placeholder area — replace with real map */}
          <div className="map-placeholder">Map Canvas Placeholder</div>

          <div className="mini-stats">
            <h3>Active Buses</h3>
            <ul>
              {buses.length===0 && <li className="muted">No active buses (sample)</li>}
              {buses.map(b => <li key={b.id || b._id}>{b.plate} — {b.routeName || "Route"} — ETA {b.eta || "-"}</li>)}
            </ul>
            <button className="btn-secondary" onClick={fetchBuses}>Refresh</button>
          </div>
        </div>

      </div>
    </div>
  );
}
