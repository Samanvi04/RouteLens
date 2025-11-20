import { dbQuery } from "../utils/dbQuery.js";

export const createStudent = async (name, email, password, grade) => {
  const sql = "INSERT INTO students (name, email, password, grade) VALUES (?, ?, ?, ?)";
  const result = await dbQuery(sql, [name, email, password, grade]);
  return result.insertId;
};

export const getAllStudents = async () => {
  return await dbQuery("SELECT id, name, email, grade FROM students ORDER BY id DESC");
};

export const getStudentById = async (id) => {
  const rows = await dbQuery("SELECT id, name, email, grade FROM students WHERE id = ?", [id]);
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
