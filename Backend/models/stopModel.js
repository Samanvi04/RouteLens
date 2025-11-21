import { dbQuery } from "../utils/dbQuery.js";

/* -------------------- CREATE STOP -------------------- */
// Add a stop to a route
export const createStop = async (routeId, name, lat, lng, order) => {
  // routeId may be null if stop is being attached to a bus instead.
  // New signature supports optional 6th parameter `busId`.
  const args = Array.from(arguments);
  const busId = args.length >= 6 ? args[5] : null;
  const sql = `
    INSERT INTO stops (route_id, bus_id, name, latitude, longitude, stop_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const result = await dbQuery(sql, [routeId, busId, name, lat, lng, order]);
  return result.insertId;
};

/* -------------------- GET ALL STOPS FOR A ROUTE -------------------- */
export const getStopsByRoute = async (routeId) => {
  return await dbQuery(
    `SELECT * FROM stops WHERE route_id = ? ORDER BY stop_order ASC`,
    [routeId]
  );
};

/* -------------------- GET A SINGLE STOP -------------------- */
export const getStopById = async (id) => {
  const rows = await dbQuery(
    `SELECT * FROM stops WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

/* -------------------- UPDATE STOP INFO -------------------- */
export const updateStop = async (id, name, lat, lng, order) => {
  const sql = `
    UPDATE stops
    SET name = ?, latitude = ?, longitude = ?, stop_order = ?
    WHERE id = ?
  `;
  const result = await dbQuery(sql, [name, lat, lng, order, id]);
  return result.affectedRows > 0;
};

/* -------------------- DELETE STOP -------------------- */
export const deleteStop = async (id) => {
  const sql = `DELETE FROM stops WHERE id = ?`;
  const result = await dbQuery(sql, [id]);
  return result.affectedRows > 0;
};

/* -------------------- REORDER STOPS IN A ROUTE -------------------- */
export const reorderStops = async (routeId, orderedStops) => {
  // orderedStops = [ { id:1, order:1 }, { id:3, order:2 }, ... ]
  for (const stop of orderedStops) {
    await dbQuery(
      `UPDATE stops SET stop_order = ? WHERE id = ? AND route_id = ?`,
      [stop.order, stop.id, routeId]
    );
  }
  return true;
};

/* -------------------- BULK ADD STOPS -------------------- */
// Use this when admin enters “Route Name + all stops” at once
export const bulkAddStops = async (routeId, stopsArray) => {
  // stopsArray = [ {name, lat, lng, order}, ... ]
  for (const stop of stopsArray) {
    await createStop(routeId, stop.name, stop.lat, stop.lng, stop.order);
  }
  return true;
};

/* -------------------- BULK ADD STOPS FOR A BUS -------------------- */
export const bulkAddStopsForBus = async (busId, stopsArray) => {
  // stopsArray = [ {name, lat, lng, order}, ... ]
  for (const stop of stopsArray) {
    // Pass null for routeId and include busId as 6th parameter
    await createStop(null, stop.name, stop.lat, stop.lng, stop.order, busId);
  }
  return true;
};
