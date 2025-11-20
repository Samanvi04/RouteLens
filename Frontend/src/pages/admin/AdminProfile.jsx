import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminProfile.css";

const API = import.meta.env.VITE_API_BASE_URL;

export default function AdminProfile() {
  const [profile, setProfile] = useState({ name: "", email: "", twilioKey: "", mapsKey: "" });

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/admins/me`);
      setProfile(res.data?.data || res.data || {});
    } catch (err) { console.error(err); }
  };

  const save = async () => {
    try {
      await axios.put(`${API}/admins/me`, profile);
      alert("Saved");
    } catch (err) { console.error(err); alert("Save failed"); }
  };

  return (
    <div className="admin-page profile-page">
      <div className="panel">
        <h2>Admin Profile & Settings 👤</h2>

        <div className="form-col">
          <label>Name</label>
          <input value={profile.name || ""} onChange={e=>setProfile({...profile, name:e.target.value})} />

          <label>Email</label>
          <input value={profile.email || ""} onChange={e=>setProfile({...profile, email:e.target.value})} />

          <label>Twilio API Key</label>
          <input value={profile.twilioKey || ""} onChange={e=>setProfile({...profile, twilioKey:e.target.value})} />

          <label>Maps API Key</label>
          <input value={profile.mapsKey || ""} onChange={e=>setProfile({...profile, mapsKey:e.target.value})} />

          <div style={{height:8}} />
          <button className="btn-primary" onClick={save}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}
