import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RouteSection.css";

export default function RouteSection() {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${API}/api/routes`);
      setRoutes(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRoutes(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addRoute = async () => {
    if (!form.name) return alert("Route name required");
    await axios.post(`${API}/api/routes`, form);
    setForm({ name: "", description: "" });
    fetchRoutes();
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
