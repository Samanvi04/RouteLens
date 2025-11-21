import express from "express";
import { fetchBuses, addBus, removeBus } from "../controllers/busController.js";
import { bulkAddStopsForBus } from "../models/stopModel.js";

const router = express.Router();

router.get("/", fetchBuses);
router.post("/add", addBus);
router.delete("/:id", removeBus);

// Bulk add stops for a specific bus
router.post("/:id/stops", async (req, res) => {
	try {
		const busId = req.params.id;
		const stops = req.body.stops || [];
		await bulkAddStopsForBus(busId, stops);
		res.json({ success: true, message: "Stops added to bus" });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

export default router;
