import { dbQuery } from "../utils/dbQuery.js";

/* -------------------- CREATE ROUTE -------------------- */
// Admin creates a route
export const createRoute = async (name, description, createdBy) => {
  const sql = `
    INSERT INTO routes (name, description, created_by)
    VALUES (?, ?, ?)
  `;
  const result = await dbQuery(sql, [name, description, createdBy]);
  return result.insertId;
};

/* -------------------- GET ALL ROUTES -------------------- */
export const getAllRoutes = async () => {
  // Return routes without joining to users table (users table not present)
  return await dbQuery(`
    SELECT id, name, description, created_by, created_at
    FROM routes
    ORDER BY id DESC
  `);
};

/* -------------------- GET SINGLE ROUTE -------------------- */
export const getRouteById = async (id) => {
  const rows = await dbQuery("SELECT * FROM routes WHERE id = ?", [id]);
  return rows[0] || null;
};

/* -------------------- GET ROUTE + ALL STOPS -------------------- */
export const getRouteWithStops = async (routeId) => {
  const route = await getRouteById(routeId);

  if (!route) return null;

  const stops = await dbQuery(
    "SELECT * FROM stops WHERE route_id = ? ORDER BY stop_order ASC",
    [routeId]
  );

  return {
    ...route,
    stops,
  };
};

/* -------------------- UPDATE ROUTE -------------------- */
export const updateRoute = async (id, name, description) => {
  const sql = `
    UPDATE routes
    SET name = ?, description = ?
    WHERE id = ?
  `;
  const result = await dbQuery(sql, [name, description, id]);
  return result.affectedRows > 0;
};

/* -------------------- DELETE ROUTE -------------------- */
export const deleteRoute = async (id) => {
  const result = await dbQuery("DELETE FROM routes WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
