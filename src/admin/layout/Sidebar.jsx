import "./Sidebar.css";

const navigationGroups = [
  {
    title: "MONITORING",
    items: [
      { id: "dashboard", icon: "🛡️", label: "Dashboard" },
      { id: "threats", icon: "🚨", label: "Threats" },
      { id: "events", icon: "📡", label: "Events" },
      { id: "ip-reputation", icon: "🌐", label: "IP Risk" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { id: "simulator", icon: "🧪", label: "Simulator" },
      { id: "rules", icon: "⚙️", label: "Rules" },
      { id: "logs", icon: "📜", label: "Logs" },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      { id: "users", icon: "👥", label: "Users" },
      { id: "settings", icon: "⚙️", label: "Settings" },
    ],
  },
];

function Sidebar({ activeModule, sidebarOpen, onNavigate }) {
  return (
    <aside className={`admin-sidebar ${sidebarOpen ? "is-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">🛡️</div>

        <div>
          <div className="sidebar-brand-name">CyberSentinel</div>
          <div className="sidebar-brand-ai">AI SECURITY PLATFORM</div>
        </div>
      </div>

      <div className="sidebar-divider" />

      <nav className="sidebar-navigation">
        {navigationGroups.map((group) => (
          <div className="sidebar-group" key={group.title}>
            <div className="sidebar-group-title">{group.title}</div>

            <div className="sidebar-group-items">
              {group.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`sidebar-link ${
                    activeModule === item.id ? "active" : ""
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  <span className="sidebar-link-icon">{item.icon}</span>
                  <span>{item.label}</span>

                  {activeModule === item.id && (
                    <span className="sidebar-active-indicator" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-system-card">
          <div className="system-card-top">
            <span className="system-status-dot" />
            <span>System Online</span>
          </div>

          <p>Security monitoring services ready.</p>
        </div>

        <div className="sidebar-footer-text">
          CyberSentinel-AI
          <span>v1.0 Frontend</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;