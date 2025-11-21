import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  getRouteWithStops
} from "../models/routeModel.js";
import { bulkAddStops } from "../models/stopModel.js";

export const addRoute = async (req, res) => {
  try {
    // Accept optional `stops` array in the request body. Each stop should be
    // an object: { name?, lat, lng, order? } . If provided, we create the
    // route first and then bulk-add stops linked to that route.
    const { name, description, created_by, stops } = req.body;
    const id = await createRoute(name, description, created_by);

    if (stops && Array.isArray(stops) && stops.length > 0) {
      // Normalize stops: ensure order and numeric lat/lng values
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
};

export const fetchRoutes = async (req, res) => {
  try {
    const data = await getAllRoutes();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchRoute = async (req, res) => {
  try {
    const data = await getRouteById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchRouteDetails = async (req, res) => {
  try {
    const data = await getRouteWithStops(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editRoute = async (req, res) => {
  try {
    const { name, description } = req.body;
    const success = await updateRoute(req.params.id, name, description);
    if (!success) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeRoute = async (req, res) => {
  try {
    const success = await deleteRoute(req.params.id);
    if (!success) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
