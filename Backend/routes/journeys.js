import express from "express";
import {
  startJourney,
  endJourney,
  getJourneyById,
  getActiveJourneyByDriver
} from "../models/journeyModel.js";

const router = express.Router();

/* START JOURNEY */
router.post("/start", async (req, res) => {
  const { driver_id, bus_id, route_id } = req.body;

  try {
    const id = await startJourney(driver_id, bus_id, route_id);
    res.json({ success: true, journey_id: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* END JOURNEY */
router.post("/end/:id", async (req, res) => {
  try {
    await endJourney(req.params.id);
    res.json({ success: true, message: "Journey ended" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ACTIVE JOURNEY */
router.get("/active/:driverId", async (req, res) => {
  try {
    const journey = await getActiveJourneyByDriver(req.params.driverId);
    res.json({ success: true, data: journey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
