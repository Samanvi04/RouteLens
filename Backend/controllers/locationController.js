import {
  addLocation,
  getJourneyLocations
} from "../models/locationModel.js";

export const saveLocation = async (req, res) => {
  try {
    const id = await addLocation(req.body);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchLocations = async (req, res) => {
  try {
    const data = await getJourneyLocations(req.params.journey_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
