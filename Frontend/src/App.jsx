import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Register from "./pages/RegisterPage";

import AdminDashboard from "/src/pages/admin/AdminDashboard.jsx";
import DriverDashboard from "/src/pages/driver/DriverDashboard.jsx";
import StudentDashboard from "/src/pages/student/StudentDashboard.jsx";
import DriverNavbar from "/src/pages/driver/DriverNavbar";
import DriverHome from "/src/pages/driver/DriverHome";
import SelectBus from "/src/pages/driver/SelectBus";
import SelectVehicle from "/src/pages/driver/SelectVehicle";
import StartJourney from "/src/pages/driver/StartJourney";
import ActiveJourney from "/src/pages/driver/ActiveJourney";
import DriverProfile from "/src/pages/driver/DriverProfile";
import StudentSubscriptions from "/src/pages/student/StudentSubscription";
import LiveTracking from "/src/pages/student/LiveTracking";
import StudentPreferences from "/src/pages/student/StudentPreferences";
import StudentHistory from "/src/pages/student/StudentHistory";

import DashboardHome from "/src/pages/admin/DashboardHome";
import DriversBuses from "/src/pages/admin/DriverBuses";
import RoutesStops from "/src/pages/admin/RoutesStops";
import Assignments from "/src/pages/admin/Assignments";
import LiveMap from "/src/pages/admin/LiveMap";
import Maintenance from "/src/pages/admin/Maintenance";
import Logs from "/src/pages/admin/Logs";
import JourneyLogs from "/src/pages/admin/JourneyLogs";
import AdminProfile from "/src/pages/admin/AdminProfile";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ROLE SELECTION */}
        <Route path="/" element={<RoleSelect />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARDS */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
   <Route path="/driver/home" element={<DriverHome />} />
        <Route path="/driver/select-bus" element={<SelectBus />} />
        <Route path="/driver/select-vehicle" element={<SelectVehicle />} />
        <Route path="/driver/start-journey" element={<StartJourney />} />
        <Route path="/driver/active-journey" element={<ActiveJourney />} />
        <Route path="/driver/profile" element={<DriverProfile />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
<Route path="/student/subscriptions" element={<StudentSubscriptions />} />
<Route path="/student/live-tracking" element={<LiveTracking />} />
<Route path="/student/preferences" element={<StudentPreferences />} />
<Route path="/student/history" element={<StudentHistory />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard-home" element={<DashboardHome />} />
        <Route path="/admin/drivers-buses" element={<DriversBuses />} />
        <Route path="/admin/routes-stops" element={<RoutesStops />} />
        <Route path="/admin/assignments" element={<Assignments />} />
        <Route path="/admin/live-map" element={<LiveMap />} />
        <Route path="/admin/maintenance" element={<Maintenance />} />
        <Route path="/admin/logs" element={<Logs />} />
        <Route path="/admin/journey-logs" element={<JourneyLogs />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

      </Routes>
    </Router>
  );
}
