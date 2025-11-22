import express from "express";
import {
  createStop,
  getStopsByRoute,
  getStopById,
  updateStop,
  deleteStop,
  reorderStops,
  bulkAddStops
} from "../models/stopModel.js";
import { getStopsByBus } from "../models/stopModel.js";

const router = express.Router();

/* ADD STOP */
router.post("/", async (req, res) => {
  const { route_id, name, lat, lng, order } = req.body;
  try {
    const id = await createStop(route_id, name, lat, lng, order);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET STOPS FOR A ROUTE */
router.get("/route/:routeId", async (req, res) => {
  try {
    const stops = await getStopsByRoute(req.params.routeId);
    res.json({ success: true, data: stops });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET STOPS FOR A BUS */
router.get("/bus/:busId", async (req, res) => {
  try {
    const stops = await getStopsByBus(req.params.busId);
    res.json({ success: true, data: stops });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE STOP */
router.put("/:id", async (req, res) => {
  const { name, lat, lng, order } = req.body;
  try {
    const ok = await updateStop(req.params.id, name, lat, lng, order);
    if (!ok) return res.status(404).json({ message: "Stop not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE STOP */
router.delete("/:id", async (req, res) => {
  try {
    const ok = await deleteStop(req.params.id);
    if (!ok) return res.status(404).json({ message: "Stop not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* REORDER STOPS */
router.put("/reorder/:routeId", async (req, res) => {
  try {
    await reorderStops(req.params.routeId, req.body.stops);
    res.json({ success: true, message: "Stops reordered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* BULK ADD STOPS */
router.post("/bulk/:routeId", async (req, res) => {
  try {
    await bulkAddStops(req.params.routeId, req.body.stops);
    res.json({ success: true, message: "Stops added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
