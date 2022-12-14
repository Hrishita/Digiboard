import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadImage from "./components/UploadImage";
import UserProfile from "./components/UserProfile";
import DataIntegrityChecks from "./components/DataIntegrityChecks";
import Login from "./components/Login";
import ConfirmationCode from "./components/ConfirmationCode";
import Register from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";
import ConfirmForgotPassword from "./components/ConfirmForgotPassword";
import CaptureImage from "./components/pages/CaptureImage";
import LogoutPage from "./components/LogoutPage";
import Admin from "./components/Admin";
function App() {
  return (
    <Router>
    
      <Routes>
      {/* HRISHITA */}
      <Route path="/" element={<Login/>} />
      <Route path="/confirmation" element={<ConfirmationCode/>} />
      <Route path="/sign-up" element={<Register/>} />
      <Route path="/login"  element={<Login/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/confirm-forgot-password" element={<ConfirmForgotPassword/>} />
      <Route path="/logout" element={<LogoutPage/>} />      
      <Route path="/admin" element={<Admin/>} />
      {/* JAY */}
      <Route path="/capture-image" element={<CaptureImage/>} />

      {/* AMAN */}
      <Route path="/checks" element={<DataIntegrityChecks />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/upload-passport" element={<UploadImage />} />
     </Routes>
    </Router>


  );
}

export default App;
