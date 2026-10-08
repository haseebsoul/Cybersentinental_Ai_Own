import "./Topbar.css";

function Topbar({
  session,
  pageTitle,
  onMenuClick,
  onLogout,
}) {
  return (
    <header className="admin-topbar sticky-top">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          ☰
        </button>

        <div className="topbar-page-title">
          {pageTitle}
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-live">
          <span className="topbar-live-dot" />
          Monitoring Active
        </div>

        <button
          type="button"
          className="topbar-icon-button"
          aria-label="Notifications"
        >
          🔔
          <span className="notification-dot" />
        </button>

        <div className="topbar-user">
          <div className="topbar-user-avatar">
            A
          </div>

          <div className="topbar-user-info">
            <strong>
              {session?.name || "System Administrator"}
            </strong>

            <span>
              {session?.role || "Administrator"}
            </span>
          </div>

          <button
            type="button"
            className="topbar-logout"
            onClick={onLogout}
            title="End session"
            aria-label="End session"
          >
            ⇥
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;