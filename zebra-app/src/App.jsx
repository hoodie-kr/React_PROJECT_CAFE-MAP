import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Forgot from "./pages/Forgot.jsx";
import TopCafes from "./pages/TopCafes.jsx";
import Menu from "./pages/menu.jsx";

/* ✅ 새로 추가 */
import Search from "./pages/Search.jsx";          // 선택 화면(버튼 2개)
import SearchCafe from "./pages/SearchCafe.jsx";  // 카페명 검색 화면
import SearchRegion from "./pages/SearchRegion.jsx"; // 지역 검색 화면

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/top" element={<TopCafes />} />
      <Route path="/menu" element={<Menu />} />

      {/* ✅ 새 경로 3개 */}
      <Route path="/search" element={<Search />} />
      <Route path="/search/cafe" element={<SearchCafe />} />
      <Route path="/search/region" element={<SearchRegion />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
