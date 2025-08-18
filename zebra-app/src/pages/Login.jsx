import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
// 아이콘 쓰면 경로 맞추고, 없다면 이 줄은 지워도 됩니다.
// import CafeStoreIcon from "../components/icons/CafeStoreIcon.jsx";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`로그인 시도\nID: ${id}`);
  };

  return (
    <AppShell>
      {/* ⬇︎ 화면 중앙에만 카드 하나; '밑에 튀어나오는 바' 원인은 이전에 있던 빈 <div/> 였습니다. */}
      <div className="screen screen--centered">
        <div className="auth-wrap">
          <form onSubmit={onSubmit} className="app-card app-card--gradient app-card--tall">
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: ".08em" }}>
                CAFE
              </div>
              <div style={{ fontSize: 13, opacity: .95, marginTop: 6 }}>
                로그인하고 카페 서비스를 즐겨보세요.
              </div>
            </div>

            {/* 아이콘을 쓰고 싶으면 주석 해제
            <div style={{ display:"grid", placeItems:"center", margin: "8px 0 14px" }}>
              <CafeStoreIcon size={56} />
            </div>
            */}

            <div className="input-row" style={{ marginTop: 12 }}>
              <input
                className="input"
                type="email"
                placeholder="아이디   example@zebra.com"
                value={id}
                onChange={(e) => setId(e.target.value)}
                autoComplete="username"
              />
              <input
                className="input"
                type="password"
                placeholder="비밀번호   ••••••••"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn" style={{ marginTop: 14 }}>
              로그인
            </button>

            <div className="row-links">
              <a href="#">비밀번호 찾기</a>
              <span>·</span>
              <Link to="/signup">회원가입</Link>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
