import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from "../models/studentModel.js";
import { hashPassword } from "../utils/auth.js";

export const addStudent = async (req, res) => {
  try {
    const { name, email, password, grade } = req.body;
    const hashed = await hashPassword(password);
    const id = await createStudent(name, email, hashed, grade);
    res.json({ success: true, studentId: id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const fetchStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const fetchStudent = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const editStudent = async (req, res) => {
  try {
    const updated = await updateStudent(req.params.id, req.body.name, req.body.grade);
    if (!updated) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, message: "Updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const removeStudent = async (req, res) => {
  try {
    const deleted = await deleteStudent(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
