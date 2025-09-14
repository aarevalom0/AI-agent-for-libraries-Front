// src/lib/authClient.ts
export type User = { name: string; email: string; password: string };

const keyUsers = "lecturium_users";
const keySession = "lecturium_current_user";

function safeGet<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(localStorage.getItem(k) || "") as T; }
  catch { return fallback; }
}

function safeSet<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
}

export function getUsers(): Record<string, User> {
  return safeGet<Record<string, User>>(keyUsers, {});
}

export function saveUser(user: User) {
  const users = getUsers();
  users[user.email.toLowerCase()] = user;
  safeSet(keyUsers, users);
}

export function userExists(email: string) {
  const users = getUsers();
  return !!users[email.toLowerCase()];
}

export function login(email: string, password: string) {
  const users = getUsers();
  const u = users[email.toLowerCase()];
  if (!u || u.password !== password) return false;
  safeSet(keySession, { email: u.email, name: u.name });
  return true;
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(keySession);
}

export function getCurrentUser(): { email: string; name: string } | null {
  return safeGet<{ email: string; name: string } | null>(keySession, null);
}

export function isLoggedIn() {
  return !!getCurrentUser();
}
