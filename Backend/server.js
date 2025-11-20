// -------------------- IMPORTS --------------------
// (Must always be at the top — FIXED)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { runMigrations } from "./migrations.js";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/students.js";
import driverRoutes from "./routes/drivers.js";
import adminRoutes from "./routes/adminRoutes.js";
import busRoutes from "./routes/buses.js";
import assignmentRoutes from "./routes/assignments.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- MIDDLEWARE --------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// -------------------- RUN MIGRATIONS --------------------
// Wrapped in try/catch so server STILL STARTS on migration failure
try {
  await runMigrations();
  console.log("Migrations completed.");
} catch (err) {
  console.error("Migration error:", err.message);
}

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
// FIXED: Proper template literal for console.log
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// -------------------- UTILITY: LOCAL IP --------------------
import os from "os";
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return "localhost";
}