import React from "react";
import "./Assignments.css";

export default function Assignments() {
  const today = new Date().toISOString().split("T")[0];

  // 🔵 Using same previous data
  const dailySummary = [
    {
      date: today,
      student: "Ananya",
      bus: "BUS-1",
      driver: "Ramesh Kumar",
    },
    {
      date: today,
      student: "Rohit",
      bus: "BUS-3",
      driver: "Mahesh Gowda",
    },
    {
      date: today,
      student: "Meera",
      bus: "BUS-5",
      driver: "Pradeep Kumar",
    },

    // Previous 3 days (same logic)
    {
      date: getPastDate(1),
      student: "Karthik",
      bus: "BUS-2",
      driver: "Suresh Yadav",
    },
    {
      date: getPastDate(2),
      student: "Sneha",
      bus: "BUS-7",
      driver: "Raghavendra",
    },
    {
      date: getPastDate(3),
      student: "Arjun",
      bus: "BUS-9",
      driver: "Naveen R",
    },
  ];

  function getPastDate(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split("T")[0];
  }

  return (
    <div className="admin-page assignments-page">
      <div className="panel">

        <h2>📘 Student & Driver Assignments</h2>
        <p className="muted">Showing 6 records based on recent bus selections.</p>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Bus</th>
                <th>Driver</th>
              </tr>
            </thead>

            <tbody>
              {dailySummary.map((item, i) => (
                <tr key={i}>
                  <td>{item.date}</td>
                  <td>{item.student}</td>
                  <td>{item.bus}</td>
                  <td>{item.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
