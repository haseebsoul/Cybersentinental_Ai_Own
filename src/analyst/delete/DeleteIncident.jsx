import { useState } from "react";
import "./DeleteIncident.css";

function DeleteIncident({ incidents, onDeleteIncident }) {
  const [selectedId, setSelectedId] = useState("");

  const selectedIncident = incidents.find(
    (incident) => String(incident.id) === selectedId
  );

  const handleDelete = () => {
    if (!selectedIncident) {
      return;
    }

    const confirmed = window.confirm(
      `Delete the incident "${selectedIncident.title}"?`
    );

    if (!confirmed) {
      return;
    }

    onDeleteIncident(selectedIncident.id);

    setSelectedId("");
  };

  return (
    <div className="incident-tab-panel">
      <div className="incident-header">
        <span className="incident-eyebrow">
          SOC OPERATIONS · DELETE INCIDENT
        </span>

        <h1>Delete a security incident</h1>

        <p>
          Remove an incident record from the current frontend prototype
          after reviewing the selected security event.
        </p>
      </div>

      <div className="incident-delete-card">
        <div className="incident-warning-icon">
          ⚠️
        </div>

        <span className="incident-delete-label">
          INCIDENT REMOVAL
        </span>

        <h2>Select an incident to remove</h2>

        <p>
          Review the incident details before confirming the deletion.
        </p>

        <div className="incident-field">
          <label htmlFor="delete-incident-selector">
            Incident
          </label>

          <select
            id="delete-incident-selector"
            value={selectedId}
            onChange={(event) =>
              setSelectedId(event.target.value)
            }
          >
            <option value="">Select an incident</option>

            {incidents.map((incident) => (
              <option key={incident.id} value={incident.id}>
                {incident.title} — {incident.severity}
              </option>
            ))}
          </select>
        </div>

        {selectedIncident && (
          <div className="incident-preview">
            <div>
              <span>Title</span>
              <strong>{selectedIncident.title}</strong>
            </div>

            <div>
              <span>Severity</span>
              <strong>{selectedIncident.severity}</strong>
            </div>

            <div>
              <span>Source IP</span>
              <strong>{selectedIncident.sourceIP}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{selectedIncident.status}</strong>
            </div>
          </div>
        )}

        <button
          type="button"
          className="btn btn-danger px-4"
          onClick={handleDelete}
          disabled={!selectedIncident}
        >
          Delete Incident
        </button>
      </div>
    </div>
  );
}

export default DeleteIncident;