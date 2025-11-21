import {
  createStop,
  getStopsByRoute,
  getStopById,
  updateStop,
  deleteStop
} from "../models/stopModel.js";

export const addStop = async (req, res) => {
  try {
    // Expect body: { route_id?, bus_id?, name, lat, lng, order }
    const { route_id, bus_id, name, lat, lng, order } = req.body;
    const id = await createStop(route_id || null, name, lat || null, lng || null, order || 0, bus_id || null);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchStops = async (req, res) => {
  try {
    const data = await getStopsByRoute(req.params.route_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchStop = async (req, res) => {
  try {
    const data = await getStopById(req.params.id);
    if (!data) return res.status(404).json({ message: "Stop not found" });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editStop = async (req, res) => {
  try {
    // Expect body: { name, lat, lng, order }
    const { name, lat, lng, order } = req.body;
    const success = await updateStop(req.params.id, name, lat, lng, order);
    if (!success) return res.status(404).json({ message: "Stop not found" });
    res.json({ success: true, message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeStop = async (req, res) => {
  try {
    const success = await deleteStop(req.params.id);
    if (!success) return res.status(404).json({ message: "Stop not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
