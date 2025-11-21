import React from "react";
import "./Maintenance.css";

export default function Maintenance() {

  // 🔵 ALL STUDENTS USED PREVIOUSLY
  const students = [
    "Ananya",
    "Rohit",
    "Meera",
    "Karthik",
    "Sneha",
    "Arjun"
  ];

  // 🔵 ALL DRIVERS USED PREVIOUSLY
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

  // 🔵 ALL BUSES (1–10 FROM PREVIOUS SELECTBUS PAGE)
  const buses = [
    {
      number: "BUS-1",
      route: "Vijaynagar 1st Stage → Mysore Palace",
      stops: ["Vijaynagar 1st Stage", "Vijaynagar Bus Stand", "Hinkal", "Metagalli", "KRS Road"]
    },
    {
      number: "BUS-2",
      route: "Bogadi → Mysore Palace",
      stops: ["Bogadi Circle", "Kamakshi Hospital", "Kuvempunagar", "Jayanagar", "Hardinge Circle"]
    },
    {
      number: "BUS-3",
      route: "Hebbal → Mysore Palace",
      stops: ["Hebbal 2nd Stage", "Hebbal Ring Road", "Infosys Road", "Mysore University", "RTO Circle"]
    },
    {
      number: "BUS-4",
      route: "Jayalakshmipuram → Mysore Palace",
      stops: ["Jayalakshmipuram", "CFTRI", "Yadavagiri", "Nazarbad", "LIC Circle"]
    },
    {
      number: "BUS-5",
      route: "Saraswathipuram → Mysore Palace",
      stops: ["Saraswathipuram", "Kukkrahalli Lake", "Manasagangotri", "DC Office", "KR Circle"]
    },
    {
      number: "BUS-6",
      route: "Nanjangud Road → Mysore Palace",
      stops: ["Nanjangud Road", "Vidyaranyapuram", "Ashokpuram", "Town Hall", "Devaraja Market"]
    },
    {
      number: "BUS-7",
      route: "Hootagalli → Mysore Palace",
      stops: ["Hootagalli", "Belawadi", "Ring Road Junction", "Hunsur Road", "JLB Road"]
    },
    {
      number: "BUS-8",
      route: "Srirampura → Mysore Palace",
      stops: ["Srirampura", "Gandinagar", "Bannimantap", "HUDCO Layout", "Mysore Bus Stand"]
    },
    {
      number: "BUS-9",
      route: "KR Nagar → Mysore Palace",
      stops: ["KR Nagar Road", "Bogadi Extension", "Madhav Nagar", "Hinkal Bridge", "Suburban Bus Stand"]
    },
    {
      number: "BUS-10",
      route: "Suttur Road → Mysore Palace",
      stops: ["Suttur Road", "Varuna", "Alanahalli", "Ring Road East", "Mysore Zoo Road"]
    }
  ];

  return (
    <div className="maintenance-page">

      <div className="panel">
        <h1>🛠 Maintenance Overview</h1>
        <p className="sub">Complete list of all Students, Drivers, and Buses</p>

        {/* STUDENTS */}
        <section>
          <h2>🎓 Students</h2>
          <ul className="list">
            {students.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </section>

        {/* DRIVERS */}
        <section>
          <h2>👨‍✈️ Drivers</h2>
          <ul className="list">
            {drivers.map((d, idx) => (
              <li key={idx}>{d}</li>
            ))}
          </ul>
        </section>

        {/* BUSES */}
        <section>
          <h2>🚌 Buses & Routes</h2>

          <div className="bus-grid">
            {buses.map((bus, idx) => (
              <div key={idx} className="bus-card">
                <h3>{bus.number}</h3>
                <p className="route">{bus.route}</p>

                <ul className="stop-list">
                  {bus.stops.map((stop, sidx) => (
                    <li key={sidx}>• {stop}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
