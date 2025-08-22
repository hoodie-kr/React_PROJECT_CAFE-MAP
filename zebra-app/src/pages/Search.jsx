// src/pages/Search.jsx
import { useCallback, useRef, useState } from "react";
import AppShell from "../components/AppShell.jsx";

// 프로젝트 파일명에 맞춰 하나만 사용
import KakaoMap from "../components/KaKaoMap.jsx";
// import KakaoMap from "../components/KakaoMap.jsx";

import CAFES from "../data/cafes.js";
import HotPlaceCarousel from "../components/HotPlaceCarousel.jsx";

export default function Search() {
  const [mode, setMode] = useState(null);   // null | 'cafe' | 'region'
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const kakaoRef = useRef(null);
  const mapRef = useRef(null);
  const placesRef = useRef(null);
  const geocoderRef = useRef(null);
  const clustererRef = useRef(null);
  const markersRef = useRef([]);

  const handleMapReady = useCallback(({ kakao, map }) => {
    kakaoRef.current = { kakao };
    mapRef.current = map;
    placesRef.current = new kakao.maps.services.Places(map);
    geocoderRef.current = new kakao.maps.services.Geocoder();
    if (kakao.maps.MarkerClusterer) {
      clustererRef.current = new kakao.maps.MarkerClusterer({
        map,
        averageCenter: true,
        minLevel: 6,
      });
    }
  }, []);

  const clearMarkers = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    if (clustererRef.current) clustererRef.current.clear();
  };

  const resetAll = () => {
    setQuery("");
    setResults([]);
    clearMarkers();
  };

  // ---------- 검색 로직 ----------
  const geocodeAndShowLoc = async (items) => {
    if (!mapRef.current || !geocoderRef.current || !kakaoRef.current) return;
    const { kakao } = kakaoRef.current;
    const geocoder = geocoderRef.current;

    const MAX_TO_GEOCODE = 50;
    const target = items.slice(0, MAX_TO_GEOCODE);

    const markers = [];
    const bounds = new kakao.maps.LatLngBounds();
    const resolved = [];

    for (const it of target) {
      if (!it.loc) continue;
      const pos = await new Promise((res) => {
        geocoder.addressSearch(it.loc, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            res(new kakao.maps.LatLng(result[0].y, result[0].x));
          } else res(null);
        });
      });
      if (!pos) continue;

      const marker = new kakao.maps.Marker({ position: pos, title: it.name });
      markers.push(marker);
      bounds.extend(pos);
      resolved.push({ ...it, lat: pos.getLat(), lng: pos.getLng() });
    }

    setResults(resolved);
    clearMarkers();
    if (markers.length) {
      if (clustererRef.current) clustererRef.current.addMarkers(markers);
      else markers.forEach((m) => m.setMap(mapRef.current));
      markersRef.current = markers;
      mapRef.current.setBounds(bounds);
    }
  };

  const searchRegionCafes = async (keyword) => {
    if (!mapRef.current || !geocoderRef.current || !placesRef.current || !kakaoRef.current) return;
    const { kakao } = kakaoRef.current;

    geocoderRef.current.addressSearch(keyword, (result, status) => {
      if (status !== kakao.maps.services.Status.OK) return;

      const center = new kakao.maps.LatLng(result[0].y, result[0].x);
      mapRef.current.setLevel(5);
      mapRef.current.setCenter(center);

      placesRef.current.categorySearch(
        "CE7",
        (data, s) => {
          if (s !== kakao.maps.services.Status.OK) return;

          const items = data.map((p) => ({
            id: p.id,
            name: p.place_name,
            lat: Number(p.y),
            lng: Number(p.x),
            address: p.road_address_name || p.address_name,
          }));
          setResults(items);

          const markers = items.map(
            (it) =>
              new kakao.maps.Marker({
                position: new kakao.maps.LatLng(it.lat, it.lng),
                title: it.name,
              })
          );

          clearMarkers();
          if (clustererRef.current) clustererRef.current.addMarkers(markers);
          else markers.forEach((m) => m.setMap(mapRef.current));
          markersRef.current = markers;

          const bounds = new kakao.maps.LatLngBounds();
          markers.forEach((m) => bounds.extend(m.getPosition()));
          if (!bounds.isEmpty()) mapRef.current.setBounds(bounds);
        },
        { location: center, radius: 2000 }
      );
    });
  };

  const handleSearch = async () => {
    const q = query.trim();
    if (!mapRef.current) return;

    if (mode === "cafe") {
      const filtered = q ? CAFES.filter((c) => c.name.includes(q) || c.loc?.includes(q)) : CAFES;
      await geocodeAndShowLoc(filtered);
    } else if (mode === "region") {
      if (!q) return;
      await searchRegionCafes(q);
    }
  };

  const panTo = (it) => {
    const { kakao } = kakaoRef.current ?? {};
    if (!kakao || !mapRef.current || !it.lat || !it.lng) return;
    mapRef.current.panTo(new kakao.maps.LatLng(it.lat, it.lng));
  };

  // 내부 공통 스타일: 가로 100%
  const wrapStyle = { padding: 16, width: "100%", margin: "0 auto" };
  const fullBtn = {
    width: "100%",
    padding: 18,
    fontSize: 18,
    borderRadius: 16,
    border: 0,
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    fontWeight: 700,
    background: "white",
    cursor: "pointer",
  };

  // ---------- UI ----------
  // 0단계: 제목 → 캐러셀 → 버튼 두 개 (카드 내부만 꽉 차게)
  if (!mode) {
    return (
      <AppShell>
        <div style={wrapStyle}>
          <h2 style={{ marginBottom: 12, fontWeight: 800, textAlign: "center" }}>주변 카페 지도</h2>

          {/* 캐러셀 컨테이너 자체를 width:100% */}
          <div style={{ width: "100%", marginBottom: 16 }}>
            <HotPlaceCarousel height={320} />
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <button type="button" onClick={() => { setMode("cafe"); resetAll(); }} style={fullBtn}>
              원하는 카페
            </button>
            <button type="button" onClick={() => { setMode("region"); resetAll(); }} style={fullBtn}>
              원하는 동네
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  // 1단계: 검색창 + 지도 + 리스트
  return (
    <AppShell>
      <div style={wrapStyle}>
        {/* 상단 바 */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <button
            type="button"
            onClick={() => { setMode(null); resetAll(); }}
            title="뒤로"
            style={{
              padding: "8px 12px",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              background: "white",
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <div style={{ fontWeight: 800, fontSize: 18 }}>
            {mode === "cafe" ? "원하는 카페" : "원하는 동네"}
          </div>
        </div>

        {/* 검색 입력 (가로 100%) */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10, width: "100%" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={mode === "cafe" ? "카페명을 입력하세요" : "동네/주소를 입력하세요"}
            style={{ flex: 1, padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
          />
          <button
            type="button"
            onClick={handleSearch}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: 0,
              background: "#111827",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            검색
          </button>
        </div>

        {/* 지도 (가로 100%) */}
        <div style={{ width: "100%" }}>
          <KakaoMap onReady={handleMapReady} height={420} />
        </div>

        {/* 결과 리스트 (가로 100%) */}
        <div
          style={{
            width: "100%",
            marginTop: 12,
            maxHeight: 260,
            overflowY: "auto",
            background: "rgba(255,255,255,0.6)",
            borderRadius: 12,
          }}
        >
          {results.map((it, idx) => (
            <div
              key={it.id ?? `${it.name}-${idx}`}
              onClick={() => panTo(it)}
              style={{ padding: 12, borderBottom: "1px solid #eee", cursor: it.lat ? "pointer" : "default" }}
            >
              <div style={{ fontWeight: 700 }}>{it.name}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{it.address ?? it.loc}</div>
            </div>
          ))}
          {!results.length && (
            <div style={{ padding: 14, color: "#666" }}>
              {mode === "cafe"
                ? "검색어를 입력하고 검색을 눌러보세요. (미입력 시 내 데이터 전체에서 일부만 표시합니다)"
                : "동네/주소를 입력하고 검색을 눌러보세요."}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
