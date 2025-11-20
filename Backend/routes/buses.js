import express from "express";
import { fetchBuses, addBus, removeBus } from "../controllers/busController.js";

const router = express.Router();

router.get("/", fetchBuses);
router.post("/add", addBus);
router.delete("/:id", removeBus);

export default router;
