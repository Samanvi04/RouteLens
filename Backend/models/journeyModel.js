import { dbQuery } from "../utils/dbQuery.js";

/* START JOURNEY */
export const startJourney = async (driver_id, bus_id, route_id) => {
  const sql = `
    INSERT INTO journeys (driver_id, bus_id, route_id, started_at, status)
    VALUES (?, ?, ?, NOW(), 'ongoing')
  `;
  const result = await dbQuery(sql, [driver_id, bus_id, route_id]);
  return result.insertId;
};

/* END JOURNEY */
export const endJourney = async (journeyId) => {
  const sql = `
    UPDATE journeys
    SET status = 'completed', ended_at = NOW()
    WHERE id = ?
  `;
  const result = await dbQuery(sql, [journeyId]);
  return result.affectedRows > 0;
};

/* GET JOURNEY BY ID */
export const getJourneyById = async (id) => {
  const rows = await dbQuery("SELECT * FROM journeys WHERE id = ?", [id]);
  return rows[0] || null;
};

/* GET ACTIVE JOURNEY OF A DRIVER */
export const getActiveJourneyByDriver = async (driverId) => {
  const rows = await dbQuery(
    "SELECT * FROM journeys WHERE driver_id = ? AND status = 'ongoing'",
    [driverId]
  );
  return rows[0] || null;
};
