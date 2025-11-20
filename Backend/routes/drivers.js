import express from "express";
import {
  addDriver,
  fetchDrivers,
  fetchDriver,
  approveDriver,
  editDriver,
  removeDriver
} from "../controllers/driverController.js";

const router = express.Router();

// POST /drivers/register
router.post("/register", addDriver);

// GET /drivers
router.get("/", fetchDrivers);

// GET /drivers/:id
router.get("/:id", fetchDriver);

// PUT /drivers/:id/verify
router.put("/:id/verify", approveDriver);

// PUT /drivers/:id
router.put("/:id", editDriver);

// DELETE /drivers/:id
router.delete("/:id", removeDriver);

export default router;
