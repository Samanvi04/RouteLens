import express from "express";
import {
  addStudent,
  fetchStudents,
  fetchStudent,
  editStudent,
  removeStudent
} from "../controllers/studentController.js";

const router = express.Router();

// POST /students/register
router.post("/register", addStudent);

// GET /students
router.get("/", fetchStudents);

// GET /students/:id
router.get("/:id", fetchStudent);

// PUT /students/:id
router.put("/:id", editStudent);

// DELETE /students/:id
router.delete("/:id", removeStudent);

export default router;
