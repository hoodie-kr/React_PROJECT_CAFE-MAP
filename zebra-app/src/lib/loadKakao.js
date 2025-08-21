// SDK를 한 번만 로드하고, kakao.maps가 준비되면 resolve
let loading = null;

export function loadKakao() {
  if (window.kakao && window.kakao.maps) {
    return Promise.resolve(window.kakao);
  }
  if (!loading) {
    const appkey = import.meta.env.VITE_KAKAO_MAP_KEY;
    if (!appkey) return Promise.reject(new Error("VITE_KAKAO_MAP_KEY가 없습니다 (.env 확인)"));

    loading = new Promise((resolve, reject) => {
      const exist = document.getElementById("kakao-map-sdk");
      if (exist) {
        exist.addEventListener("load", () => {
          window.kakao?.maps?.load(() => resolve(window.kakao));
        }, { once: true });
        return;
      }

      const s = document.createElement("script");
      s.id = "kakao-map-sdk";
      s.async = true;
      s.src =
        `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}` +
        `&autoload=false&libraries=services,clusterer,drawing`;
      s.onload = () => window.kakao.maps.load(() => resolve(window.kakao));
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });
  }
  return loading;
}
