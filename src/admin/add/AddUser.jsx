import { useState } from "react";
import "./AddUser.css";

function AddUser({ users, onAddUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
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

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email) {
      setMessage("Please complete the required fields.");
      return;
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      setMessage("A user with this email already exists.");
      return;
    }

    onAddUser({
      name,
      email,
      role: formData.role,
    });

    setFormData({
      name: "",
      email: "",
      role: "User",
    });

    setMessage("");
  };

  return (
    <div className="user-tab-panel">
      <div className="crud-header">
        <span className="crud-eyebrow">
          USER MANAGEMENT · ADD
        </span>

        <h1>Add a new user</h1>

        <p>
          Create a user account and assign the appropriate security role
          within the CyberSentinel-AI platform.
        </p>
      </div>

      <div className="crud-card">
        <div className="crud-card-heading">
          <h2>User account details</h2>
          <p>
            Enter the basic information for the new account.
          </p>
        </div>

        <form className="crud-form" onSubmit={handleSubmit}>
          <div className="crud-grid">
            <div className="crud-field">
              <label htmlFor="add-user-name">
                Full name
              </label>

              <input
                id="add-user-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>

            <div className="crud-field">
              <label htmlFor="add-user-email">
                Email address
              </label>

              <input
                id="add-user-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="crud-field">
            <label htmlFor="add-user-role">
              Security role
            </label>

            <select
              id="add-user-role"
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

          <div className="crud-info">
            Current users: <strong>{users.length}</strong>
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
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;