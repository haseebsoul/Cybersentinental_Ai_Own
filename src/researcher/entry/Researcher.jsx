import { useState } from "react";

import AddScenario from "../add/AddScenario";
import UpdateScenario from "../update/UpdateScenario";
import DeleteScenario from "../delete/DeleteScenario";
import ReviewScenarios from "../review/ReviewScenarios";

import { getSession, endSession } from "../../auth/session/SessionManager";
import { guardRole, ROLES } from "../../auth/role-guard/RoleGuard";

import "./Researcher.css";

const initialScenarios = [
  {
    id: 1,
    name: "Authentication Injection Test",
    attackType: "SQL Injection",
    severity: "High",
    target: "Authentication API",
    status: "Ready",
    description: "Controlled testing scenario for authentication inputs.",
  },
  {
    id: 2,
    name: "Brute Force Detection Test",
    attackType: "Brute Force",
    severity: "Critical",
    target: "Login Service",
    status: "Running",
    description: "Controlled repeated-login simulation for detection testing.",
  },
  {
    id: 3,
    name: "Suspicious Request Analysis",
    attackType: "Suspicious Request",
    severity: "Medium",
    target: "Public API",
    status: "Completed",
    description: "Research scenario for analysing unusual API activity.",
  },
];

function Researcher() {
  const session = getSession();

  const [scenarios, setScenarios] = useState(initialScenarios);
  const [activeTab, setActiveTab] = useState("review");

  if (!guardRole([ROLES.RESEARCHER])) {
    return null;
  }

  const handleAddScenario = (scenarioData) => {
    const newScenario = {
      id: Date.now(),
      ...scenarioData,
    };

    setScenarios((current) => [...current, newScenario]);
    setActiveTab("review");
  };

  const handleUpdateScenario = (scenarioId, updatedData) => {
    setScenarios((current) =>
      current.map((scenario) =>
        scenario.id === scenarioId
          ? {
              ...scenario,
              ...updatedData,
            }
          : scenario
      )
    );

    setActiveTab("review");
  };

  const handleDeleteScenario = (scenarioId) => {
    setScenarios((current) =>
      current.filter((scenario) => scenario.id !== scenarioId)
    );

    setActiveTab("review");
  };

  const handleLogout = () => {
    endSession();
    window.location.replace("/login");
  };

  return (
    <main className="researcher-page">
      <div className="researcher-shell">
        <header className="researcher-topbar">
          <div>
            <span className="researcher-brand">
              CYBERSENTINEL-AI
            </span>

            <span className="researcher-role">
              SECURITY RESEARCHER
            </span>
          </div>

          <div className="researcher-user">
            <div className="researcher-user-info">
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

        <section className="researcher-intro">
          <span className="researcher-eyebrow">
            RESEARCH OPERATIONS
          </span>

          <h1>Security Research Workspace</h1>

          <p>
            Create, evaluate, and manage controlled security simulation
            scenarios for defensive research and experimentation.
          </p>
        </section>

        <nav
          className="nav nav-pills gap-2 flex-wrap mb-4"
          aria-label="Researcher operations"
        >
          <button
            type="button"
            className={`nav-link ${
              activeTab === "review" ? "active" : ""
            }`}
            onClick={() => setActiveTab("review")}
          >
            Review Scenarios
          </button>

          <button
            type="button"
            className={`nav-link ${
              activeTab === "add" ? "active" : ""
            }`}
            onClick={() => setActiveTab("add")}
          >
            Add Scenario
          </button>

          <button
            type="button"
            className={`nav-link ${
              activeTab === "update" ? "active" : ""
            }`}
            onClick={() => setActiveTab("update")}
          >
            Update Scenario
          </button>

          <button
            type="button"
            className={`nav-link ${
              activeTab === "delete" ? "active" : ""
            }`}
            onClick={() => setActiveTab("delete")}
          >
            Delete Scenario
          </button>
        </nav>

        <section className="researcher-content">
          {activeTab === "add" && (
            <AddScenario
              scenarios={scenarios}
              onAddScenario={handleAddScenario}
            />
          )}

          {activeTab === "update" && (
            <UpdateScenario
              scenarios={scenarios}
              onUpdateScenario={handleUpdateScenario}
            />
          )}

          {activeTab === "delete" && (
            <DeleteScenario
              scenarios={scenarios}
              onDeleteScenario={handleDeleteScenario}
            />
          )}

          {activeTab === "review" && (
            <ReviewScenarios scenarios={scenarios} />
          )}
        </section>
      </div>
    </main>
  );
}

export default Researcher;