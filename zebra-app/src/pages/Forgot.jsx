import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell.jsx";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 API 연결
    alert(`비밀번호 재설정 메일 전송: ${email}`);
  };

  return (
    <AppShell>
      <div className="screen">
        <div className="auth-wrap">
          <form onSubmit={onSubmit} className="app-card app-card--gradient app-card--tall">
            {/* 제목/부제 */}
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: ".08em" }}>
                ZEBRA
              </div>
              <div style={{ fontSize: 13, opacity: .95, marginTop: 6 }}>
                가입한 이메일로 재설정 링크를 보내드려요.
              </div>
            </div>

            {/* 입력 한 칸 */}
            <div className="input-row" style={{ marginTop: 12 }}>
              <input
                className="input"
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <button type="submit" className="btn" style={{ marginTop: 14 }}>
              메일 보내기
            </button>

            <div className="row-links">
              <Link to="/login">로그인으로 돌아가기</Link>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
