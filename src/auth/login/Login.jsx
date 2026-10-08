// import { useEffect, useState } from "react";

// import {
//   authenticateUser,
//   getSession,
//   startSession,
// } from "../session/SessionManager";

// import "./Login.css";

// const roles = [
//   {
//     value: "admin",
//     icon: "🛡️",
//     title: "Administrator",
//     description: "Manage users, security controls, and platform operations.",
//   },
//   {
//     value: "analyst",
//     icon: "📡",
//     title: "SOC Security Analyst",
//     description: "Monitor incidents, investigate threats, and review activity.",
//   },
//   {
//     value: "researcher",
//     icon: "🧪",
//     title: "Security Researcher",
//     description: "Run controlled simulations and support defensive research.",
//   },
// ];

// function Login() {
//   const [selectedRole, setSelectedRole] = useState("admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // Redirect an already authenticated user to their workspace.
//     const session = getSession();

//     if (session) {
//       const destination =
//         session.role === "admin"
//           ? "/admin"
//           : session.role === "analyst"
//           ? "/analyst"
//           : session.role === "researcher"
//           ? "/researcher"
//           : "/login";

//       window.location.replace(destination);
//     }
//   }, []);

//   const handleRoleChange = (role) => {
//     setSelectedRole(role);
//     setError("");
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     setError("");
//     setIsSubmitting(true);

//     const cleanEmail = email.trim();

//     if (!cleanEmail || !password) {
//       setError("Please enter your email address and password.");
//       setIsSubmitting(false);
//       return;
//     }

//     // Verify email, password, and selected stakeholder role.
//     const result = authenticateUser(
//       cleanEmail,
//       password,
//       selectedRole
//     );

//     if (!result.success) {
//       setError(result.message);
//       setIsSubmitting(false);
//       return;
//     }

//     // Start the shared authenticated session.
//     startSession(result.user, rememberMe);

//     const destination =
//       result.user.role === "admin"
//         ? "/admin"
//         : result.user.role === "analyst"
//         ? "/analyst"
//         : result.user.role === "researcher"
//         ? "/researcher"
//         : "/login";

//     window.location.replace(destination);
//   };

//   const handleForgotPassword = () => {
//     setError(
//       "Password recovery will be connected to the authentication backend."
//     );
//   };

//   return (
//     <main className="auth-page">
//       <section className="auth-card" aria-labelledby="login-title">
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
//           <span className="auth-eyebrow">SECURE ACCESS</span>

//           <h2 id="login-title">Sign in to your account</h2>

//           <p>
//             Select your security role and sign in to the workspace
//             assigned to your responsibilities within CyberSentinel-AI.
//           </p>
//         </div>

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <div className="role-section">
//             <div className="role-section-heading">
//               <label>Security role</label>

//               <span>Select one</span>
//             </div>

//             <div
//               className="role-selection"
//               role="radiogroup"
//               aria-label="Security role"
//             >
//               {roles.map((role) => (
//                 <button
//                   key={role.value}
//                   type="button"
//                   className={`role-option ${
//                     selectedRole === role.value
//                       ? "role-option-active"
//                       : ""
//                   }`}
//                   onClick={() =>
//                     handleRoleChange(role.value)
//                   }
//                   aria-pressed={
//                     selectedRole === role.value
//                   }
//                 >
//                   <div className="role-option-icon">
//                     {role.icon}
//                   </div>

//                   <div className="role-option-content">
//                     <strong>{role.title}</strong>

//                     <span>{role.description}</span>
//                   </div>

//                   <div className="role-option-check">
//                     {selectedRole === role.value
//                       ? "✓"
//                       : ""}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="login-email">
//               Email address
//             </label>

//             <input
//               id="login-email"
//               type="email"
//               value={email}
//               onChange={(event) =>
//                 setEmail(event.target.value)
//               }
//               placeholder="Enter your email address"
//               autoComplete="email"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <div className="form-label-row">
//               <label htmlFor="login-password">
//                 Password
//               </label>

//               <button
//                 type="button"
//                 className="forgot-button"
//                 onClick={handleForgotPassword}
//               >
//                 Forgot password?
//               </button>
//             </div>

//             <div className="password-input-wrapper">
//               <input
//                 id="login-password"
//                 type={
//                   showPassword ? "text" : "password"
//                 }
//                 value={password}
//                 onChange={(event) =>
//                   setPassword(event.target.value)
//                 }
//                 placeholder="Enter your password"
//                 autoComplete="current-password"
//                 required
//               />

