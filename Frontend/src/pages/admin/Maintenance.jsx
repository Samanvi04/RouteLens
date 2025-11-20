import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Maintenance.css";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Maintenance() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ busId: "", serviceDate: "", notes: "" });

  useEffect(() => { fetchRecords(); }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${API}/maintenance`);
      setRecords(res.data?.data || res.data || []);
    } catch (err) { console.error(err); }
  };

  const add = async () => {
    if (!form.busId) return alert("Select bus");
    try {
      await axios.post(`${API}/maintenance`, form);
      setForm({ busId: "", serviceDate: "", notes: "" });
      fetchRecords();
    } catch (err) { console.error(err); alert("Save failed"); }
  };

  return (
    <div className="admin-page maintenance-page">
      <div className="panel">
        <h2>Maintenance & Service 🛠️</h2>

        <div className="form-row">
          <input placeholder="Bus ID" value={form.busId} onChange={e=>setForm({...form, busId:e.target.value})}/>
          <input type="date" value={form.serviceDate} onChange={e=>setForm({...form, serviceDate:e.target.value})}/>
          <input placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}/>
          <button className="btn-primary" onClick={add}>Schedule</button>
        </div>

        <div className="table">
          <table>
            <thead><tr><th>Bus</th><th>Date</th><th>Notes</th></tr></thead>
            <tbody>
              {records.length===0 && <tr><td colSpan="3" className="muted">No records</td></tr>}
              {records.map(r => (
                <tr key={r.id || r._id}>
                  <td>{r.busPlate || r.busId}</td>
                  <td>{r.serviceDate}</td>
                  <td>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
