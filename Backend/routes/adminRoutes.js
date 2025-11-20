import express from "express";
import { addAdmin, fetchAdmins } from "../controllers/adminController.js";

const router = express.Router();

// POST /admins/register
router.post("/register", addAdmin);

// GET /admins
router.get("/", fetchAdmins);

export default router;
