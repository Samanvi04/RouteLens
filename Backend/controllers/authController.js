import { verifyPassword } from "../utils/auth.js";
import { getStudentByEmail } from "../models/studentModel.js";
import { getDriverByEmail } from "../models/driverModel.js";
import { getAdminByEmail } from "../models/adminModel.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email & password required" });

  try {
    // STUDENT
    let user = await getStudentByEmail(email);
    if (user && await verifyPassword(password, user.password)) 
      return res.json({ success: true, role: "student", userId: user.id });

    // DRIVER
    user = await getDriverByEmail(email);
    if (user && await verifyPassword(password, user.password))
      return res.json({ success: true, role: "driver", userId: user.id });

    // ADMIN
    user = await getAdminByEmail(email);
    if (user && await verifyPassword(password, user.password))
      return res.json({ success: true, role: "admin", userId: user.id });

    // None matched
    res.status(401).json({ success: false, message: "Invalid email or password" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
