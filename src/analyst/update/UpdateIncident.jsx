import { useEffect, useState } from "react";
import "./UpdateIncident.css";

function UpdateIncident({ incidents, onUpdateIncident }) {
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    severity: "Medium",
    category: "Suspicious Activity",
    sourceIP: "",
    status: "Open",
    description: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (incidents.length === 0) {
      return;
    }

    const firstIncident = incidents[0];

    setSelectedId(String(firstIncident.id));
    setFormData({
      title: firstIncident.title,
      severity: firstIncident.severity,
      category: firstIncident.category,
      sourceIP: firstIncident.sourceIP,
      status: firstIncident.status,
      description: firstIncident.description,
    });
  }, [incidents]);

  const handleSelectIncident = (event) => {
    const id = event.target.value;

    setSelectedId(id);
    setMessage("");

    const incident = incidents.find(
      (item) => String(item.id) === id
    );

    if (!incident) {
      return;
    }

    setFormData({
      title: incident.title,
      severity: incident.severity,
      category: incident.category,
      sourceIP: incident.sourceIP,
      status: incident.status,
      description: incident.description,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedId) {
      setMessage("Please select an incident.");
      return;
    }

    onUpdateIncident(Number(selectedId), {
      title: formData.title.trim(),
      severity: formData.severity,
      category: formData.category,
      sourceIP: formData.sourceIP.trim(),
      status: formData.status,
      description: formData.description.trim(),
    });
  };

  return (
    <div className="incident-tab-panel">
      <div className="incident-header">
        <span className="incident-eyebrow">
          SOC OPERATIONS · UPDATE INCIDENT
        </span>

        <h1>Update a security incident</h1>

        <p>
          Modify incident information as investigation findings or
          security conditions change.
        </p>
      </div>

      <div className="incident-card">
        <div className="incident-field">
          <label htmlFor="update-incident-selector">
            Select incident
          </label>

          <select
            id="update-incident-selector"
            value={selectedId}
            onChange={handleSelectIncident}
          >
            {incidents.map((incident) => (
              <option key={incident.id} value={incident.id}>
                {incident.title} — {incident.severity}
              </option>
            ))}
          </select>
        </div>

        <div className="incident-divider"></div>

        <form className="incident-form" onSubmit={handleSubmit}>
          <div className="incident-grid">
            <div className="incident-field">
              <label htmlFor="update-incident-title">
                Incident title
              </label>

              <input
                id="update-incident-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="incident-field">
              <label htmlFor="update-incident-ip">
                Source IP address
              </label>

              <input
                id="update-incident-ip"
                name="sourceIP"
                value={formData.sourceIP}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="incident-grid">
            <div className="incident-field">
              <label htmlFor="update-incident-severity">
                Severity
              </label>

              <select
                id="update-incident-severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div className="incident-field">
              <label htmlFor="update-incident-category">
                Category
              </label>

              <select
                id="update-incident-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Suspicious Activity</option>
                <option>Brute Force</option>
                <option>Malware</option>
                <option>SQL Injection</option>
                <option>Unauthorized Access</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="incident-field">
            <label htmlFor="update-incident-status">
              Status
            </label>

            <select
              id="update-incident-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Open</option>
              <option>Investigating</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>

          <div className="incident-field">
            <label htmlFor="update-incident-description">
              Description
            </label>

            <textarea
              id="update-incident-description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {message && (
            <div className="incident-message incident-message-error">
              {message}
            </div>
          )}

          <div className="incident-actions">
            <span className="incident-record-count">
              Available incidents: <strong>{incidents.length}</strong>
            </span>

            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={incidents.length === 0}
            >
              Update Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateIncident;