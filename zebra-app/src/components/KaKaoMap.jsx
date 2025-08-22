import { useEffect, useRef } from "react";
import { loadKakao } from "../lib/loadKakao";

export default function KakaoMap({
  height = 420,
  level = 6,
  center = { lat: 37.5665, lng: 126.9780 },
  onReady,
}) {
  const containerEl = useRef(null);
  const mapRef = useRef(null);
  const kakaoRef = useRef(null);

  useEffect(() => {
    let cleanupRO = null;
    let onWindowResize = null;

    loadKakao()
      .then((kakao) => {
        kakaoRef.current = kakao;
        if (!containerEl.current) return;

        // 지도 생성
        const map = new kakao.maps.Map(containerEl.current, {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level,
        });
        mapRef.current = map;
        onReady && onReady({ kakao, map });

        // 컨테이너 크기 변화/초기 표시 시 강제 재배치
        const relayout = () => {
          if (!mapRef.current) return;
          mapRef.current.relayout();
          mapRef.current.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
        };

        // 1) 첫 페인트 직후 한 번
        setTimeout(relayout, 0);

        // 2) 윈도 리사이즈
        onWindowResize = () => relayout();
        window.addEventListener("resize", onWindowResize);

        // 3) 컨테이너 사이즈 변화를 감지(모드 전환 등)
        if ("ResizeObserver" in window) {
          const ro = new ResizeObserver(() => relayout());
          ro.observe(containerEl.current);
          cleanupRO = () => ro.disconnect();
        }
      })
      .catch((err) => {
        console.error("Kakao SDK load failed:", err);
      });

    return () => {
      if (onWindowResize) window.removeEventListener("resize", onWindowResize);
      if (cleanupRO) cleanupRO();
      mapRef.current = null;
    };
  }, [center.lat, center.lng, level, onReady]);

  return (
    <div
      ref={containerEl}
      style={{
        width: "100%",
        height,
        background: "#f3f4f6",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
      }}
    />
  );
}
