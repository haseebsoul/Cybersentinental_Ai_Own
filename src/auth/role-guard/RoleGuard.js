/* =========================================================
   CyberSentinel-AI Role Guard

   Shared authorization helper for the three stakeholder
   workspaces: Administrator, SOC Analyst and Researcher.
   ========================================================= */

import { getSession } from "../session/SessionManager";

/*
  Available stakeholder roles.
*/
export const ROLES = {
  ADMIN: "admin",
  ANALYST: "analyst",
  RESEARCHER: "researcher",
};

/*
  Check whether the current user is authenticated.
*/
export function isLoggedIn() {
  return Boolean(getSession());
}

/*
  Return the current user's role.
*/
export function getCurrentRole() {
  const session = getSession();

  return session ? session.role : null;
}

/*
  Check whether the current user has one of the
  allowed roles.
*/
export function hasRole(allowedRoles) {
  const currentRole = getCurrentRole();

  if (!currentRole) {
    return false;
  }

  return allowedRoles.includes(currentRole);
}

/*
  Return the correct workspace for each stakeholder.
*/
export function getRoleHome(role) {
  switch (role) {
    case ROLES.ADMIN:
      return "/admin";

    case ROLES.ANALYST:
      return "/analyst";

    case ROLES.RESEARCHER:
      return "/researcher";

    default:
      return "/login";
  }
}

/*
  Redirect the user to the correct page when
  they are not authenticated or have the wrong role.
*/
export function guardRole(allowedRoles) {
  const session = getSession();

  if (!session) {
    window.location.replace("/login");
    return false;
  }

  if (!allowedRoles.includes(session.role)) {
    window.location.replace(getRoleHome(session.role));
    return false;
  }

  return true;
}

/*
  Send an authenticated user to their
  stakeholder workspace after login.
*/
export function redirectToRoleHome() {
  const session = getSession();

  if (!session) {
    window.location.replace("/login");
    return;
  }

  window.location.replace(getRoleHome(session.role));
}