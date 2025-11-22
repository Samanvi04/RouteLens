import express from "express";
import {
  addStudent,
  fetchStudents,
  fetchStudent,
  editStudent,
  removeStudent
} from "../controllers/studentController.js";

import { setStudentLocation } from "../controllers/studentController.js";
import { assignBusToStudent } from "../controllers/studentController.js";
import { fetchStudentMapData } from "../controllers/studentController.js";
import { fetchPrarthanaRoute } from "../controllers/studentController.js";

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

router.put("/:id/location", setStudentLocation);

// Assign a bus to a student
router.put("/:id/assign-bus", assignBusToStudent);

// Get map data (student source + next stops for assigned bus)
router.get("/:id/map-data", fetchStudentMapData);

// Debug: return prarthana's source + stops for her assigned bus
router.get("/prarthana-route", fetchPrarthanaRoute);

export default router;
