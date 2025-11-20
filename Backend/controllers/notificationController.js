import {
  createNotification,
  getNotificationsByUser,
  getNotificationsByJourney,
  markNotificationSent,
  markNotificationFailed
} from "../models/notificationModel.js";

export const sendNotification = async (req, res) => {
  try {
    const { user_id, journey_id, type, message } = req.body;
    const id = await createNotification(user_id, journey_id, type, message);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchUserNotifications = async (req, res) => {
  try {
    const data = await getNotificationsByUser(req.params.user_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchJourneyNotifications = async (req, res) => {
  try {
    const data = await getNotificationsByJourney(req.params.journey_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
