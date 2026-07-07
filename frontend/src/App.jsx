import { Routes, Route } from "react-router-dom";
import GetStarted from "./pages/GetStarted.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyCode from "./pages/VerifyCode.jsx";
import NewPassword from "./pages/NewPassword.jsx";
import PasswordUpdated from "./pages/PasswordUpdated.jsx";
import Welcome from "./pages/Welcome.jsx";
import LostFound from "./pages/LostFound.jsx";
import ReportForm from "./pages/ReportForm.jsx";
import ReportList from "./pages/ReportList.jsx";
import Profile from "./pages/Profile.jsx";
import Users from "./pages/Users.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/password-updated" element={<PasswordUpdated />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lost-found"
        element={
          <ProtectedRoute>
            <LostFound />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report/:type"
        element={
          <ProtectedRoute>
            <ReportForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report-list"
        element={
          <ProtectedRoute>
            <ReportList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<GetStarted />} />
    </Routes>
  );
}
