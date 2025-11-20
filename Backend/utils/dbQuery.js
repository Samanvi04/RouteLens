import pool from "../config/db.js";

export const dbQuery = async (sql, params = []) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};


