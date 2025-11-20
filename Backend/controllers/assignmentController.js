import {
  getAvailableDrivers,
  assignDriverToBus,
  getAllAssignments
} from "../models/assignmentModel.js";

export const fetchAvailableDrivers = async (req, res) => {
  try {
    const drivers = await getAvailableDrivers();
    res.json({ success: true, drivers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const assignDriver = async (req, res) => {
  try {
    const { busId, driverId } = req.body;
    if (!busId || !driverId)
      return res.status(400).json({ success: false, message: "BusId & DriverId required" });

    await assignDriverToBus(busId, driverId);
    res.json({ success: true, message: "Driver assigned to bus" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const fetchAssignments = async (req, res) => {
  try {
    const assignments = await getAllAssignments();
    res.json({ success: true, assignments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
