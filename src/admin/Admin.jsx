// import { useEffect, useState } from "react";
// import AdminLayout from "./layout/AdminLayout";
 
 
// import "./Admin.css";

// const SESSION_KEY = "cybersentinel_admin_session";
// const MODULE_KEY = "cybersentinel_admin_active_module";

// function getStoredSession() {
//   try {
//     const localSession = localStorage.getItem(SESSION_KEY);

//     if (localSession) {
//       return JSON.parse(localSession);
//     }

//     const temporarySession = sessionStorage.getItem(SESSION_KEY);

//     if (temporarySession) {
//       return JSON.parse(temporarySession);
//     }

//     return null;
//   } catch {
//     return null;
//   }
// }

// function Admin() {
//   const [session, setSession] = useState(getStoredSession);

//   const [activeModule, setActiveModule] = useState(
//     () =>
//       localStorage.getItem(MODULE_KEY) ||
//       "dashboard"
//   );

//   useEffect(() => {
//     if (!session) {
//       window.location.replace("/signin");
//     }
//   }, [session]);

//   const handleNavigation = (module) => {
//     setActiveModule(module);
//     localStorage.setItem(MODULE_KEY, module);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem(SESSION_KEY);
//     sessionStorage.removeItem(SESSION_KEY);
//     localStorage.removeItem(MODULE_KEY);

//     setSession(null);
//   };

//   if (!session) {
//     return null;
//   }

//   return (
//     <div className="admin-app">
//       <AdminLayout
//         session={session}
//         activeModule={activeModule}
//         onNavigate={handleNavigation}
//         onLogout={handleLogout}
//       />
//     </div>
//   );
// }

// export default Admin;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import AdminLayout from "./layout/AdminLayout";

import "./Admin.css";

const SESSION_KEY = "cybersentinel_admin_session";
const MODULE_KEY = "cybersentinel_admin_active_module";

function getStoredSession() {
  try {
    const localSession = localStorage.getItem(SESSION_KEY);

    if (localSession) {
      return JSON.parse(localSession);
    }

    const temporarySession = sessionStorage.getItem(SESSION_KEY);

    if (temporarySession) {
      return JSON.parse(temporarySession);
    }

    return null;
  } catch {
    return null;
  }
}

function Admin() {
  const navigate = useNavigate();

  const [session, setSession] = useState(getStoredSession);

  const [activeModule, setActiveModule] = useState(
    () => localStorage.getItem(MODULE_KEY) || "dashboard"
  );

  useEffect(() => {
    if (!session) {
      navigate("/login", { replace: true });
    }
  }, [session, navigate]);

  const handleNavigation = (module) => {
    setActiveModule(module);
    localStorage.setItem(MODULE_KEY, module);
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(MODULE_KEY);

    setSession(null);

    navigate("/login", { replace: true });
  };

  if (!session) {
    return null;
  }

  return (
    <div className="admin-app">
      <AdminLayout
        session={session}
        activeModule={activeModule}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default Admin;