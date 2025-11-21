import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DriversBuses.css";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", license: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/drivers`);
      setDrivers(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Fetch drivers error:", err);
      alert("Unable to load drivers.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!form.name) return alert("Fill name");
    try {
      const res = await axios.post(`${API}/drivers`, form);
      if (res.data?.success) {
        fetchDrivers();
        setForm({ name: "", phone: "", license: "" });
      }
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete driver?")) return;
    try {
      await axios.delete(`${API}/drivers/${id}`);
      fetchDrivers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-page drivers-page">
      <div className="panel">
        <h2>Drivers &amp; Management 👨‍✈️</h2>

        <div className="form-row">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder="License"
            value={form.license}
            onChange={(e) => setForm({ ...form, license: e.target.value })}
          />
          <button className="btn-primary" onClick={handleCreate}>Add Driver</button>
        </div>

        <div className="table">
          {loading ? <div className="muted">Loading...</div> : null}
          <table>
            <thead>
              <tr><th>Name</th><th>Phone</th><th>License</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {drivers.length === 0 && !loading && (
                <tr><td colSpan="4" className="muted">No drivers yet</td></tr>
              )}
              {drivers.map((d) => (
                <tr key={d.id || d._id}>
                  <td>{d.name}</td>
                  <td>{d.phone}</td>
                  <td>{d.license}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => alert("Edit UI placeholder")}>Edit</button>
                    <button className="btn-danger" onClick={() => handleDelete(d.id || d._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
