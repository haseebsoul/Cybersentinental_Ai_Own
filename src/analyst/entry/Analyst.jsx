import { useState } from "react";

import AddIncident from "../add/AddIncident";
import UpdateIncident from "../update/UpdateIncident";
import DeleteIncident from "../delete/DeleteIncident";
import ReviewIncidents from "../review/ReviewIncidents";

import { getSession, endSession } from "../../auth/session/SessionManager";
import { guardRole, ROLES } from "../../auth/role-guard/RoleGuard";

import "./Analyst.css";

const initialIncidents = [
  {
    id: 1,
    title: "Repeated Login Failures",
    severity: "High",
    category: "Brute Force",
    sourceIP: "192.168.10.24",
    status: "Investigating",
    description: "Multiple failed authentication requests detected.",
  },
  {
    id: 2,
    title: "Suspicious SQL Request",
    severity: "Critical",
    category: "SQL Injection",
    sourceIP: "10.20.5.44",
    status: "Open",
    description: "Suspicious database query pattern detected.",
  },
  {
    id: 3,
    title: "Unusual API Activity",
    severity: "Medium",
    category: "Suspicious Activity",
    sourceIP: "172.16.0.51",
    status: "Resolved",
    description: "Unexpected request frequency observed.",
  },
];

function Analyst() {
  const session = getSession();

  const [incidents, setIncidents] = useState(initialIncidents);
  const [activeTab, setActiveTab] = useState("review");

  if (!guardRole([ROLES.ANALYST])) {
    return null;
  }

  const handleAddIncident = (incidentData) => {
    const newIncident = {
      id: Date.now(),
      ...incidentData,
    };

    setIncidents((current) => [...current, newIncident]);
    setActiveTab("review");
  };

  const handleUpdateIncident = (incidentId, updatedData) => {
    setIncidents((current) =>
      current.map((incident) =>
        incident.id === incidentId
          ? {
              ...incident,
              ...updatedData,
            }
          : incident
      )
    );

    setActiveTab("review");
  };

  const handleDeleteIncident = (incidentId) => {
    setIncidents((current) =>
      current.filter((incident) => incident.id !== incidentId)
    );

    setActiveTab("review");
  };

  const handleLogout = () => {
    endSession();
    window.location.replace("/login");
  };

  return (
    <main className="analyst-page">
      <div className="analyst-shell">
        <header className="analyst-topbar">
          <div>
            <span className="analyst-brand">CYBERSENTINEL-AI</span>
            <span className="analyst-role">SOC SECURITY ANALYST</span>
          </div>

          <div className="analyst-user">
            <div className="analyst-user-info">
              <strong>{session?.name}</strong>
              <span>{session?.email}</span>
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </header>

        <section className="analyst-intro">
          <span className="analyst-eyebrow">SECURITY OPERATIONS</span>

          <h1>SOC Analyst Workspace</h1>

          <p>
            Monitor, investigate, and manage security incidents through
            one shared workspace designed for security operations.
          </p>
        </section>

        <nav
          className="nav nav-pills gap-2 flex-wrap mb-4"
          aria-label="SOC analyst operations"
        >
          <button
            type="button"
            className={`nav-link ${
              activeTab === "review" ? "active" : ""
            }`}
            onClick={() => setActiveTab("review")}
          >
            Review Incidents
          </button>

          <button
            type="button"
            className={`nav-link ${
              activeTab === "add" ? "active" : ""
            }`}
            onClick={() => setActiveTab("add")}
          >
            Add Incident
          </button>

          <button
            type="button"
            className={`nav-link ${
              activeTab === "update" ? "active" : ""
            }`}
            onClick={() => setActiveTab("update")}
          >
            Update Incident
          </button>

          <button
            type="button"
            className={`nav-link ${
              activeTab === "delete" ? "active" : ""
            }`}
            onClick={() => setActiveTab("delete")}
          >
            Delete Incident
          </button>
        </nav>

        <section className="analyst-content">
          {activeTab === "add" && (
            <AddIncident
              incidents={incidents}
              onAddIncident={handleAddIncident}
            />
          )}

          {activeTab === "update" && (
            <UpdateIncident
              incidents={incidents}
              onUpdateIncident={handleUpdateIncident}
            />
          )}

          {activeTab === "delete" && (
            <DeleteIncident
              incidents={incidents}
              onDeleteIncident={handleDeleteIncident}
            />
          )}

          {activeTab === "review" && (
            <ReviewIncidents incidents={incidents} />
          )}
        </section>
      </div>
    </main>
  );
}

export default Analyst;