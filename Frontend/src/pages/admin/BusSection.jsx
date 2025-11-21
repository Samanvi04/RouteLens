import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BusSection.css";

export default function BusSection() {
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [buses, setBuses] = useState([]);
  const [busName, setBusName] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");

  const fetchBuses = async () => {
    try {
      const res = await axios.get(`${API}/api/buses`);
      setBuses(res.data.buses);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchBuses(); }, []);

  const addBus = async () => {
    if (!busName) return alert("Bus name required");
    try {
      await axios.post(`${API}/api/buses/add`, { name: busName, plate: plate || null, capacity: capacity ? Number(capacity) : null });
      setBusName("");
      setPlate("");
      setCapacity("");
      fetchBuses();
    } catch (err) {
      console.error(err);
      alert("Error adding bus");
    }
  };

  const deleteBus = async (id) => {
    if (!window.confirm("Delete this bus?")) return;
    await axios.delete(`${API}/api/buses/${id}`);
    fetchBuses();
  };

  return (
    <div className="section bus-section">
      <h2>Buses</h2>
      <div className="form">
        <input
          placeholder="Bus Name"
          value={busName}
          onChange={(e) => setBusName(e.target.value)}
        />
        <input
          placeholder="Plate (optional)"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />
        <input
          placeholder="Capacity (optional)"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <button onClick={addBus}>Add Bus</button>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {buses.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>
                <button onClick={() => deleteBus(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
