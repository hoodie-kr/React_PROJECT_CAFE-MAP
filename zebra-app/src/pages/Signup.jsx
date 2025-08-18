import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";
// import CafeStoreIcon from "../components/icons/CafeStoreIcon.jsx";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (pw !== pw2) return alert("비밀번호가 일치하지 않습니다.");
    alert(`회원가입 시도\nEmail: ${email}`);
  };

  return (
    <AppShell>
      <div className="screen screen--centered">
        <div className="auth-wrap">
          <form onSubmit={onSubmit} className="app-card app-card--gradient app-card--tall">
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: ".08em" }}>
                ZEBRA
            </div>
              <div style={{ fontSize: 13, opacity: .95, marginTop: 6 }}>
                간단한 정보로 바로 시작해요.
              </div>
            </div>

            {/* 아이콘 사용 시
            <div style={{ display:"grid", placeItems:"center", margin: "8px 0 14px" }}>
              <CafeStoreIcon size={50} />
            </div>
            */}

            <div className="input-row" style={{ marginTop: 12 }}>
              <input
                className="input"
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <input
                className="input"
                type="password"
                placeholder="비밀번호"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                autoComplete="new-password"
              />
              <input
                className="input"
                type="password"
                placeholder="비밀번호 확인"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn" style={{ marginTop: 14 }}>
              회원가입
            </button>

            <div className="row-links">
              <Link to="/login">이미 계정이 있으신가요? 로그인</Link>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
