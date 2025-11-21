// -------------------- IMPORTS --------------------
// (Must always be at the top — FIXED)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { runMigrations } from "./migrations.js";
import morgan from 'morgan';


import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentsRoutes.js";
import driverRoutes from "./routes/driversRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import busRoutes from "./routes/buses.js";
import routeRoutes from "./routes/route.js";
import assignmentRoutes from "./routes/assignments.js";
import { getAllRoutes as modelGetAllRoutes } from "./models/routeModel.js";

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
app.use(morgan('combined'));

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
app.use("/api/routes", routeRoutes);
console.log("[server] mounted /api/routes");
// Safety: ensure GET /api/routes is available even if router mounting has issues
app.get("/api/routes", async (req, res) => {
  try {
    const routes = await modelGetAllRoutes();
    res.json({ success: true, data: routes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.use("/api/assignments", assignmentRoutes);

// Debug: list mounted routes for quick inspection
const listRoutes = () => {
  try {
    console.log('[server] app._router.stack length =', app._router && app._router.stack ? app._router.stack.length : 'no-router');
    if (app._router && Array.isArray(app._router.stack)) {
      app._router.stack.forEach((layer, idx) => {
        try {
          const info = { idx };
          info.name = layer.name || (layer.handle && layer.handle.name) || '<anonymous>';
          if (layer.route) {
            info.type = 'route';
            info.path = layer.route.path;
            info.methods = Object.keys(layer.route.methods).join(',');
          } else if (layer.handle && Array.isArray(layer.handle.stack)) {
            info.type = 'router';
            info.substack = layer.handle.stack.length;
          } else {
            info.type = 'other';
          }
          console.log('[server] stack item', JSON.stringify(info));
        } catch (e) {
          console.error('[server] stack inspect error at idx', idx, e.message);
        }
      });
    } else {
      console.log('[server] no app._router.stack to enumerate');
    }
  } catch (err) {
    console.error('[server] error listing routes:', err.message);
  }
};
listRoutes();

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