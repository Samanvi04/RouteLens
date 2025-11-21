import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RouteSection.css";

export default function RouteSection() {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  // Number of places (pairs of lat/lng) and the stops data
  const [numPlaces, setNumPlaces] = useState(1);
  const [stops, setStops] = useState([{ name: "", lat: "", lng: "" }]);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${API}/api/routes`);
      setRoutes(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRoutes(); }, []);

  // Keep stops array length in sync with numPlaces
  useEffect(() => {
    setStops(prev => {
      const copy = [...prev];
      if (numPlaces > copy.length) {
        for (let i = copy.length; i < numPlaces; i++) copy.push({ name: "", lat: "", lng: "" });
      } else if (numPlaces < copy.length) {
        copy.splice(numPlaces);
      }
      return copy;
    });
  }, [numPlaces]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleStopChange = (index, field, value) => {
    setStops(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addRoute = async () => {
    if (!form.name) return alert("Route name required");

    // Prepare stops payload: include only those with at least lat & lng
    const stopsPayload = stops
      .map((s, idx) => ({ name: s.name || null, lat: s.lat, lng: s.lng, order: idx + 1 }))
      .filter(s => s.lat !== "" && s.lng !== "" && s.lat !== null && s.lng !== null);

    try {
      // Send stops together with route creation. Backend will create route
      // and bulk-add stops if provided.
      await axios.post(`${API}/api/routes`, { ...form, created_by: null, stops: stopsPayload });

      setForm({ name: "", description: "" });
      setNumPlaces(1);
      setStops([{ name: "", lat: "", lng: "" }]);
      fetchRoutes();
    } catch (err) {
      console.error(err);
      alert("Error creating route");
    }
  };

  const deleteRoute = async (id) => {
    if (!window.confirm("Delete this route?")) return;
    await axios.delete(`${API}/api/routes/${id}`);
    fetchRoutes();
  };

  return (
    <div className="section route-section">
      <h2>Routes</h2>
      <div className="form">
        <input placeholder="Route Name" name="name" value={form.name} onChange={handleChange} />
        <input placeholder="Description" name="description" value={form.description} onChange={handleChange} />

        <div className="places-controls">
          <label>Number of places:</label>
          <input
            type="number"
            min={1}
            value={numPlaces}
            onChange={(e) => setNumPlaces(Math.max(1, parseInt(e.target.value || 1)))}
          />
        </div>

        <div className="places-list">
          {stops.map((s, idx) => (
            <div className="place-row" key={idx}>
              <input placeholder={`Place ${idx + 1} name (optional)`} value={s.name} onChange={(e) => handleStopChange(idx, 'name', e.target.value)} />
              <input placeholder={`Latitude`} value={s.lat} onChange={(e) => handleStopChange(idx, 'lat', e.target.value)} />
              <input placeholder={`Longitude`} value={s.lng} onChange={(e) => handleStopChange(idx, 'lng', e.target.value)} />
            </div>
          ))}
        </div>

        <button onClick={addRoute}>Add Route</button>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Description</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {routes.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.description || "-"}</td>
              <td><button onClick={() => deleteRoute(r.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
