import { useState } from "react";
import "./DeleteUser.css";

function DeleteUser({ users, onDeleteUser }) {
  const [selectedId, setSelectedId] = useState("");

  const selectedUser = users.find(
    (user) => String(user.id) === selectedId
  );

  const handleDelete = () => {
    if (!selectedUser) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${selectedUser.name}'s account?`
    );

    if (!confirmed) {
      return;
    }

    onDeleteUser(selectedUser.id);
    setSelectedId("");
  };

  return (
    <div className="user-tab-panel">
      <div className="crud-header">
        <span className="crud-eyebrow">
          USER MANAGEMENT · DELETE
        </span>

        <h1>Delete a user</h1>

        <p>
          Remove an existing user account from the current
          CyberSentinel-AI demo user list.
        </p>
      </div>

      <div className="delete-card">
        <div className="delete-icon">⚠️</div>

        <span className="delete-label">
          ACCOUNT REMOVAL
        </span>

        <h2>Select a user to remove</h2>

        <p>
          Review the selected account before confirming its removal.
        </p>

        <div className="crud-field">
          <label htmlFor="delete-user-selector">
            User account
          </label>

          <select
            id="delete-user-selector"
            value={selectedId}
            onChange={(event) =>
              setSelectedId(event.target.value)
            }
          >
            <option value="">Select a user</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} — {user.email}
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <div className="delete-preview">
            <span>Name</span>
            <strong>{selectedUser.name}</strong>

            <span>Email</span>
            <strong>{selectedUser.email}</strong>

            <span>Role</span>
            <strong>{selectedUser.role}</strong>
          </div>
        )}

        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
          disabled={!selectedUser}
        >
          Delete User
        </button>
      </div>
    </div>
  );
}

export default DeleteUser;