import { useEffect, useState } from "react";
import "./UpdateScenario.css";

function UpdateScenario({ scenarios, onUpdateScenario }) {
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    attackType: "SQL Injection",
    severity: "Medium",
    target: "",
    status: "Draft",
    description: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (scenarios.length === 0) {
      return;
    }

    const firstScenario = scenarios[0];

    setSelectedId(String(firstScenario.id));

    setFormData({
      name: firstScenario.name,
      attackType: firstScenario.attackType,
      severity: firstScenario.severity,
      target: firstScenario.target,
      status: firstScenario.status,
      description: firstScenario.description,
    });
  }, [scenarios]);

  const handleSelectScenario = (event) => {
    const id = event.target.value;

    setSelectedId(id);
    setMessage("");

    const scenario = scenarios.find(
      (item) => String(item.id) === id
    );

    if (!scenario) {
      return;
    }

    setFormData({
      name: scenario.name,
      attackType: scenario.attackType,
      severity: scenario.severity,
      target: scenario.target,
      status: scenario.status,
      description: scenario.description,
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
      setMessage("Please select a scenario.");
      return;
    }

    onUpdateScenario(Number(selectedId), {
      name: formData.name.trim(),
      attackType: formData.attackType,
      severity: formData.severity,
      target: formData.target.trim(),
      status: formData.status,
      description: formData.description.trim(),
    });
  };

  return (
    <div className="scenario-tab-panel">
      <div className="scenario-header">
        <span className="scenario-eyebrow">
          RESEARCH OPERATIONS · UPDATE SCENARIO
        </span>

        <h1>Update a simulation scenario</h1>

        <p>
          Modify scenario information as research objectives,
          testing conditions, or expected outcomes change.
        </p>
      </div>

      <div className="scenario-card">
        <div className="scenario-field">
          <label htmlFor="update-scenario-selector">
            Select scenario
          </label>

          <select
            id="update-scenario-selector"
            value={selectedId}
            onChange={handleSelectScenario}
          >
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name} — {scenario.severity}
              </option>
            ))}
          </select>
        </div>

        <div className="scenario-divider"></div>

        <form className="scenario-form" onSubmit={handleSubmit}>
          <div className="scenario-grid">
            <div className="scenario-field">
              <label htmlFor="update-scenario-name">
                Scenario name
              </label>

              <input
                id="update-scenario-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="scenario-field">
              <label htmlFor="update-scenario-target">
                Target application
              </label>

              <input
                id="update-scenario-target"
                name="target"
                value={formData.target}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="scenario-grid">
            <div className="scenario-field">
              <label htmlFor="update-scenario-type">
                Scenario type
              </label>

              <select
                id="update-scenario-type"
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
              <label htmlFor="update-scenario-severity">
                Severity
              </label>

              <select
                id="update-scenario-severity"
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
            <label htmlFor="update-scenario-status">
              Scenario status
            </label>

            <select
              id="update-scenario-status"
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
            <label htmlFor="update-scenario-description">
              Description
            </label>

            <textarea
              id="update-scenario-description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {message && (
            <div className="scenario-message scenario-message-error">
              {message}
            </div>
          )}

          <div className="scenario-actions">
            <span className="scenario-record-count">
              Available scenarios:{" "}
              <strong>{scenarios.length}</strong>
            </span>

            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={scenarios.length === 0}
            >
              Update Scenario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateScenario;