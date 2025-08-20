// src/lib/kakaoLoader.js
export function loadKakao() {
  return new Promise((resolve, reject) => {
    try {
      if (window.kakao?.maps) {
        console.log("[kakao] maps already loaded");
        return resolve(window.kakao);
      }

      const key = import.meta.env.VITE_KAKAO_JS_KEY;
      console.log("[kakao] env key:", key ? "exists" : "missing");
      if (!key) return reject(new Error("VITE_KAKAO_JS_KEY is missing (.env 확인)"));

      // 중복 로딩 방지
      const existed = document.querySelector('script[data-kakao="sdk"]');
      if (existed) {
        return window.kakao.maps.load(() => resolve(window.kakao));
      }

      const s = document.createElement("script");
      s.dataset.kakao = "sdk";
      s.async = true;
      s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services,clusterer&autoload=false`;
      s.onload = () => {
        console.log("[kakao] sdk loaded");
        window.kakao.maps.load(() => {
          console.log("[kakao] maps loaded");
          resolve(window.kakao);
        });
      };
      s.onerror = () => reject(new Error("Failed to load Kakao Maps SDK script (도메인/키 확인)"));
      document.head.appendChild(s);
    } catch (e) {
      reject(e);
    }
  });
}
