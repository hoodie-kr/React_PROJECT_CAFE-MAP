export default function AppShell({ children }) {
  return (
    <div className="stage">
      <div className="phone-shell">
        {children}
      </div>
    </div>
  );
}
