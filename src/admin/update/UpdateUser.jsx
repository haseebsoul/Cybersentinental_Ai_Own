import { useEffect, useState } from "react";
import "./UpdateUser.css";

function UpdateUser({ users, onUpdateUser }) {
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (users.length === 0) {
      return;
    }

    const firstUser = users[0];

    setSelectedId(String(firstUser.id));

    setFormData({
      name: firstUser.name,
      email: firstUser.email,
      role: firstUser.role,
      status: firstUser.status,
    });
  }, [users]);

  const handleSelectUser = (event) => {
    const id = event.target.value;

    setSelectedId(id);
    setMessage("");

    const selectedUser = users.find(
      (user) => String(user.id) === id
    );

    if (!selectedUser) {
      return;
    }

    setFormData({
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      status: selectedUser.status,
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
      setMessage("Please select a user.");
      return;
    }

    const duplicateEmail = users.some(
      (user) =>
        String(user.id) !== selectedId &&
        user.email.toLowerCase() ===
          formData.email.trim().toLowerCase()
    );

    if (duplicateEmail) {
      setMessage("Another user already uses this email.");
      return;
    }

    onUpdateUser(Number(selectedId), {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      status: formData.status,
    });
  };

  return (
    <div className="user-tab-panel">
      <div className="crud-header">
        <span className="crud-eyebrow">
          USER MANAGEMENT · UPDATE
        </span>

        <h1>Update a user</h1>

        <p>
          Select an existing user and update their account information,
          role, or current status.
        </p>
      </div>

      <div className="crud-card">
        <div className="crud-field">
          <label htmlFor="update-user-selector">
            Select user
          </label>

          <select
            id="update-user-selector"
            value={selectedId}
            onChange={handleSelectUser}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} — {user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="crud-divider"></div>

        <form className="crud-form" onSubmit={handleSubmit}>
          <div className="crud-grid">
            <div className="crud-field">
              <label htmlFor="update-user-name">
                Full name
              </label>

              <input
                id="update-user-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="crud-field">
              <label htmlFor="update-user-email">
                Email address
              </label>

              <input
                id="update-user-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="crud-grid">
            <div className="crud-field">
              <label htmlFor="update-user-role">
                Security role
              </label>

              <select
                id="update-user-role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option>User</option>
                <option>Security Analyst</option>
                <option>Security Researcher</option>
                <option>Administrator</option>
              </select>
            </div>

            <div className="crud-field">
              <label htmlFor="update-user-status">
                Account status
              </label>

              <select
                id="update-user-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {message && (
            <div className="crud-message crud-message-error">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="crud-primary-button"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;