
// import { useState } from "react";
// import { registerUser } from "../session/SessionManager";

// import "./Registration.css";

// function Registration() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "analyst",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((current) => ({
//       ...current,
//       [name]: value,
//     }));

//     setError("");
//     setSuccess(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     setError("");
//     setSuccess(false);

//     const name = formData.name.trim();
//     const email = formData.email.trim();

//     if (!name || !email) {
//       setError("Please complete all required fields.");
//       return;
//     }

//     if (formData.password.length < 8) {
//       setError("Password must contain at least 8 characters.");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     const result = registerUser({
//       name,
//       email,
//       role: formData.role,
//       password: formData.password,
//     });

//     if (!result.success) {
//       setError(result.message);
//       return;
//     }

//     setSuccess(
//       "Your account has been created successfully. You can now sign in."
//     );

//     setFormData({
//       name: "",
//       email: "",
//       role: "analyst",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   return (
//     <main className="auth-page">
//       <section
//         className="auth-card registration-card"
//         aria-labelledby="registration-title"
//       >
//         <div className="auth-brand">
//           <div className="auth-brand-mark" aria-hidden="true">
//             🛡️
//           </div>

//           <div className="auth-brand-copy">
//             <h1>CyberSentinel-AI</h1>
//             <p>AI Security Platform</p>
//           </div>
//         </div>

//         <div className="auth-heading">
//           <span className="auth-eyebrow">ACCOUNT REGISTRATION</span>

//           <h2 id="registration-title">Create your account</h2>

//           <p>
//             Register your account and select the security role that represents
//             your responsibilities within the CyberSentinel-AI platform.
//           </p>
//         </div>

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="register-name">Full name</label>

//             <input
//               id="register-name"
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               autoComplete="name"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="register-email">Email address</label>

//             <input
//               id="register-email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email address"
//               autoComplete="email"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="register-role">Security role</label>

//             <select
//               id="register-role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="registration-select"
//             >
//               <option value="admin">Administrator</option>
//               <option value="analyst">SOC Security Analyst</option>
//               <option value="researcher">Security Researcher</option>
//             </select>
//           </div>

//           <div className="registration-grid">
//             <div className="form-group">
//               <label htmlFor="register-password">Password</label>

//               <input
//                 id="register-password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Minimum 8 characters"
//                 autoComplete="new-password"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="register-confirm-password">
//                 Confirm password
//               </label>

//               <input
//                 id="register-confirm-password"
//                 name="confirmPassword"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Repeat password"
//                 autoComplete="new-password"
//                 required
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="auth-message auth-message-error" role="alert">
//               {error}
//             </div>
//           )}

//           {success && (
//             <div className="auth-message auth-message-success" role="status">
//               {success}
//             </div>
//           )}

//           <button type="submit" className="auth-submit">
//             Create Account
//           </button>
//         </form>

//         <div className="auth-register registration-login">
//           <p>Already have an account?</p>

//           <a href="/login">Sign in</a>
//         </div>

//         <a href="/" className="auth-back-link">
//           ← Back to CyberSentinel-AI
//         </a>
//       </section>
//     </main>
//   );
// }

// export default Registration;




import { useState } from "react";
import { Link } from "react-router";

import { registerUser } from "../session/SessionManager";

import "./Registration.css";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "analyst",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess(false);

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email) {
      setError("Please complete all required fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = registerUser({
      name,
      email,
      role: formData.role,
      password: formData.password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(
      "Your account has been created successfully. You can now sign in."
    );

    setFormData({
      name: "",
      email: "",
      role: "analyst",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <main className="auth-page">
      <section
        className="auth-card registration-card"
        aria-labelledby="registration-title"
      >
        <div className="auth-brand">
          <div className="auth-brand-mark" aria-hidden="true">
            🛡️
          </div>

          <div className="auth-brand-copy">
            <h1>CyberSentinel-AI</h1>
            <p>AI Security Platform</p>
          </div>
        </div>

        <div className="auth-heading">
          <span className="auth-eyebrow">
            ACCOUNT REGISTRATION
          </span>

          <h2 id="registration-title">
            Create your account
          </h2>

          <p>
            Register your account and select the security role
            that represents your responsibilities within the
            CyberSentinel-AI platform.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="register-name">
              Full name
            </label>

            <input
              id="register-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">
              Email address
            </label>

            <input
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-role">
              Security role
            </label>

            <select
              id="register-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="registration-select"
            >
              <option value="admin">
                Administrator
              </option>

              <option value="analyst">
                SOC Security Analyst
              </option>

              <option value="researcher">
                Security Researcher
              </option>
            </select>
          </div>

          <div className="registration-grid">
            <div className="form-group">
              <label htmlFor="register-password">
                Password
              </label>

              <input
                id="register-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-confirm-password">
                Confirm password
              </label>

              <input
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="auth-message auth-message-error">
              {error}
            </div>
          )}

          {success && (
            <div className="auth-message auth-message-success">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
          >
            Create Account
          </button>
        </form>

        <div className="auth-register registration-login">
          <p>Already have an account?</p>

          <Link to="/login">
            Sign in
          </Link>
        </div>

        <Link to="/" className="auth-back-link">
          ← Back to CyberSentinel-AI
        </Link>
      </section>
    </main>
  );
}

export default Registration;