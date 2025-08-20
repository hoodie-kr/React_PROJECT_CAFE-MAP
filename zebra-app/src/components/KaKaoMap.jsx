// src/components/KakaoMap.jsx
import { useEffect, useRef, useState } from "react";
import { loadKakao } from "../lib/kakaoLoader";

export default function KakaoMap({
  height = 260,
  center = { lat: 37.5665, lng: 126.9780 }, // 서울시청
  level = 7
}) {
  const wrapRef = useRef(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let map;
    loadKakao()
      .then((kakao) => {
        if (!wrapRef.current) return;
        map = new kakao.maps.Map(wrapRef.current, {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level
        });
        map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
      })
      .catch((e) => setErr(e?.message || String(e)));

    return () => {
      if (wrapRef.current) wrapRef.current.innerHTML = "";
      map = null;
    };
  }, [center.lat, center.lng, level]);

  return (
    <div style={{ width: "100%", height, borderRadius: 16, overflow: "hidden", position: "relative" }}>
      <div ref={wrapRef} style={{ width: "100%", height: "100%" }} />
      {err && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          background: "rgba(255,0,0,.06)", color: "#b00020",
          fontSize: 12, padding: 12, textAlign: "center"
        }}>
          Kakao Map Error: {err}
        </div>
      )}
    </div>
  );
}