//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() =>
//                   setShowPassword(
//                     (current) => !current
//                   )
//                 }
//                 aria-label={
//                   showPassword
//                     ? "Hide password"
//                     : "Show password"
//                 }
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div
//               className="auth-message auth-message-error"
//               role="alert"
//             >
//               {error}
//             </div>
//           )}

//           <div className="auth-options">
//             <label className="remember-option">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(event) =>
//                   setRememberMe(event.target.checked)
//                 }
//               />

//               <span>Remember me</span>
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="auth-submit"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         <div className="auth-divider">
//           <span>NEW TO CYBERSENTINEL-AI?</span>
//         </div>

//         <div className="auth-register">
//           <p>Don't have an account?</p>

//           <a href="/registration">
//             Create an account
//           </a>
//         </div>

//         <div className="auth-demo">
//           <span className="auth-demo-title">
//             Demo administrator access
//           </span>

//           <span>admin@cybersentinel.ai</span>
//           <span>admin123</span>
//         </div>

//         <a href="/" className="auth-back-link">
//           ← Back to CyberSentinel-AI
//         </a>
//       </section>
//     </main>
//   );
// }

// export default Login;





import { useEffect, useState } from "react";
import { Link } from "react-router";

import {
  authenticateUser,
  getSession,
  startSession,
} from "../session/SessionManager";

import "./Login.css";

const roles = [
  {
    value: "admin",
    icon: "🛡️",
    title: "Administrator",
    description:
      "Manage users, security controls, and platform operations.",
  },
  {
    value: "analyst",
    icon: "📡",
    title: "SOC Security Analyst",
    description:
      "Monitor incidents, investigate threats, and review activity.",
  },
  {
    value: "researcher",
    icon: "🧪",
    title: "Security Researcher",
    description:
      "Run controlled simulations and support defensive research.",
  },
];

function Login() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const session = getSession();

    if (session) {
      const destination =
        session.role === "admin"
          ? "/admin"
          : session.role === "analyst"
          ? "/analyst"
          : session.role === "researcher"
          ? "/researcher"
          : "/login";

      window.location.replace(destination);
    }
  }, []);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter your email address and password.");
      setIsSubmitting(false);
      return;
    }

    const result = authenticateUser(
      cleanEmail,
      password,
      selectedRole
    );

    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    startSession(result.user, rememberMe);

    const destination =
      result.user.role === "admin"
        ? "/admin"
        : result.user.role === "analyst"
        ? "/analyst"
        : result.user.role === "researcher"
        ? "/researcher"
        : "/login";

    window.location.replace(destination);
  };

  const handleForgotPassword = () => {
    setError(
      "Password recovery will be connected to the authentication backend."
    );
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
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
          <span className="auth-eyebrow">SECURE ACCESS</span>

          <h2 id="login-title">Sign in to your account</h2>

          <p>
            Select your security role and sign in to the workspace
            assigned to your responsibilities within CyberSentinel-AI.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="role-section">
            <div className="role-section-heading">
              <label>Security role</label>
              <span>Select one</span>
            </div>

            <div
              className="role-selection"
              role="radiogroup"
              aria-label="Security role"
            >
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  className={`role-option ${
                    selectedRole === role.value
                      ? "role-option-active"
                      : ""
                  }`}
                  onClick={() => handleRoleChange(role.value)}
                  aria-pressed={
                    selectedRole === role.value
                  }
                >
                  <div className="role-option-icon">
                    {role.icon}
                  </div>

                  <div className="role-option-content">
                    <strong>{role.title}</strong>
                    <span>{role.description}</span>
                  </div>

                  <div className="role-option-check">
                    {selectedRole === role.value ? "✓" : ""}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-email">
              Email address
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="login-password">
                Password
              </label>

              <button
                type="button"
                className="forgot-button"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <div className="password-input-wrapper">
              <input
                id="login-password"
                type={
                  showPassword ? "text" : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="auth-message auth-message-error">
              {error}
            </div>
          )}

          <div className="auth-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(event.target.checked)
                }
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-divider">
          <span>NEW TO CYBERSENTINEL-AI?</span>
        </div>

        <div className="auth-register">
          <p>Don't have an account?</p>

          <Link to="/registration">
            Create an account
          </Link>
        </div>

        <div className="auth-demo">
          <span className="auth-demo-title">
            Demo administrator access
          </span>

          <span>admin@cybersentinel.ai</span>
          <span>admin123</span>
        </div>

        <Link to="/" className="auth-back-link">
          ← Back to CyberSentinel-AI
        </Link>
      </section>
    </main>
  );
}

export default Login;