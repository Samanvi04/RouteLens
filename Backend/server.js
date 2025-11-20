import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { runMigrations } from "./migrations.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/students.js";
import driverRoutes from "./routes/drivers.js";
import adminRoutes from "./routes/adminRoutes.js";
import busRoutes from "./routes/buses.js";        // You'll create this
import assignmentRoutes from "./routes/assignments.js"; // You'll create this

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- MIDDLEWARE --------------------
app.use(cors({
  origin: "*",            // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// -------------------- RUN MIGRATIONS --------------------
await runMigrations(); // Ensure this runs before routes

// -------------------- ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/assignments", assignmentRoutes);

// -------------------- HEALTH CHECK --------------------
app.get("/", (req, res) => res.send("Server is running"));

// -------------------- START SERVER --------------------
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://${getLocalIP()}:${PORT}`);
});

import os from "os";
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}