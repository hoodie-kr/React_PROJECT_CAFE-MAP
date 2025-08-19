import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import CafeSlider from "../components/CafeSlider.jsx";

/* ✅ 탭별 슬라이드 세트 (이미지 경로는 public/cafes/ 에 맞춰줘) */
const SLIDES_BY_TAB = {
  revenue: [
    { name: "장발장",     src: "/cafes/jangbaljang.jpg" },
    { name: "개화공간",   src: "/cafes/gaehwagongan.jpg" },
    { name: "백가담",     src: "/cafes/baekgadam.jpg" },
    { name: "기억의서재", src: "/cafes/memorylibrary.jpg" },
  ],
  reviews: [
    { name: "노르웨이숲", src: "/cafes/norwayforest.jpg" },
    { name: "리플라이",   src: "/cafes/reply.jpg" },
    { name: "범어커피",   src: "/cafes/beomeo.jpg" },
    { name: "베어드커피", src: "/cafes/baird.jpg" },
  ],
  trending: [
    { name: "빨강머리앤", src: "/cafes/redanne.jpg" },
    { name: "나인어브제", src: "/cafes/nineobject.jpg" },
    { name: "백가담",     src: "/cafes/baekgadam.jpg" },
    { name: "장발장",     src: "/cafes/jangbaljang.jpg" },
  ],
};

/* ✅ 탭별로 살짝 다른 포인트 컬러(슬라이더 네비/도트 등에만 적용) */
const THEME_BY_TAB = {
  revenue: { t1: "#FFB3D6", t2: "#FFC7DD", t3: "#FFD6E8" }, // 베이비 핑크
  reviews: { t1: "#A5D8FF", t2: "#BDE0FE", t3: "#EAF6FF" }, // 파스텔 블루
  trending:{ t1: "#FFD27A", t2: "#FFE08A", t3: "#FFF3C4" }, // 라이트 옐로우
};

/* 기존 리스트 데이터는 그대로 유지 */
const DATA = {
  // revenue: [...], reviews: [...], trending: [...]
};

export default function TopCafes() {
  const [tab, setTab] = useState("revenue");
  const list = DATA[tab] ?? [];
  const slides = SLIDES_BY_TAB[tab] ?? [];
  const theme = THEME_BY_TAB[tab] ?? THEME_BY_TAB.revenue;
  const nav = useNavigate();

  return (
    <AppShell>
      {/* data-tab & style 변수로 CSS에서 탭별 톤 변경 */}
      <div className="screen top-screen">
        <div
          className="rank-card app-card--gradient"
          data-tab={tab}
          style={{ "--t1": theme.t1, "--t2": theme.t2, "--t3": theme.t3 }}
        >
          <div className="rank-tabs" role="tablist" aria-label="TOP 기준 선택">
            <button className={`tab ${tab === "revenue" ? "is-active" : ""}`} onClick={() => setTab("revenue")}>매출 1등</button>
            <button className={`tab ${tab === "reviews" ? "is-active" : ""}`} onClick={() => setTab("reviews")}>리뷰 1등</button>
            <button className={`tab ${tab === "trending" ? "is-active" : ""}`} onClick={() => setTab("trending")}>최근 인기 1등</button>
          </div>

          <h2 className="rank-title">TOP 카페</h2>

          {/* ✅ 탭이 바뀔 때마다 다른 이미지/이름 슬라이드 */}
          <CafeSlider items={slides} height={340} interval={2600} />

          <ol className="rank-list">
            {list.map((c, i) => (
              <li key={`${tab}-${i}`} className="rank-row">
                <span className="place">{c.name}</span>
                <span className="loc">{c.loc}</span>
              </li>
            ))}
          </ol>

          <button className="btn zebra-cta" type="button" onClick={() => nav("/search")}>ZEBRA</button>
        </div>
      </div>
    </AppShell>
  );
}
