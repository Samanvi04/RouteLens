import { dbQuery } from "../utils/dbQuery.js";

export const saveLocation = async (journeyId, lat, lng) => {
  const sql = `
    INSERT INTO location_updates 
    (journey_id, latitude, longitude, recorded_at)
    VALUES (?, ?, ?, NOW())
  `;
  return await dbQuery(sql, [journeyId, lat, lng]);
};

export const getJourneyLocations = async (journeyId) => {
  return await dbQuery(
    "SELECT * FROM location_updates WHERE journey_id = ? ORDER BY id ASC",
    [journeyId]
  );
};

