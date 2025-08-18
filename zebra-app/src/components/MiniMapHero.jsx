// src/components/MiniMapHero.jsx
export default function MiniMapHero() {
  const pins = [
    { left: "22%", top: "28%" },
    { left: "74%", top: "30%" },
    { left: "66%", top: "70%" },
    { left: "35%", top: "60%" },
    { left: "84%", top: "56%" },
  ];

  return (
    <div className="mini-map-hero pro" aria-label="카페 지도 미리보기">
      {/* 중앙 레이더 */}
      <div className="radar">
        <div className="core" />
        <div className="ring r1" />
        <div className="ring r2" />
        <div className="ring r3" />
        <div className="sweep" />
      </div>

      {/* 카페 핀들 (하나는 탐지 효과) */}
      {pins.map((p, i) => (
        <div
          className={`pin ${i === 2 ? "pin--pulse" : ""}`}
          style={{ left: p.left, top: p.top }}
          key={i}
        >
          ☕
        </div>
      ))}

      <div className="map-haze" aria-hidden />
    </div>
  );
}
