import express from "express";
import {
  createRoute,
  getAllRoutes,
  getRouteById,
  getRouteWithStops,
  updateRoute,
  deleteRoute
} from "../models/routeModel.js";
import { bulkAddStops } from "../models/stopModel.js";

const router = express.Router();

// debug: indicate router file was loaded
console.log("[routes/route] router module loaded");

/* CREATE ROUTE (Admin) */
router.post("/", async (req, res) => {
  // Accept optional `stops` array in request body. Create route first,
  // then bulk-add stops referencing the new route id.
  const { name, description, created_by, stops } = req.body;

  try {
    console.log('[route] create request received:', { name, description, created_by, stopsLength: Array.isArray(stops) ? stops.length : 0 });
    if (stops && Array.isArray(stops)) console.log('[route] stops sample:', stops.slice(0,5));

    const id = await createRoute(name, description, created_by);

    if (stops && Array.isArray(stops) && stops.length > 0) {
      const normalized = stops.map((s, idx) => ({
        name: s.name || null,
        lat: s.lat === undefined || s.lat === null ? null : parseFloat(s.lat),
        lng: s.lng === undefined || s.lng === null ? null : parseFloat(s.lng),
        order: s.order || idx + 1
      }));

      await bulkAddStops(id, normalized);
    }

    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ALL ROUTES */
router.get("/", async (req, res) => {
  try {
    const routes = await getAllRoutes();
    res.json({ success: true, data: routes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ROUTE WITH STOPS */
router.get("/:id/stops", async (req, res) => {
  try {
    const route = await getRouteWithStops(req.params.id);
    if (!route)
      return res.status(404).json({ success: false, message: "Route not found" });

    res.json({ success: true, data: route });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE ROUTE */
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  try {
    const ok = await updateRoute(req.params.id, name, description);
    if (!ok)
      return res.status(404).json({ message: "Route not found" });

    res.json({ success: true, message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE ROUTE */
router.delete("/:id", async (req, res) => {
  try {
    const ok = await deleteRoute(req.params.id);
    if (!ok)
      return res.status(404).json({ message: "Route not found" });

    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
