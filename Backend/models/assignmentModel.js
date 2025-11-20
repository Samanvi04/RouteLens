import { dbQuery } from "../utils/dbQuery.js";

// Fetch all available drivers (is_assigned = 0)
export const getAvailableDrivers = async () => {
  return await dbQuery(
    "SELECT id, name, email, license_no FROM drivers WHERE is_assigned = 0"
  );
};

// Assign driver to bus
export const assignDriverToBus = async (busId, driverId) => {
  // Insert into assignments table
  await dbQuery(
    "INSERT INTO assignments (bus_id, driver_id, assigned_at) VALUES (?, ?, NOW())",
    [busId, driverId]
  );

  // Mark driver as assigned
  await dbQuery("UPDATE drivers SET is_assigned = 1 WHERE id = ?", [driverId]);
};

// Unassign driver (optional)
export const unassignDriver = async (driverId) => {
  await dbQuery("DELETE FROM assignments WHERE driver_id = ?", [driverId]);
  await dbQuery("UPDATE drivers SET is_assigned = 0 WHERE id = ?", [driverId]);
};

// Get assignments with bus & driver info
export const getAllAssignments = async () => {
  return await dbQuery(
    `SELECT a.id as assignment_id, b.name as bus_name, d.name as driver_name, d.license_no, a.assigned_at
     FROM assignments a
     JOIN buses b ON a.bus_id = b.id
     JOIN drivers d ON a.driver_id = d.id
     ORDER BY a.assigned_at DESC`
  );
};
