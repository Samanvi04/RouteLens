import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DriverProfile.css";

export default function DriverProfile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Ravi Kumar",
    driverId: "DRV-102",
    license: "DL-2394019",
    phone: "+91 98765 43210",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  const logout = () => {
    navigate("/driver/login"); // Redirect to login page
  };

  return (
    <div className="dp-container">

      <h1 className="dp-title">Driver Profile</h1>

      <div className="dp-card">

        {/* Profile Image */}
        <div className="dp-photo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
            alt="Driver"
          />
        </div>

        {/* Profile Fields */}
        <div className="dp-info">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label>Driver ID</label>
          <input type="text" value={profile.driverId} disabled />

          <label>License Number</label>
          <input
            type="text"
            name="license"
            value={profile.license}
            disabled={!isEditing}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="dp-buttons">
          {!isEditing ? (
            <button className="dp-edit" onClick={() => setIsEditing(true)}>
              Edit Profile ✏️
            </button>
          ) : (
            <button className="dp-save" onClick={saveProfile}>
              Save Changes ✔️
            </button>
          )}

          <button className="dp-logout" onClick={logout}>
            Logout 🚪
          </button>
        </div>
      </div>
    </div>
  );
}
