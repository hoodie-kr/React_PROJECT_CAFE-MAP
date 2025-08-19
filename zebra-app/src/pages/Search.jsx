import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import MiniMapHero from "../components/MiniMapHero.jsx";

export default function Search() {
  const nav = useNavigate();

  return (
    <AppShell>
      <div className="screen search-screen">
        <div className="search-card app-card--gradient">
          <h1 className="brand-title" style={{ marginBottom: 6 }}>ZEBRA</h1>
          <p className="search-sub">주변 카페를 지도에서 찾아보세요.</p>

          <div className="search-hero">
            <MiniMapHero />
          </div>

          {/* ✅ 버튼 2개로 선택 */}
          <div className="choice-grid">
            <button className="btn btn-choice" onClick={() => nav("/search/cafe")}>
              원하는 카페
            </button>
            <button className="btn btn-choice" onClick={() => nav("/search/region")}>
              원하는 동네
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
