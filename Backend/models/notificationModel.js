import { dbQuery } from "../utils/dbQuery.js";

/* -------------------- CREATE NOTIFICATION -------------------- */
// type = 'sms' | 'email' | 'push'
// status = 'pending' | 'sent' | 'failed'
export const createNotification = async (userId, journeyId, type, message) => {
  const sql = `
    INSERT INTO notifications (user_id, journey_id, type, message, status)
    VALUES (?, ?, ?, ?, 'pending')
  `;

  const result = await dbQuery(sql, [userId, journeyId, type, message]);
  return result.insertId;
};

/* -------------------- GET ALL NOTIFICATIONS FOR A USER -------------------- */
export const getNotificationsByUser = async (userId) => {
  return await dbQuery(
    `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );
};

/* -------------------- GET NOTIFICATIONS FOR A JOURNEY -------------------- */
export const getNotificationsByJourney = async (journeyId) => {
  return await dbQuery(
    `SELECT * FROM notifications WHERE journey_id = ? ORDER BY created_at DESC`,
    [journeyId]
  );
};

/* -------------------- MARK NOTIFICATION AS SENT -------------------- */
export const markNotificationSent = async (id) => {
  const sql = `UPDATE notifications SET status = 'sent' WHERE id = ?`;
  const result = await dbQuery(sql, [id]);
  return result.affectedRows > 0;
};

/* -------------------- MARK NOTIFICATION AS FAILED -------------------- */
export const markNotificationFailed = async (id) => {
  const sql = `UPDATE notifications SET status = 'failed' WHERE id = ?`;
  const result = await dbQuery(sql, [id]);
  return result.affectedRows > 0;
};

/* -------------------- GET PENDING NOTIFICATIONS (for cron jobs) -------------------- */
export const getPendingNotifications = async () => {
  return await dbQuery(
    `SELECT * FROM notifications WHERE status = 'pending' ORDER BY created_at ASC`
  );
};

/* -------------------- DELETE NOTIFICATION -------------------- */
export const deleteNotification = async (id) => {
  const sql = `DELETE FROM notifications WHERE id = ?`;
  const result = await dbQuery(sql, [id]);
  return result.affectedRows > 0;
};
