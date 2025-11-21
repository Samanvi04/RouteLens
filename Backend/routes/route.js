import express from "express";
import {
  createRoute,
  getAllRoutes,
  getRouteById,
  getRouteWithStops,
  updateRoute,
  deleteRoute
} from "../models/routeModel.js";

const router = express.Router();

// debug: indicate router file was loaded
console.log("[routes/route] router module loaded");

/* CREATE ROUTE (Admin) */
router.post("/", async (req, res) => {
  const { name, description, created_by } = req.body;

  try {
    const id = await createRoute(name, description, created_by);
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
