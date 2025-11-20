import express from "express";
import { fetchAvailableDrivers, assignDriver, fetchAssignments } from "../controllers/assignmentController.js";

const router = express.Router();

router.get("/drivers", fetchAvailableDrivers);
router.post("/assign", assignDriver);
router.get("/", fetchAssignments);

export default router;
