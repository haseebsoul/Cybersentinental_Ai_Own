import { useState } from "react";
import ThreatBadge from "../shared/ThreatBadge";
import SecurityTable from "../shared/SecurityTable";
import "./IPReputation.css";

const ipData = [
  {
    id: "IP-001",
    ip: "192.168.7.91",
    risk: 97,
    level: "Critical",
    threats: 22,
    blocked: 19,
    lastSeen: "2 min ago",
  },
  {
    id: "IP-002",
    ip: "192.168.1.24",
    risk: 91,
    level: "High",
    threats: 18,
    blocked: 16,
    lastSeen: "4 min ago",
  },
  {
    id: "IP-003",
    ip: "172.16.4.7",
    risk: 83,
    level: "High",
    threats: 14,
    blocked: 9,
    lastSeen: "8 min ago",
  },
  {
    id: "IP-004",
    ip: "10.24.8.19",
    risk: 68,
    level: "Medium",
    threats: 9,
    blocked: 7,
    lastSeen: "12 min ago",
  },
  {
    id: "IP-005",
    ip: "10.8.4.22",
    risk: 51,
    level: "Medium",
    threats: 6,
    blocked: 2,
    lastSeen: "19 min ago",
  },
];

function IPReputation() {
  const [search, setSearch] = useState("");

  const filtered = ipData.filter((item) =>
    item.ip.includes(search.trim())
  );

  const rows = filtered.map((item) => ({
    id: item.id,
    ip: (
      <div className="ip-primary">
        <strong>{item.ip}</strong>
        <span>Observed source</span>
      </div>
    ),
    risk: (
      <div className="ip-risk-cell">
        <strong>{item.risk}/100</strong>
        <div className="risk-mini-track">
          <span style={{ width: `${item.risk}%` }} />
        </div>
      </div>
    ),
    level: (
      <ThreatBadge variant={item.level.toLowerCase()}>
        {item.level}
      </ThreatBadge>
    ),
    threats: item.threats,
    blocked: item.blocked,
    lastSeen: item.lastSeen,
  }));

  const columns = [
    { key: "ip", label: "Source IP" },
    { key: "risk", label: "Risk Score" },
    { key: "level", label: "Risk Level" },
    { key: "threats", label: "Threats" },
    { key: "blocked", label: "Blocked" },
    { key: "lastSeen", label: "Last Seen" },
  ];

  return (
    <section className="ip-module">
      <div className="ip-hero">
        <div>
          <span className="panel-kicker">SOURCE INTELLIGENCE</span>
          <h2>IP Risk & Reputation Analysis</h2>
          <p>
            Review observed source activity and identify IP addresses that
            require investigation.
          </p>
        </div>

        <div className="ip-search">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search IP address..."
          />
        </div>
      </div>

      <div className="ip-summary-grid">
        <div>
          <span>Tracked IPs</span>
          <strong>1,284</strong>
        </div>

        <div>
          <span>High Risk</span>
          <strong>73</strong>
        </div>

        <div>
          <span>Blocked Sources</span>
          <strong>41</strong>
        </div>

        <div>
          <span>Under Review</span>
          <strong>19</strong>
        </div>
      </div>

      <div className="ip-table-panel">
        <div className="ip-table-header">
          <div>
            <span className="panel-kicker">RISK INTELLIGENCE</span>
            <h2>Observed IP Sources</h2>
          </div>

          <button type="button" className="btn ip-export-button">
            Export
          </button>
        </div>

        <SecurityTable
          columns={columns}
          rows={rows}
          emptyMessage="No IP addresses found."
        />
      </div>
    </section>
  );
}

export default IPReputation;