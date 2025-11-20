import { dbQuery } from "../utils/dbQuery.js";

export const createDriver = async (name, email, password, license_no, vehicle_pref) => {
  const sql = `
    INSERT INTO drivers (name, email, password, license_no, vehicle_pref, is_verified)
    VALUES (?, ?, ?, ?, ?, 0)
  `;
  const result = await dbQuery(sql, [name, email, password, license_no, vehicle_pref || null]);
  return result.insertId;
};

export const getAllDrivers = async () => {
  return await dbQuery("SELECT id, name, email, license_no, vehicle_pref, is_verified FROM drivers ORDER BY id DESC");
};

export const getDriverById = async (id) => {
  const rows = await dbQuery("SELECT id, name, email, license_no, vehicle_pref, is_verified FROM drivers WHERE id = ?", [id]);
  return rows[0] || null;
};

export const getDriverByEmail = async (email) => {
  const rows = await dbQuery("SELECT * FROM drivers WHERE email = ?", [email]);
  return rows[0] || null;
};

export const verifyDriver = async (id) => {
  const result = await dbQuery("UPDATE drivers SET is_verified = 1 WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export const updateDriver = async (id, license_no, vehicle_pref) => {
  const result = await dbQuery(
    "UPDATE drivers SET license_no = ?, vehicle_pref = ? WHERE id = ?",
    [license_no, vehicle_pref, id]
  );
  return result.affectedRows > 0;
};

export const deleteDriver = async (id) => {
  const result = await dbQuery("DELETE FROM drivers WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
