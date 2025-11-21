import React, { useState } from "react";
import "./RatingPage.css";

export default function RatingPage() {
  const [rating, setRating] = useState(0);
  const [bus, setBus] = useState("");
  const [driver, setDriver] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Previous bus + driver data
  const buses = [
    "BUS-1", "BUS-2", "BUS-3", "BUS-4", "BUS-5",
    "BUS-6", "BUS-7", "BUS-8", "BUS-9", "BUS-10"
  ];

  const drivers = [
    "Ramesh Kumar",
    "Suresh Yadav",
    "Mahesh Gowda",
    "Pradeep Kumar",
    "Raghavendra",
    "Naveen R",
    "Vijay Kumar",
    "Lokesh",
    "Shankar",
    "Harish"
  ];

  const submitRating = () => {
    if (!bus || !driver || rating === 0) {
      alert("Please select bus, driver and rating.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="rating-page">

      <h2 className="rating-title">⭐ Rate Your Driver</h2>

      <div className="rating-card">

        {/* Bus Selection */}
        <label>Select Bus</label>
        <select value={bus} onChange={(e) => setBus(e.target.value)}>
          <option value="">Choose your bus</option>
          {buses.map((b, i) => (
            <option key={i} value={b}>{b}</option>
          ))}
        </select>

        {/* Driver Selection */}
        <label>Select Driver</label>
        <select value={driver} onChange={(e) => setDriver(e.target.value)}>
          <option value="">Choose driver</option>
          {drivers.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>

        {/* Rating Stars */}
        <label>Give Rating</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={rating >= num ? "star active" : "star"}
              onClick={() => setRating(num)}
            >
              ★
            </span>
          ))}
        </div>

        <button className="submit-btn" onClick={submitRating}>
          Submit Rating
        </button>

        {submitted && <p className="success-msg">✅ Rating submitted successfully!</p>}
      </div>
    </div>
  );
}
