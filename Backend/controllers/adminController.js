import { createAdmin, getAllAdmins } from "../models/adminModel.js";
import { hashPassword } from "../utils/auth.js";

export const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await hashPassword(password);
    const id = await createAdmin(name, email, hashed);
    res.json({ success: true, adminId: id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const fetchAdmins = async (req, res) => {
  try {
    const admins = await getAllAdmins();
    res.json({ success: true, data: admins });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
