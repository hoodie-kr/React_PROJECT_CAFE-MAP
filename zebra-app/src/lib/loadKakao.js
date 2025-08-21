// SDK를 한 번만 로드하고, kakao.maps가 준비되면 resolve
export function loadKakao() {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      // 이미 로드됨
      resolve(window.kakao);
      return;
    }

    const existing = document.getElementById('kakao-map-sdk');
    const onReady = () => {
      // autoload=false 사용 시 maps.load 안에서 초기화
      window.kakao.maps.load(() => resolve(window.kakao));
    };

    if (existing) {
      existing.addEventListener('load', onReady, { once: true });
      return;
    }

    const appkey = import.meta.env.VITE_KAKAO_MAP_KEY;
    const script = document.createElement('script');
    script.id = 'kakao-map-sdk';
    script.async = true;
    script.src =
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}` +
      `&autoload=false&libraries=services,clusterer,drawing`;
    script.onload = onReady;
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}
