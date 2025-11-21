import {
  createDriver,
  getAllDrivers,
  getDriverById,
  verifyDriver,
  updateDriver,
  deleteDriver
} from "../models/driverModel.js";
import { hashPassword } from "../utils/auth.js";

export const addDriver = async (req, res) => {
  try {
    const { name, email, password, license_no, vehicle_pref } = req.body;
    const hashed = await hashPassword(password);
    const id = await createDriver(name, email, hashed, license_no, vehicle_pref);
    res.json({ success: true, driverId: id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const fetchDrivers = async (req, res) => {
  try {
    const drivers = await getAllDrivers();
    res.json({ success: true, data: drivers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const fetchDriver = async (req, res) => {
  try {
    const driver = await getDriverById(req.params.id);
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.json({ success: true, driver });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const approveDriver = async (req, res) => {
  try {
    const updated = await verifyDriver(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: "Driver not found" });
    res.json({ success: true, message: "Driver verified" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const editDriver = async (req, res) => {
  try {
    const updated = await updateDriver(req.params.id, req.body.license_no, req.body.vehicle_pref);
    if (!updated) return res.status(404).json({ success: false, message: "Driver not found" });
    res.json({ success: true, message: "Updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const removeDriver = async (req, res) => {
  try {
    const deleted = await deleteDriver(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Driver not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
