import "./ReviewIncidents.css";

function ReviewIncidents({ incidents }) {
  const criticalCount = incidents.filter(
    (incident) => incident.severity === "Critical"
  ).length;

  const highCount = incidents.filter(
    (incident) => incident.severity === "High"
  ).length;

  const openCount = incidents.filter(
    (incident) =>
      incident.status === "Open" ||
      incident.status === "Investigating"
  ).length;

  const getSeverityClass = (severity) => {
    return `incident-badge incident-${severity.toLowerCase()}`;
  };

  const getStatusClass = (status) => {
    return `incident-status incident-status-${status
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  return (
    <div className="incident-tab-panel">
      <div className="incident-header">
        <span className="incident-eyebrow">
          SOC OPERATIONS · REVIEW INCIDENTS
        </span>

        <h1>Review security incidents</h1>

        <p>
          Review active and historical incident records to understand
          current security activity across the CyberSentinel-AI platform.
        </p>
      </div>

      <section className="incident-stats">
        <article className="incident-stat-card">
          <span>Total incidents</span>
          <strong>{incidents.length}</strong>
        </article>

        <article className="incident-stat-card">
          <span>Critical</span>
          <strong>{criticalCount}</strong>
        </article>

        <article className="incident-stat-card">
          <span>High severity</span>
          <strong>{highCount}</strong>
        </article>

        <article className="incident-stat-card">
          <span>Open / investigating</span>
          <strong>{openCount}</strong>
        </article>
      </section>

      <section className="incident-table-card">
        <div className="incident-table-heading">
          <div>
            <h2>Incident directory</h2>

            <p>
              Current incident records shared across all SOC operations.
            </p>
          </div>
        </div>

        <div className="incident-table-wrapper">
          <table className="incident-table">
            <thead>
              <tr>
                <th>Incident</th>
                <th>Source IP</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Category</th>
              </tr>
            </thead>

            <tbody>
              {incidents.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="incident-empty"
                  >
                    No security incidents are currently available.
                  </td>
                </tr>
              ) : (
                incidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>
                      <strong>{incident.title}</strong>
                    </td>

                    <td className="incident-ip">
                      {incident.sourceIP}
                    </td>

                    <td>
                      <span
                        className={getSeverityClass(
                          incident.severity
                        )}
                      >
                        {incident.severity}
                      </span>
                    </td>

                    <td>
                      <span
                        className={getStatusClass(
                          incident.status
                        )}
                      >
                        {incident.status}
                      </span>
                    </td>

                    <td>{incident.category}</td>
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

export default ReviewIncidents;