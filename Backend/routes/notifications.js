import express from "express";
import {
  createNotification,
  getNotificationsByUser,
  getNotificationsByJourney,
  markNotificationSent,
  markNotificationFailed
} from "../models/notificationModel.js";

const router = express.Router();

/* CREATE NOTIFICATION */
router.post("/", async (req, res) => {
  const { user_id, journey_id, type, message } = req.body;
  try {
    const id = await createNotification(user_id, journey_id, type, message);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* USER NOTIFICATIONS */
router.get("/user/:id", async (req, res) => {
  try {
    const rows = await getNotificationsByUser(req.params.id);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* JOURNEY NOTIFICATIONS */
router.get("/journey/:id", async (req, res) => {
  try {
    const rows = await getNotificationsByJourney(req.params.id);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* MARK SENT */
router.put("/:id/sent", async (req, res) => {
  try {
    await markNotificationSent(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* MARK FAILED */
router.put("/:id/failed", async (req, res) => {
  try {
    await markNotificationFailed(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
