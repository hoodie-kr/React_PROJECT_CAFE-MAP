export default function CafeStoreIcon({ size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-label="Cafe Icon"
    >
      {/* 외곽선 */}
      <rect x="10" y="28" width="44" height="26" rx="4" fill="rgba(255,255,255,.06)" stroke="white" strokeWidth="2"/>
      {/* 지붕 */}
      <path d="M8 28h48l-6-10H14l-6 10z" fill="rgba(255,255,255,.08)" stroke="white" strokeWidth="2" />
      {/* 어닝(차양) */}
      <path d="M12 28c0 6 6 6 8 0 2 6 8 6 10 0 2 6 8 6 10 0 2 6 8 6 10 0" stroke="white" strokeWidth="2" />
      {/* 문/창문 */}
      <rect x="18" y="36" width="12" height="12" rx="2" stroke="white" strokeWidth="2" />
      <rect x="34" y="36" width="12" height="12" rx="2" stroke="white" strokeWidth="2" />
      {/* 머그잔 */}
      <path d="M37 44h6a3 3 0 0 0 0-6h-6v6z" fill="white" />
      <path d="M37 44h6a3 3 0 0 0 0-6h-6v6z" stroke="white" strokeWidth="2"/>
      <path d="M40 37c0-2 2-2 2-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
