import { getAllBuses, createBus, deleteBus } from "../models/busModel.js";

export const fetchBuses = async (req, res) => {
  try {
    const buses = await getAllBuses();
    res.json({ success: true, buses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const addBus = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Bus name required" });

    const id = await createBus(name);
    res.json({ success: true, busId: id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const removeBus = async (req, res) => {
  try {
    const deleted = await deleteBus(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Bus not found" });
    res.json({ success: true, message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
