import { useEffect, useMemo, useState } from "react";
import "./HotPlaceCarousel.css";
import CAFES from "../data/cafes.js";

export default function HotPlaceCarousel({ items, interval = 3500, height = 300 }) {
  const data = useMemo(() => {
    const list = (items?.length ? items : CAFES)
      .filter((x) => x?.src)
      .map(({ src, name, loc }) => ({ src, title: name, caption: loc }));
    return list.slice(0, 12);
  }, [items]);

  const [i, setI] = useState(0);

  useEffect(() => {
    if (!data.length) return;
    const id = setInterval(() => setI((p) => (p + 1) % data.length), interval);
    return () => clearInterval(id);
  }, [data.length, interval]);

  const prev = () => setI((p) => (p - 1 + data.length) % data.length);
  const next = () => setI((p) => (p + 1) % data.length);

  return (
    <div className="hot-carousel" style={{ height }}>
      {data.map((it, idx) => (
        <div
          key={idx}
          className={`slide ${idx === i ? "active" : ""}`}
          style={{ backgroundImage: `url(${it.src})` }}
          aria-hidden={idx !== i}
        >
          <div className="overlay">
            <div className="title">{it.title}</div>
            <div className="caption">{it.caption}</div>
          </div>
        </div>
      ))}
      <button className="nav prev" onClick={prev} aria-label="이전">‹</button>
      <button className="nav next" onClick={next} aria-label="다음">›</button>
      <div className="dots">
        {data.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === i ? "on" : ""}`}
            onClick={() => setI(idx)}
            aria-label={`${idx + 1}번 슬라이드`}
          />
        ))}
      </div>
    </div>
  );
}
