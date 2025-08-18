export default function PromoCarousel() {
  return (
    <div className="carousel">
      <a className="slide s1" href="#" target="_blank" rel="noreferrer">
        <span className="badge">AD</span>
        <div className="t">근처 카페 할인 10%</div>
        <div className="d">오늘만 적용되는 쿠폰을 확인하세요</div>
      </a>
      <a className="slide s2" href="#" target="_blank" rel="noreferrer">
        <span className="badge">AD</span>
        <div className="t">신규 오픈 카페</div>
        <div className="d">라떼 아트 챌린지 참가해요 ☕</div>
      </a>
      <a className="slide s3" href="#" target="_blank" rel="noreferrer">
        <span className="badge">AD</span>
        <div className="t">리뷰 이벤트</div>
        <div className="d">첫 리뷰 작성 시 포인트 지급</div>
      </a>
    </div>
  );
}
