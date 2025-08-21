import { useEffect, useRef } from "react";
import { loadKakao } from "../lib/loadKakao";

export default function KakaoMap({ height = 420, level = 6, center = { lat: 37.5665, lng: 126.9780 }, onReady }) {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    loadKakao()
      .then((kakao) => {
        if (!mapRef.current) return;
        const opts = {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level
        };
        map = new kakao.maps.Map(mapRef.current, opts);
        console.log("KAKAO READY ✓", kakao?.maps ? "maps ok" : "no maps");
        onReady && onReady({ kakao, map });
      })
      .catch((err) => {
        console.error("Kakao SDK load failed:", err);
      });
    return () => { map = null; };
  }, [center.lat, center.lng, level, onReady]);

  return <div ref={mapRef} style={{ width: "100%", height }} />;
}
