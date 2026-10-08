import { useState } from "react";
import "./Simulator.css";

const attackTypes = [
  {
    id: "sql-injection",
    icon: "🧬",
    title: "SQL Injection",
    description: "Test request patterns associated with SQL injection.",
  },
  {
    id: "xss",
    icon: "⚡",
    title: "Cross-Site Scripting",
    description: "Test suspicious script patterns against WAF rules.",
  },
  {
    id: "path-traversal",
    icon: "📂",
    title: "Path Traversal",
    description: "Test requests attempting directory traversal.",
  },
  {
    id: "burst",
    icon: "📈",
    title: "Burst Traffic",
    description: "Simulate abnormal request frequency for IDS analysis.",
  },
];

function Simulator() {
  const [selectedAttack, setSelectedAttack] = useState("sql-injection");
  const [target, setTarget] = useState("/api/test-endpoint");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const runSimulation = () => {
    setRunning(true);
    setResult(null);

    setTimeout(() => {
      const attack = attackTypes.find(
        (item) => item.id === selectedAttack
      );

      const resultData = {
        attack: attack.title,
        riskScore:
          selectedAttack === "path-traversal"
            ? 97
            : selectedAttack === "sql-injection"
              ? 91
              : selectedAttack === "burst"
                ? 83
                : 76,
        action:
          selectedAttack === "burst" ? "FLAGGED" : "BLOCKED",
        engine:
          selectedAttack === "burst" ? "WAF + IDS" : "WAF",
      };

      setResult(resultData);
      setRunning(false);
    }, 900);
  };

  return (
    <section className="simulator-module">
      <div className="simulator-warning">
        <span>🧪</span>
        <div>
          <strong>Controlled simulation environment</strong>
          <p>
            This frontend simulator generates demonstration results only.
            It does not send attacks to external websites.
          </p>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-8">
          <div className="simulator-panel">
            <div className="simulator-panel-header">
              <div>
                <span className="panel-kicker">SCENARIO BUILDER</span>
                <h2>Select Security Scenario</h2>
              </div>

              <span className="simulator-environment">
                Demo Lab
              </span>
            </div>

            <div className="attack-grid">
              {attackTypes.map((attack) => (
                <button
                  type="button"
                  key={attack.id}
                  className={`attack-card ${
                    selectedAttack === attack.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAttack(attack.id)}
                >
                  <span className="attack-icon">{attack.icon}</span>
                  <strong>{attack.title}</strong>
                  <small>{attack.description}</small>
                </button>
              ))}
            </div>

            <div className="simulation-form">
              <label htmlFor="targetEndpoint">
                Target test endpoint
              </label>

              <input
                id="targetEndpoint"
                type="text"
                value={target}
                onChange={(event) => setTarget(event.target.value)}
              />

              <button
                type="button"
                className="btn run-simulation-button"
                onClick={runSimulation}
                disabled={running}
              >
                {running ? "Analyzing Scenario..." : "Run Simulation"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="simulator-result-panel h-100">
            <span className="panel-kicker">ANALYSIS RESULT</span>
            <h2>Detection Output</h2>

            {!result && !running && (
              <div className="empty-simulation">
                <div>🛡️</div>
                <strong>Ready for simulation</strong>
                <p>
                  Choose a controlled scenario and run the analysis.
                </p>
              </div>
            )}

            {running && (
              <div className="simulation-running">
                <div className="simulation-spinner" />
                <strong>Security engines analyzing...</strong>
                <p>WAF → IDS → Risk Analysis</p>
              </div>
            )}

            {result && !running && (
              <div className="simulation-result">
                <div className="result-top">
                  <span>Scenario</span>
                  <strong>{result.attack}</strong>
                </div>

                <div className="result-score">
                  <div>
                    <span>Risk Score</span>
                    <strong>{result.riskScore}/100</strong>
                  </div>

                  <div
                    className="score-ring"
                    style={{
                      background: `conic-gradient(#ef4444 ${result.riskScore}%, #e2e8f0 0)`,
                    }}
                  >
                    <div>{result.riskScore}</div>
                  </div>
                </div>

                <div className="result-row">
                  <span>Detection Engine</span>
                  <strong>{result.engine}</strong>
                </div>

                <div className="result-row">
                  <span>Action</span>
                  <strong className="result-action">
                    {result.action}
                  </strong>
                </div>

                <div className="result-row">
                  <span>Target</span>
                  <strong>{target}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Simulator;