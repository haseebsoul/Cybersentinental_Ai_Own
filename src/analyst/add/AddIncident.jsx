import { useState } from "react";
import "./AddIncident.css";

function AddIncident({ incidents, onAddIncident }) {
  const [formData, setFormData] = useState({
    title: "",
    severity: "Medium",
    category: "Suspicious Activity",
    sourceIP: "",
    status: "Open",
    description: "",
  });

  const [message, setMessage] = useState("");

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

    if (
      !formData.title.trim() ||
      !formData.sourceIP.trim() ||
      !formData.description.trim()
    ) {
      setMessage("Please complete all required fields.");
      return;
    }

    const duplicate = incidents.some(
      (incident) =>
        incident.title.toLowerCase() ===
        formData.title.trim().toLowerCase()
    );

    if (duplicate) {
      setMessage("An incident with this title already exists.");
      return;
    }

    onAddIncident({
      title: formData.title.trim(),
      severity: formData.severity,
      category: formData.category,
      sourceIP: formData.sourceIP.trim(),
      status: formData.status,
      description: formData.description.trim(),
    });

    setFormData({
      title: "",
      severity: "Medium",
      category: "Suspicious Activity",
      sourceIP: "",
      status: "Open",
      description: "",
    });

    setMessage("");
  };

  return (
    <div className="incident-tab-panel">
      <div className="incident-header">
        <span className="incident-eyebrow">
          SOC OPERATIONS · ADD INCIDENT
        </span>

        <h1>Add a security incident</h1>

        <p>
          Create a new incident record so the security team can document,
          monitor, and investigate suspicious activity.
        </p>
      </div>

      <div className="incident-card">
        <div className="incident-card-heading">
          <h2>Incident details</h2>
          <p>
            Enter the information required to create a security incident.
          </p>
        </div>

        <form className="incident-form" onSubmit={handleSubmit}>
          <div className="incident-grid">
            <div className="incident-field">
              <label htmlFor="incident-title">
                Incident title
              </label>

              <input
                id="incident-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Repeated login failures"
              />
            </div>

            <div className="incident-field">
              <label htmlFor="incident-source-ip">
                Source IP address
              </label>

              <input
                id="incident-source-ip"
                name="sourceIP"
                type="text"
                value={formData.sourceIP}
                onChange={handleChange}
                placeholder="Example: 192.168.1.10"
              />
            </div>
          </div>

          <div className="incident-grid">
            <div className="incident-field">
              <label htmlFor="incident-severity">
                Severity
              </label>

              <select
                id="incident-severity"
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
              <label htmlFor="incident-category">
                Category
              </label>

              <select
                id="incident-category"
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
            <label htmlFor="incident-status">
              Status
            </label>

            <select
              id="incident-status"
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
            <label htmlFor="incident-description">
              Description
            </label>

            <textarea
              id="incident-description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the detected security activity..."
            />
          </div>

          {message && (
            <div className="incident-message incident-message-error">
              {message}
            </div>
          )}

          <div className="incident-actions">
            <span className="incident-record-count">
              Current incidents: <strong>{incidents.length}</strong>
            </span>

            <button
              type="submit"
              className="btn btn-primary px-4"
            >
              Add Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIncident;