import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
import MiniMapHero from "../components/MiniMapHero.jsx";

export default function Home() {
  const nav = useNavigate();

  return (
    <AppShell>
      <div className="screen">
        <div style={{ display:"grid", placeItems:"center", textAlign:"center" }}>
          <div>
            <h1 className="brand-title">ZEBRA</h1>
            <p style={{ marginTop: 10, color: "#475569" }}>
              카페 지도를 더 쉽게. 지금 시작해보세요.
            </p>

            {/* ⬇️ 여기만 바뀜 */}
            <div style={{ marginTop: 24 }}>
              <MiniMapHero />
            </div>
          </div>
        </div>

        <div>
          <button className="btn" onClick={() => nav("/login")}>시작하기</button>
          <div style={{ marginTop: 10, fontSize: 12, color: "#64748b", textAlign: "center" }}>
            계속하면 이용약관과 개인정보처리방침에 동의하게 됩니다.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
