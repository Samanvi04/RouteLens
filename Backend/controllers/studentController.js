import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from "../models/studentModel.js";
import { updateStudentAssignedBus } from "../models/studentModel.js";
import { getStopsByBus } from "../models/stopModel.js";
import { getStudentByName } from "../models/studentModel.js";
import { hashPassword } from "../utils/auth.js";
import { updateStudentLocation } from "../models/studentModel.js";


export const addStudent = async (req, res) => {
  try {
    const { name, email, password, grade, lat, lng } = req.body;
    console.log('[studentController] addStudent body:', { name, email, grade, lat, lng });
    const hashed = await hashPassword(password);
    const id = await createStudent(name, email, hashed, grade, lat ?? null, lng ?? null);
    if (lat != null || lng != null) {
      try {
        await updateStudentLocation(id, lat ?? null, lng ?? null);
      } catch (e) {
        console.warn('[studentController] updateStudentLocation failed:', e.message);
      }
    }
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


export const setStudentLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lng } = req.body;

    if (lat == null || lng == null) {
      return res.status(400).json({ success: false, message: "Latitude and longitude required" });
    }

    const updated = await updateStudentLocation(id, lat, lng);
    if (!updated) return res.status(404).json({ success: false, message: "Student not found" });

    res.json({ success: true, message: "Location updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const assignBusToStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { bus_id } = req.body;
    if (!bus_id) return res.status(400).json({ success: false, message: "bus_id required" });

    const ok = await updateStudentAssignedBus(studentId, bus_id);
    if (!ok) return res.status(404).json({ success: false, message: "Student not found" });

    res.json({ success: true, message: "Assigned bus updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const fetchStudentMapData = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await getStudentById(studentId);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    // By request: use the student record for 'prarthana' as the authoritative
    // input for the map — prefer her assigned_bus and coordinates. If
    // 'prarthana' is not found or missing values, fall back to the
    // requesting student's values.
    let sourceLat = student.lat ?? null;
    let sourceLng = student.lng ?? null;
    let busId = student.assigned_bus;
    try {
      const prarthana = await getStudentByName('prarthana');
      if (prarthana) {
        // prefer prarthana's assigned_bus when present
        if (prarthana.assigned_bus) busId = prarthana.assigned_bus;
        // prefer prarthana's location when present
        if (prarthana.lat != null && prarthana.lng != null) {
          sourceLat = prarthana.lat;
          sourceLng = prarthana.lng;
        }
      }
    } catch (e) {
      // ignore lookup errors, continue with requesting student's values
    }

    if (!busId) return res.status(400).json({ success: false, message: 'No assigned bus available (checked student and prarthana override)' });

    const stops = await getStopsByBus(busId);

    // Return all stops for the bus as the destination candidates. Filter
    // out any stops missing coordinates to avoid sending invalid points.
    let nextStops = [];
    if (Array.isArray(stops)) {
      nextStops = stops.filter(s => s.latitude != null && s.longitude != null);
    }

    res.json({ success: true, data: { student: { id: student.id, lat: sourceLat, lng: sourceLng, assigned_bus: busId }, nextStops } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Debug helper: return prarthana's record and all stops for her assigned bus
export const fetchPrarthanaRoute = async (req, res) => {
  try {
    const prarthana = await getStudentByName('prarthana');
    if (!prarthana) return res.status(404).json({ success: false, message: 'Prarthana not found' });

    const busId = prarthana.assigned_bus;
    if (!busId) return res.status(400).json({ success: false, message: 'Prarthana has no assigned_bus' });

    const stops = await getStopsByBus(busId);
    const nextStops = Array.isArray(stops) ? stops.filter(s => s.latitude != null && s.longitude != null) : [];

    res.json({ success: true, data: { student: { id: prarthana.id, name: prarthana.name, lat: prarthana.lat, lng: prarthana.lng, assigned_bus: busId }, nextStops } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};