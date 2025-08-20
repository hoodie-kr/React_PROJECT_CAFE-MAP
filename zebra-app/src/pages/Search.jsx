// src/pages/Search.jsx
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import KakaoMap from "../components/KaKaoMap.jsx";

export default function Search() {
  const nav = useNavigate();
  return (
    <AppShell>
      <div className="screen search-screen">
        <div className="search-card app-card -gradient">
          <h1 className="brand-title" style={{ marginBottom: 6 }}>ZEBRA</h1>
          <p className="search-sub">주변 카페를 지도에서 찾아보세요.</p>

          {/* ✅ 카카오 지도 표시 */}
          <div className="search-hero" style={{ marginTop: 8 }}>
            <KakaoMap height={260} level={7} />
          </div>

          {/* 버튼 영역 */}
          <div className="choice-grid" style={{ marginTop: 14 }}>
            <button className="btn btn-choice" onClick={() => nav("/search/cafe")}>원하는 카페</button>
            <button className="btn btn-choice" onClick={() => nav("/search/region")}>원하는 동네</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
