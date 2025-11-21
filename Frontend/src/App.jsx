import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import AdminRegister from "./pages/AdminRegister.jsx";
import DriverRegister from "./pages/DriverRegister.jsx";
import StudentRegister from "./pages/StudentRegister.jsx";
import AdminDashboard from "/src/pages/admin/AdminDashboard.jsx";
import DriverDashboard from "/src/pages/driver/DriverDashboard.jsx";
import StudentDashboard from "/src/pages/student/StudentDashboard.jsx";
import DriverNavbar from "/src/pages/driver/DriverNavbar";
import DriverHome from "/src/pages/driver/DriverHome";
import SelectBus from "/src/pages/driver/SelectBus";
import StartJourney from "/src/pages/driver/StartJourney";
import DriverProfile from "/src/pages/driver/DriverProfile";
import StudentSubscriptions from "/src/pages/student/StudentSubscription";
import StudentHistory from "/src/pages/student/StudentHistory";



import AdminCrowd from "./pages/Admin/AdminCrowd";
import ChatBot from "./pages/Student/ChatBot"; 

import RatingPage from "./pages/Student/RatingPage";
import Assignments from "/src/pages/admin/Assignments";
import LiveMap from "/src/pages/admin/LiveMap";
import Maintenance from "/src/pages/admin/Maintenance";


export default function App() {
  return (
    <Router>
      <Routes>

        {/* ROLE SELECTION */}
        <Route path="/" element={<RoleSelect />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        

        {/* DASHBOARDS */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
   <Route path="/driver/home" element={<DriverHome />} />
        <Route path="/driver/select-bus" element={<SelectBus />} />
     
        <Route path="/driver/start-journey" element={<StartJourney />} />
      
        <Route path="/driver/profile" element={<DriverProfile />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
<Route path="/student/subscriptions" element={<StudentSubscriptions />} />


<Route path="/student/history" element={<StudentHistory />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
   
        <Route path="/admin/assignments" element={<Assignments />} />
        <Route path="/admin/live-map" element={<LiveMap />} />
        <Route path="/admin/maintenance" element={<Maintenance />} />
     
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/register/driver" element={<DriverRegister />} />
        <Route path="/register/student" element={<StudentRegister />} />
<Route path="/admin/crowd" element={<AdminCrowd />} />
 <Route path="/student/chatbot" element={<ChatBot />} />
 <Route path="/student/rating" element={<RatingPage />} />
<Route path="/admin/manage" element={<AdminManage />} />


      </Routes>
    </Router>
  );
}
