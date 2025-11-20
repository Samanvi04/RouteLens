import { dbQuery } from "../utils/dbQuery.js";

// Fetch all buses
export const getAllBuses = async () => {
  return await dbQuery("SELECT * FROM buses ORDER BY id ASC");
};

// Create a new bus
export const 
createBus = async (name) => {
  const result = await dbQuery("INSERT INTO buses (name) VALUES (?)", [name]);
  return result.insertId;
};

// Delete a bus
export const deleteBus = async (id) => {
  const result = await dbQuery("DELETE FROM buses WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

// Fetch a single bus
export const getBusById = async (id) => {
  const rows = await dbQuery("SELECT * FROM buses WHERE id = ?", [id]);
  return rows[0] || null;
};
