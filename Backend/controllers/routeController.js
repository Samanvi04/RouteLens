import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  getRouteWithStops
} from "../models/routeModel.js";

export const addRoute = async (req, res) => {
  try {
    const { name, description, created_by } = req.body;
    const id = await createRoute(name, description, created_by);
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
