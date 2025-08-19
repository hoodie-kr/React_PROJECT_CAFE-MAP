import { useEffect, useRef, useState } from "react";

export default function CafeSlider({ items = [], interval = 2500, height = 180 }) {
  const [i, setI] = useState(0);
  const t = useRef(null);
  const len = items.length;

  // 오토플레이
  useEffect(() => {
    if (len <= 1) return;
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, len]);

  const start = () => {
    stop();
    t.current = setTimeout(() => setI((i + 1) % len), interval);
  };
  const stop = () => t.current && clearTimeout(t.current);

  if (!len) return null;

  return (
    <div className="cafe-slider" style={{ height }} onMouseEnter={stop} onMouseLeave={start}>
      <div className="slides" style={{ transform: `translateX(-${i * 100}%)` }}>
        {items.map((it, idx) => (
          <div className="slide" key={idx}>
            <img src={it.src} alt={it.name} />
            <div className="caption">
              <span className="name">{it.name}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="nav prev" aria-label="prev" onClick={() => setI((i - 1 + len) % len)}>‹</button>
      <button className="nav next" aria-label="next" onClick={() => setI((i + 1) % len)}>›</button>

      <div className="dots">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === i ? "is-active" : ""}`}
            onClick={() => setI(idx)}
            aria-label={`slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
