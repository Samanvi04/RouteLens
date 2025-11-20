import {
  startJourney,
  endJourney,
  getActiveJourney,
  getJourneyById
} from "../models/journeyModel.js";

export const beginJourney = async (req, res) => {
  try {
    const id = await startJourney(req.body);
    res.json({ success: true, journey_id: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const completeJourney = async (req, res) => {
  try {
    const success = await endJourney(req.params.id);
    res.json({ success: true, ended: success });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchActiveJourney = async (req, res) => {
  try {
    const data = await getActiveJourney(req.params.driver_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchJourney = async (req, res) => {
  try {
    const data = await getJourneyById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
