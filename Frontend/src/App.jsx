import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/RoleSelect.jsx";
import Login from "./pages/Login.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import DriverRegister from "./pages/DriverRegister.jsx";
import StudentRegister from "./pages/StudentRegister.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import DriverDashboard from "./pages/driver/DriverDashboard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import DriverHome from "./pages/driver/DriverHome.jsx";
import SelectBus from "./pages/driver/SelectBus.jsx";
import StartJourney from "./pages/driver/StartJourney.jsx";
import DriverProfile from "./pages/driver/DriverProfile.jsx";
import StudentSubscriptions from "./pages/student/StudentSubscription.jsx";
import StudentHistory from "./pages/student/StudentHistory.jsx";
import StudentMap from "./pages/student/StudentMap.jsx";
import AdminCrowd from "./pages/admin/AdminCrowd.jsx";
import ChatBot from "./pages/student/ChatBot.jsx";
import RatingPage from "./pages/student/RatingPage.jsx";
import Assignments from "./pages/admin/Assignments.jsx";
import LiveMap from "./pages/admin/LiveMap.jsx";
import Maintenance from "./pages/admin/Maintenance.jsx";
import AdminManage from "./pages/admin/AdminManage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/assignments" element={<Assignments />} />
        <Route path="/admin/live-map" element={<LiveMap />} />
        <Route path="/admin/maintenance" element={<Maintenance />} />
        <Route path="/admin/crowd" element={<AdminCrowd />} />
        <Route path="/admin/manage" element={<AdminManage />} />

        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/home" element={<DriverHome />} />
        <Route path="/driver/select-bus" element={<SelectBus />} />
        <Route path="/driver/start-journey" element={<StartJourney />} />
        <Route path="/driver/profile" element={<DriverProfile />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/subscriptions" element={<StudentSubscriptions />} />
        <Route path="/student/history" element={<StudentHistory />} />
        <Route path="/student/map" element={<StudentMap />} />
        <Route path="/student/chatbot" element={<ChatBot />} />
        <Route path="/student/rating" element={<RatingPage />} />

        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/register/driver" element={<DriverRegister />} />
        <Route path="/register/student" element={<StudentRegister />} />
      </Routes>
    </Router>
  );
}
