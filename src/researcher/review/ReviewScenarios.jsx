import "./ReviewScenarios.css";

function ReviewScenarios({ scenarios }) {
  const criticalCount = scenarios.filter(
    (scenario) => scenario.severity === "Critical"
  ).length;

  const highCount = scenarios.filter(
    (scenario) => scenario.severity === "High"
  ).length;

  const runningCount = scenarios.filter(
    (scenario) => scenario.status === "Running"
  ).length;

  const completedCount = scenarios.filter(
    (scenario) => scenario.status === "Completed"
  ).length;

  const getSeverityClass = (severity) => {
    return `scenario-badge scenario-${severity.toLowerCase()}`;
  };

  const getStatusClass = (status) => {
    return `scenario-status scenario-status-${status
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  return (
    <div className="scenario-tab-panel">
      <div className="scenario-header">
        <span className="scenario-eyebrow">
          RESEARCH OPERATIONS · REVIEW SCENARIOS
        </span>

        <h1>Review simulation scenarios</h1>

        <p>
          Review research scenarios, testing objectives, severity levels,
          and execution status across the CyberSentinel-AI platform.
        </p>
      </div>

      <section className="scenario-stats">
        <article className="scenario-stat-card">
          <span>Total scenarios</span>
          <strong>{scenarios.length}</strong>
        </article>

        <article className="scenario-stat-card">
          <span>Critical</span>
          <strong>{criticalCount}</strong>
        </article>

        <article className="scenario-stat-card">
          <span>High severity</span>
          <strong>{highCount}</strong>
        </article>

        <article className="scenario-stat-card">
          <span>Running / completed</span>
          <strong>
            {runningCount + completedCount}
          </strong>
        </article>
      </section>

      <section className="scenario-table-card">
        <div className="scenario-table-heading">
          <div>
            <h2>Simulation scenario directory</h2>

            <p>
              Current research scenarios shared across all
              Researcher CRUD operations.
            </p>
          </div>
        </div>

        <div className="scenario-table-wrapper">
          <table className="scenario-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Type</th>
                <th>Target</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {scenarios.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="scenario-empty"
                  >
                    No simulation scenarios are currently available.
                  </td>
                </tr>
              ) : (
                scenarios.map((scenario) => (
                  <tr key={scenario.id}>
                    <td>
                      <strong>{scenario.name}</strong>
                    </td>

                    <td>
                      {scenario.attackType}
                    </td>

                    <td>
                      {scenario.target}
                    </td>

                    <td>
                      <span
                        className={getSeverityClass(
                          scenario.severity
                        )}
                      >
                        {scenario.severity}
                      </span>
                    </td>

                    <td>
                      <span
                        className={getStatusClass(
                          scenario.status
                        )}
                      >
                        {scenario.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ReviewScenarios;