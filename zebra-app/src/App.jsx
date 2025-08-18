import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";   // ⬅️ 추가
import Forgot from "./pages/Forgot.jsx";   // ⬅️ 추가

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />   {/* ⬅️ 추가 */}
      <Route path="/forgot" element={<Forgot />} />   {/* ⬅️ 추가 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
