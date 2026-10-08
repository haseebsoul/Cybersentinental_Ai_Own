/* =========================================================
   CyberSentinel-AI Session Manager

   Frontend prototype authentication and user storage.
   The future FastAPI backend will replace this local storage
   layer with real authentication, authorization and database
   operations.
   ========================================================= */

const SESSION_KEY = "cybersentinel_admin_session";
const USERS_KEY = "cybersentinel_users";

const DEFAULT_ADMIN = {
  id: "admin-001",
  name: "System Administrator",
  email: "admin@cybersentinel.ai",
  password: "admin123",
  role: "admin",
};

/*
  Safely read JSON data from localStorage.
*/
function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/*
  Save JSON data to localStorage.
*/
function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/*
  Return all registered users.
*/
export function getUsers() {
  const users = readStorage(USERS_KEY, []);

  if (users.length === 0) {
    writeStorage(USERS_KEY, [DEFAULT_ADMIN]);

    return [DEFAULT_ADMIN];
  }

  return users;
}

/*
  Find one user by ID.
*/
export function getUserById(userId) {
  const users = getUsers();

  return users.find((user) => user.id === userId) || null;
}

/*
  Register a new user.
*/
export function registerUser(userData) {
  return addUser(userData);
}

/*
  Add a new user.
*/
export function addUser(userData) {
  const users = getUsers();

  const normalizedEmail = userData.email.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === normalizedEmail
  );

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: userData.name,
    email: normalizedEmail,
    password: userData.password,
    role: userData.role,
  };

  users.push(newUser);

  writeStorage(USERS_KEY, users);

  return {
    success: true,
    user: newUser,
  };
}

/*
  Update an existing user.
*/
export function updateUser(userId, userData) {
  const users = getUsers();

  const userIndex = users.findIndex(
    (user) => user.id === userId
  );

  if (userIndex === -1) {
    return {
      success: false,
      message: "The selected user could not be found.",
    };
  }

  const normalizedEmail = userData.email.trim().toLowerCase();

  const duplicateEmail = users.find(
    (user) =>
      user.id !== userId &&
      user.email.toLowerCase() === normalizedEmail
  );

  if (duplicateEmail) {
    return {
      success: false,
      message: "Another account already uses this email.",
    };
  }

  const currentUser = users[userIndex];

  users[userIndex] = {
    ...currentUser,
    name: userData.name,
    email: normalizedEmail,
    role: userData.role,
    password:
      userData.password && userData.password.trim()
        ? userData.password
        : currentUser.password,
  };

  writeStorage(USERS_KEY, users);

  return {
    success: true,
    user: users[userIndex],
  };
}

/*
  Delete a user.

  The demo administrator is protected so the
  frontend testing account is not accidentally removed.
*/
export function deleteUser(userId) {
  if (userId === DEFAULT_ADMIN.id) {
    return {
      success: false,
      message: "The demo administrator account cannot be deleted.",
    };
  }

  const users = getUsers();

  const userExists = users.some(
    (user) => user.id === userId
  );

  if (!userExists) {
    return {
      success: false,
      message: "The selected user could not be found.",
    };
  }

  const updatedUsers = users.filter(
    (user) => user.id !== userId
  );

  writeStorage(USERS_KEY, updatedUsers);

  return {
    success: true,
  };
}

/*
  Authenticate a user using email, password,
  and the stakeholder role selected on Login.
*/
export function authenticateUser(
  email,
  password,
  selectedRole
) {
  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === normalizedEmail &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email address or password.",
    };
  }

  if (user.role !== selectedRole) {
    return {
      success: false,
      message:
        "The selected security role does not match this account.",
    };
  }

  return {
    success: true,
    user,
  };
}

/*
  Start the authenticated session.
*/
export function startSession(user, rememberMe = true) {
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    loginAt: new Date().toISOString(),
  };

  if (rememberMe) {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );

    sessionStorage.removeItem(SESSION_KEY);
  } else {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );

    localStorage.removeItem(SESSION_KEY);
  }

  return session;
}

/*
  Return the current authenticated session.
*/
export function getSession() {
  try {
    const localSession = localStorage.getItem(SESSION_KEY);

    if (localSession) {
      return JSON.parse(localSession);
    }

    const temporarySession = sessionStorage.getItem(
      SESSION_KEY
    );

    if (temporarySession) {
      return JSON.parse(temporarySession);
    }

    return null;
  } catch {
    return null;
  }
}

/*
  End the current session.
*/
export function endSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

/*
  Check whether a user is authenticated.
*/
export function isAuthenticated() {
  return Boolean(getSession());
}