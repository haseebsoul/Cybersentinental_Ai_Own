import { useState } from "react";
import "./DeleteScenario.css";

function DeleteScenario({ scenarios, onDeleteScenario }) {
  const [selectedId, setSelectedId] = useState("");

  const selectedScenario = scenarios.find(
    (scenario) => String(scenario.id) === selectedId
  );

  const handleDelete = () => {
    if (!selectedScenario) {
      return;
    }

    const confirmed = window.confirm(
      `Delete the scenario "${selectedScenario.name}"?`
    );

    if (!confirmed) {
      return;
    }

    onDeleteScenario(selectedScenario.id);

    setSelectedId("");
  };

  return (
    <div className="scenario-tab-panel">
      <div className="scenario-header">
        <span className="scenario-eyebrow">
          RESEARCH OPERATIONS · DELETE SCENARIO
        </span>

        <h1>Delete a simulation scenario</h1>

        <p>
          Remove an existing research scenario from the current
          frontend prototype after reviewing its details.
        </p>
      </div>

      <div className="scenario-delete-card">
        <div className="scenario-warning-icon">
          ⚠️
        </div>

        <span className="scenario-delete-label">
          SCENARIO REMOVAL
        </span>

        <h2>Select a scenario to remove</h2>

        <p>
          Review the selected scenario before confirming the deletion.
        </p>

        <div className="scenario-field">
          <label htmlFor="delete-scenario-selector">
            Scenario
          </label>

          <select
            id="delete-scenario-selector"
            value={selectedId}
            onChange={(event) =>
              setSelectedId(event.target.value)
            }
          >
            <option value="">Select a scenario</option>

            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name} — {scenario.severity}
              </option>
            ))}
          </select>
        </div>

        {selectedScenario && (
          <div className="scenario-preview">
            <div>
              <span>Name</span>
              <strong>{selectedScenario.name}</strong>
            </div>

            <div>
              <span>Type</span>
              <strong>{selectedScenario.attackType}</strong>
            </div>

            <div>
              <span>Target</span>
              <strong>{selectedScenario.target}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{selectedScenario.status}</strong>
            </div>
          </div>
        )}

        <button
          type="button"
          className="btn btn-danger px-4"
          onClick={handleDelete}
          disabled={!selectedScenario}
        >
          Delete Scenario
        </button>
      </div>
    </div>
  );
}

export default DeleteScenario;