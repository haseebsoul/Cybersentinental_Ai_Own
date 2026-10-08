import "./ReviewUsers.css";

function ReviewUsers({ users }) {
  const administratorCount = users.filter(
    (user) => user.role === "Administrator"
  ).length;

  const analystCount = users.filter(
    (user) => user.role === "Security Analyst"
  ).length;

  const researcherCount = users.filter(
    (user) => user.role === "Security Researcher"
  ).length;

  return (
    <div className="user-tab-panel">
      <div className="crud-header">
        <span className="crud-eyebrow">
          USER MANAGEMENT · REVIEW
        </span>

        <h1>Review user accounts</h1>

        <p>
          Review the current user records and stakeholder roles managed
          by the CyberSentinel-AI administration area.
        </p>
      </div>

      <section className="review-stats">
        <article className="review-stat-card">
          <span>Total users</span>
          <strong>{users.length}</strong>
        </article>

        <article className="review-stat-card">
          <span>Administrators</span>
          <strong>{administratorCount}</strong>
        </article>

        <article className="review-stat-card">
          <span>SOC analysts</span>
          <strong>{analystCount}</strong>
        </article>

        <article className="review-stat-card">
          <span>Researchers</span>
          <strong>{researcherCount}</strong>
        </article>
      </section>

      <section className="review-table-card">
        <div className="review-table-heading">
          <div>
            <h2>Current user directory</h2>

            <p>
              This table is reading directly from the parent users state.
            </p>
          </div>
        </div>

        <div className="review-table-wrapper">
          <table className="review-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.name}</strong>
                  </td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>
                    <span
                      className={`role-badge role-${
                        user.status.toLowerCase()
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ReviewUsers;