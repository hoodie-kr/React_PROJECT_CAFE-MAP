export default function AppShell({ children }) {
  return (
    <div className="stage">
      <div className="phone-shell">
        {/* header/toolbar 필요하면 여기 추가 */}
        <div className="screen">
          {children}   {/* ❗ children이 반드시 렌더되어야 함 */}
        </div>
      </div>
    </div>
  );
}
