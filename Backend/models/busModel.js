import { dbQuery } from "../utils/dbQuery.js";

// Fetch all buses
export const getAllBuses = async () => {
  return await dbQuery("SELECT id, name, plate, capacity, created_at FROM buses ORDER BY id ASC");
};

// Create a new bus (supports optional plate and capacity)
export const createBus = async (name, plate = null, capacity = null) => {
  const sql = `INSERT INTO buses (name, plate, capacity) VALUES (?, ?, ?)`;
  const result = await dbQuery(sql, [name, plate, capacity]);
  return result.insertId;
};

// Delete a bus
export const deleteBus = async (id) => {
  const result = await dbQuery("DELETE FROM buses WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

// Fetch a single bus
export const getBusById = async (id) => {
  const rows = await dbQuery("SELECT id, name, plate, capacity, created_at FROM buses WHERE id = ?", [id]);
  return rows[0] || null;
};
