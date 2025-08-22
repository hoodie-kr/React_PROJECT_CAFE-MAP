// src/lib/loadKakao.js
let loading = null;

export function loadKakao() {
  if (window.kakao?.maps) return Promise.resolve(window.kakao);

  if (!loading) {
    const env = import.meta.env;
    const rawKey = env?.VITE_KAKAO_MAP_KEY;
    const appkey = typeof rawKey === "string" ? rawKey.trim() : "";

    if (!appkey) {
      console.error("[Kakao] ENV check keys:", Object.keys(env || {}));
      return Promise.reject(new Error("VITE_KAKAO_MAP_KEY 없음"));
    }

    const sdkUrl =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}` +
      `&autoload=false&libraries=services,clusterer,drawing`;
    console.info("[Kakao] loading:", sdkUrl);

    loading = new Promise((resolve, reject) => {
      const exist = document.getElementById("kakao-map-sdk");
      const onReady = () => window.kakao?.maps
        ? window.kakao.maps.load(() => resolve(window.kakao))
        : reject(new Error("kakao.maps 미존재"));

      if (exist) {
        exist.addEventListener("load", onReady, { once: true });
        exist.addEventListener("error", reject, { once: true });
        return;
      }

      const s = document.createElement("script");
      s.id = "kakao-map-sdk";
      s.async = true;
      s.src = sdkUrl;
      s.onload = onReady;
      s.onerror = (e) => {
        console.error("[Kakao] SDK script load error:", e);
        reject(e);
      };
      document.head.appendChild(s);
    }).then((kakao) => {
      console.info("[Kakao] SDK ready ✓", !!kakao.maps);
      return kakao;
    }).catch((err) => {
      loading = null; // 실패 시 재시도 가능
      throw err;
    });
  }
  return loading;
}
