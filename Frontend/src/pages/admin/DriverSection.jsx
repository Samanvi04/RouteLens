import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DriverSection.css";

export default function DriverSection() {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", license_no: "", vehicle_pref: "" });

  const fetchDrivers = async () => {
    try {
      const res = await axios.get(`${API}/api/drivers`);
      setDrivers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addDriver = async () => {
    try {
      const res = await axios.post(`${API}/api/drivers/register`, form);
      if (res.data.success) {
        alert("Driver added!");
        setForm({ name: "", email: "", password: "", license_no: "", vehicle_pref: "" });
        fetchDrivers();
      }
    } catch (err) { console.error(err); }
  };

  const deleteDriver = async (id) => {
    if (!window.confirm("Delete this driver?")) return;
    await axios.delete(`${API}/api/drivers/${id}`);
    fetchDrivers();
  };

  const verifyDriver = async (id) => {
    await axios.put(`${API}/api/drivers/${id}/verify`);
    fetchDrivers();
  };

  return (
    <div className="section driver-section">
      <h2>Drivers</h2>
      <div className="form">
        {["name","email","password","license_no","vehicle_pref"].map((f) => (
          <input
            key={f}
            name={f}
            placeholder={f.replace("_"," ").toUpperCase()}
            value={form[f]}
            onChange={handleChange}
          />
        ))}
        <button onClick={addDriver}>Add Driver</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>License</th><th>Vehicle</th><th>Verified</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.license_no}</td>
              <td>{d.vehicle_pref || "-"}</td>
              <td>{d.is_verified ? "✔" : "❌"}</td>
              <td>
                {!d.is_verified && <button onClick={() => verifyDriver(d.id)}>Verify</button>}
                <button onClick={() => deleteDriver(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
