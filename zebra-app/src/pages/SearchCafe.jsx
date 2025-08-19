import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import MiniMapHero from "../components/MiniMapHero.jsx";
import { CAFES } from "../data/cafes.js";

export default function SearchCafe() {
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const results = useMemo(() => {
    const n = q.trim().toLowerCase();
    const list = n ? CAFES.filter(c => c.name.toLowerCase().includes(n)) : CAFES;
    return list.slice(0, 50);
  }, [q]);

  return (
    <AppShell>
      <div className="screen search-screen">
        <div className="search-card app-card--gradient">
          <button className="backlink" onClick={() => nav("/search")}>← 뒤로</button>
          <h2 className="rank-title" style={{ marginTop: 4 }}>원하는 카페 검색</h2>

          <div className="search-hero"><MiniMapHero /></div>

          <div className="search-inputs">
            <div className="search-input">
              <span className="icon" aria-hidden>🔍</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="카페명을 입력하세요"
              />
            </div>
          </div>

          <ul className="search-list">
            {results.length ? results.map((c, i) => (
              <li key={i} className="search-row">
                <span className="place">{c.name}</span>
                <span className="loc">{c.loc}</span>
              </li>
            )) : <li className="search-empty">검색 결과가 없습니다.</li>}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
