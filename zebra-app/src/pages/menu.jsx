import { useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";

export default function Menu() {
  const nav = useNavigate();
  return (
    <AppShell>
      <div className="screen menu-screen">
        <div className="menu-card">
          <button className="btn" onClick={() => nav("/search")}>ZEBRA</button>             {/* ✅ 변경 */}
          <button className="btn" onClick={() => nav("/top")}>전국 TOP 카페</button>
        </div>
      </div>
    </AppShell>
  );
}
