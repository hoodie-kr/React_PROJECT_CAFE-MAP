import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 검증 로직 추가 가능
    // alert(`로그인 시도\nID: ${id}`);
    navigate("/menu");               // ✅ 로그인 후 이동
  };

  return (
    <AppShell>
      <div className="screen login-screen">
        <div className="auth-wrap">
          <form onSubmit={onSubmit} className="app-card app-card--gradient">
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: ".08em" }}>
                ZEBRA
              </div>
              <div style={{ fontSize: 13, opacity: .95, marginTop: 6 }}>
                로그인하고 카페 서비스를 즐겨보세요.
              </div>
            </div>

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
