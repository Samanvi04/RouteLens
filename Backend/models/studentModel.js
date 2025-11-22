import { dbQuery } from "../utils/dbQuery.js";

export const createStudent = async (name, email, password, grade, lat = null, lng = null) => {
  const sql = "INSERT INTO students (name, email, password, grade, lat, lng) VALUES (?, ?, ?, ?, ?, ?)";
  console.log('[studentModel] createStudent params:', { name, email, grade, lat, lng });
  const result = await dbQuery(sql, [name, email, password, grade, lat, lng]);
  return result.insertId;
};

export const getAllStudents = async () => {
  return await dbQuery("SELECT id, name, email, grade, assigned_bus FROM students ORDER BY id DESC");
};

export const getStudentById = async (id) => {
  const rows = await dbQuery("SELECT id, name, email, grade, assigned_bus FROM students WHERE id = ?", [id]);
  return rows[0] || null;
};

export const getStudentByName = async (name) => {
  // case-insensitive match
  const rows = await dbQuery("SELECT id, name, email, grade, lat, lng, assigned_bus FROM students WHERE LOWER(name) = LOWER(?) LIMIT 1", [name]);
  return rows[0] || null;
};

export const getStudentByEmail = async (email) => {
  const rows = await dbQuery("SELECT * FROM students WHERE email = ?", [email]);
  return rows[0] || null;
};

export const updateStudent = async (id, name, grade) => {
  const result = await dbQuery("UPDATE students SET name = ?, grade = ? WHERE id = ?", [name, grade, id]);
  return result.affectedRows > 0;
};

export const deleteStudent = async (id) => {
  const result = await dbQuery("DELETE FROM students WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export const updateStudentLocation = async (id, lat, lng) => {
  const sql = "UPDATE students SET lat = ?, lng = ? WHERE id = ?";
  const result = await dbQuery(sql, [lat, lng, id]);
  return result.affectedRows > 0;
};

// -------------------- UPDATE ASSIGNED BUS --------------------
export const updateStudentAssignedBus = async (id, busId) => {
  const sql = "UPDATE students SET assigned_bus = ? WHERE id = ?";
  const result = await dbQuery(sql, [busId, id]);
  return result.affectedRows > 0;
};
