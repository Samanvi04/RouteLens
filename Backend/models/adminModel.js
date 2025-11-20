import { dbQuery } from "../utils/dbQuery.js";

export const createAdmin = async (name, email, password) => {
  const sql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
  const result = await dbQuery(sql, [name, email, password]);
  return result.insertId;
};

export const getAllAdmins = async () => {
  return await dbQuery("SELECT id, name, email FROM admins ORDER BY id DESC");
};

export const getAdminByEmail = async (email) => {
  const rows = await dbQuery("SELECT * FROM admins WHERE email = ?", [email]);
  return rows[0] || null;
};
