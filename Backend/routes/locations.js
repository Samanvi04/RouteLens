import express from "express";
import {
  saveLocation,
  getJourneyLocations
} from "../models/locationModel.js";

const router = express.Router();

/* DRIVER SENDS LIVE LOCATION */
router.post("/", async (req, res) => {
  const { journey_id, lat, lng } = req.body;
  try {
    await saveLocation(journey_id, lat, lng);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET LOCATION HISTORY FOR A JOURNEY */
router.get("/:journeyId", async (req, res) => {
  try {
    const rows = await getJourneyLocations(req.params.journeyId);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
