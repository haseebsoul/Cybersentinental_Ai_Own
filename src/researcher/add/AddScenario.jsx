import { useState } from "react";
import "./AddScenario.css";

function AddScenario({ scenarios, onAddScenario }) {
  const [formData, setFormData] = useState({
    name: "",
    attackType: "SQL Injection",
    severity: "Medium",
    target: "",
    status: "Draft",
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
      !formData.name.trim() ||
      !formData.target.trim() ||
      !formData.description.trim()
    ) {
      setMessage("Please complete all required fields.");
      return;
    }

    const duplicate = scenarios.some(
      (scenario) =>
        scenario.name.toLowerCase() ===
        formData.name.trim().toLowerCase()
    );

    if (duplicate) {
      setMessage("A scenario with this name already exists.");
      return;
    }

    onAddScenario({
      name: formData.name.trim(),
      attackType: formData.attackType,
      severity: formData.severity,
      target: formData.target.trim(),
      status: formData.status,
      description: formData.description.trim(),
    });

    setFormData({
      name: "",
      attackType: "SQL Injection",
      severity: "Medium",
      target: "",
      status: "Draft",
      description: "",
    });

    setMessage("");
  };

  return (
    <div className="scenario-tab-panel">
      <div className="scenario-header">
        <span className="scenario-eyebrow">
          RESEARCH OPERATIONS · ADD SCENARIO
        </span>

        <h1>Create a simulation scenario</h1>

        <p>
          Define a controlled security scenario for testing defensive
          behaviour and evaluating CyberSentinel-AI responses.
        </p>
      </div>

      <div className="scenario-card">
        <div className="scenario-card-heading">
          <h2>Scenario details</h2>
          <p>
            Enter the information required to create a research scenario.
          </p>
        </div>

        <form className="scenario-form" onSubmit={handleSubmit}>
          <div className="scenario-grid">
            <div className="scenario-field">
              <label htmlFor="scenario-name">
                Scenario name
              </label>

              <input
                id="scenario-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Login Injection Test"
              />
            </div>

            <div className="scenario-field">
              <label htmlFor="scenario-target">
                Target application
              </label>

              <input
                id="scenario-target"
                name="target"
                type="text"
                value={formData.target}
                onChange={handleChange}
                placeholder="Example: Authentication API"
              />
            </div>
          </div>

          <div className="scenario-grid">
            <div className="scenario-field">
              <label htmlFor="scenario-attack-type">
                Scenario type
              </label>

              <select
                id="scenario-attack-type"
                name="attackType"
                value={formData.attackType}
                onChange={handleChange}
              >
                <option>SQL Injection</option>
                <option>Brute Force</option>
                <option>Cross-Site Scripting</option>
                <option>Path Traversal</option>
                <option>Suspicious Request</option>
                <option>Custom Test</option>
              </select>
            </div>

            <div className="scenario-field">
              <label htmlFor="scenario-severity">
                Severity
              </label>

              <select
                id="scenario-severity"
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
          </div>

          <div className="scenario-field">
            <label htmlFor="scenario-status">
              Scenario status
            </label>

            <select
              id="scenario-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Draft</option>
              <option>Ready</option>
              <option>Running</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="scenario-field">
            <label htmlFor="scenario-description">
              Description
            </label>

            <textarea
              id="scenario-description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the purpose and expected behaviour of the scenario..."
            />
          </div>

          {message && (
            <div className="scenario-message scenario-message-error">
              {message}
            </div>
          )}

          <div className="scenario-actions">
            <span className="scenario-record-count">
              Current scenarios: <strong>{scenarios.length}</strong>
            </span>

            <button
              type="submit"
              className="btn btn-primary px-4"
            >
              Add Scenario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddScenario;