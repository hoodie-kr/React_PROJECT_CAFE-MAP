import { useState } from "react";
import AppShell from "../components/AppShell.jsx";

const DATA = {
  revenue: [
    { name: "장발장", loc: "서울시 강남구" },
    { name: "개화공간", loc: "울산시 남구" },
    { name: "백가담", loc: "경기도 고양시" },
    { name: "기억의서재", loc: "대전시 유성구" },
    { name: "노르웨이숲", loc: "서울시 마포구" },
    { name: "빨강머리앤", loc: "서울시 관악구" },
    { name: "나인어브제", loc: "경기도 부천시" },
    { name: "리플라이", loc: "서울시 성동구" },
    { name: "범어커피", loc: "경상북도 영천시" },
    { name: "베어드커피", loc: "서울시 서초구" },
  ],
  reviews: [
    { name: "리브레", loc: "서울시 마포구" },
    { name: "앤트러사이트", loc: "서울시 양천구" },
    { name: "차알차알", loc: "대구시 중구" },
    { name: "어라운지", loc: "인천시 연수구" },
    { name: "폴바셋", loc: "경기도 성남시" },
    { name: "프릳츠", loc: "서울시 용산구" },
    { name: "펠트", loc: "서울시 강남구" },
    { name: "노트커피", loc: "부산시 해운대구" },
    { name: "라바짜", loc: "대전시 서구" },
    { name: "모모스", loc: "부산시 부산진구" },
  ],
  trending: [
    { name: "콩이", loc: "서울시 관악구" },
    { name: "호라이즌", loc: "서울시 송파구" },
    { name: "포터필드", loc: "인천시 부평구" },
    { name: "에이바우트", loc: "경기도 안양시" },
    { name: "테라스", loc: "광주시 동구" },
    { name: "슬로우", loc: "대구시 수성구" },
    { name: "말차당", loc: "제주시 애월읍" },
    { name: "가배당", loc: "부산시 수영구" },
    { name: "해리티지", loc: "대전시 유성구" },
    { name: "프로스트", loc: "울산시 남구" },
  ],
};

export default function TopCafes() {
  const [tab, setTab] = useState("revenue"); // 'revenue' | 'reviews' | 'trending'
  const list = DATA[tab];

  return (
    <AppShell>
      <div className="screen top-screen">
        <div className="rank-card app-card--gradient">
          {/* 상단 탭 */}
          <div className="rank-tabs" role="tablist" aria-label="TOP 기준 선택">
            <button
              className={`tab ${tab === "revenue" ? "is-active" : ""}`}
              onClick={() => setTab("revenue")}
              role="tab"
              aria-selected={tab === "revenue"}
            >
              매출 1등
            </button>
            <button
              className={`tab ${tab === "reviews" ? "is-active" : ""}`}
              onClick={() => setTab("reviews")}
              role="tab"
              aria-selected={tab === "reviews"}
            >
              리뷰 1등
            </button>
            <button
              className={`tab ${tab === "trending" ? "is-active" : ""}`}
              onClick={() => setTab("trending")}
              role="tab"
              aria-selected={tab === "trending"}
            >
              최근 인기 1등
            </button>
          </div>

          {/* 타이틀 */}
          <h2 className="rank-title">TOP 카페</h2>

          {/* 랭킹 리스트 */}
          <ol className="rank-list">
            {list.map((c, i) => (
              <li key={`${tab}-${i}`} className="rank-row">
                <span className="place">{c.name}</span>
                <span className="loc">{c.loc}</span>
              </li>
            ))}
          </ol>

          {/* 하단 CTA */}
          <button className="btn zebra-cta" type="button">ZEBRA</button>
        </div>
      </div>
    </AppShell>
  );
}
