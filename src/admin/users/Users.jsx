import { useMemo, useState } from "react";
import AddUser from "../add/AddUser";
import UpdateUser from "../update/UpdateUser";
import DeleteUser from "../delete/DeleteUser";
import ReviewUsers from "../review/ReviewUsers";

import "./Users.css";

const initialUsers = [
  {
    id: 1,
    name: "System Administrator",
    email: "admin@cybersentinel.local",
    role: "Administrator",
    status: "Active",
    lastLogin: "Just now",
  },
  {
    id: 2,
    name: "SOC Analyst",
    email: "analyst@cybersentinel.local",
    role: "Security Analyst",
    status: "Active",
    lastLogin: "8 min ago",
  },
  {
    id: 3,
    name: "Research Lab",
    email: "research@cybersentinel.local",
    role: "Security Researcher",
    status: "Active",
    lastLogin: "32 min ago",
  },
  {
    id: 4,
    name: "Demo User",
    email: "user@cybersentinel.local",
    role: "User",
    status: "Inactive",
    lastLogin: "2 days ago",
  },
];

function Users() {
  // Single shared users state for the complete User Management module.
  const [users, setUsers] = useState(initialUsers);

  // Controls which User Management view is currently visible.
  const [activeTab, setActiveTab] = useState("list");

  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.role.toLowerCase().includes(searchValue)
    );
  }, [users, search]);

  const handleAddUser = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name.trim(),
      email: userData.email.trim(),
      role: userData.role,
      status: "Active",
      lastLogin: "Never",
    };

    setUsers((current) => [...current, newUser]);

    // Return to the main list after adding.
    setActiveTab("list");
  };

  const handleUpdateUser = (userId, updatedData) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? {
              ...user,
              ...updatedData,
            }
          : user
      )
    );

    // Return to the main list after updating.
    setActiveTab("list");
  };

  const handleDeleteUser = (userId) => {
    setUsers((current) =>
      current.filter((user) => user.id !== userId)
    );

    // Return to the main list after deleting.
    setActiveTab("list");
  };

  return (
    <section className="users-module">

      {/* Bootstrap pill navigation */}
      <nav
        className="nav nav-pills gap-2 flex-wrap mb-4"
        aria-label="User management navigation"
      >
        <div className="nav-item">
          <button
            type="button"
            className={`nav-link ${
              activeTab === "list" ? "active" : ""
            }`}
            onClick={() => setActiveTab("list")}
          >
            Users List
          </button>
        </div>

        <div className="nav-item">
          <button
            type="button"
            className={`nav-link ${
              activeTab === "add" ? "active" : ""
            }`}
            onClick={() => setActiveTab("add")}
          >
            Add User
          </button>
        </div>

        <div className="nav-item">
          <button
            type="button"
            className={`nav-link ${
              activeTab === "update" ? "active" : ""
            }`}
            onClick={() => setActiveTab("update")}
          >
            Update User
          </button>
        </div>

        <div className="nav-item">
          <button
            type="button"
            className={`nav-link ${
              activeTab === "delete" ? "active" : ""
            }`}
            onClick={() => setActiveTab("delete")}
          >
            Delete User
          </button>
        </div>

        <div className="nav-item">
          <button
            type="button"
            className={`nav-link ${
              activeTab === "review" ? "active" : ""
            }`}
            onClick={() => setActiveTab("review")}
          >
            Review Users
          </button>
        </div>
      </nav>

      {/* Selected tab content */}
      {activeTab === "add" && (
        <AddUser
          users={users}
          onAddUser={handleAddUser}
        />
      )}

      {activeTab === "update" && (
        <UpdateUser
          users={users}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {activeTab === "delete" && (
        <DeleteUser
          users={users}
          onDeleteUser={handleDeleteUser}
        />
      )}

      {activeTab === "review" && (
        <ReviewUsers users={users} />
      )}

      {/* Main Users List */}
      {activeTab === "list" && (
        <>
          <div className="users-tools">
            <div className="users-search">
              <span>⌕</span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search users..."
              />
            </div>

            <span className="users-count">
              {filteredUsers.length} users
            </span>
          </div>

          <div className="users-table">
            <div className="users-table-header">
              <span>User</span>
              <span>Role</span>
              <span>Status</span>
              <span>Last Login</span>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="user-row">
                <div className="user-info">
                  <strong>No users found</strong>
                </div>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div className="user-row" key={user.id}>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0)}
                    </div>

                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <span className="user-role">
                    {user.role}
                  </span>

                  <span
                    className={`user-status ${user.status.toLowerCase()}`}
                  >
                    {user.status}
                  </span>

                  <span className="user-last-login">
                    {user.lastLogin}
                  </span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Users;