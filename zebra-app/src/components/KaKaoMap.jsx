import { useEffect, useRef } from "react";
import { loadKakao } from "../lib/loadKakao";

export default function KakaoMap({ lat = 37.5665, lng = 126.9780, level = 6, height = 300 }) {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    loadKakao()
      .then((kakao) => {
        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(lat, lng),
          level,
        };
        map = new kakao.maps.Map(container, options);
        // 필요하면 여기서 마커/서비스 추가
        // new kakao.maps.Marker({ position: options.center, map });
      })
      .catch((err) => {
        console.error("Kakao Map load failed:", err);
      });

    return () => {
      map = null;
    };
  }, [lat, lng, level]);

  return <div ref={mapRef} style={{ width: "100%", height }} />;
}
