// src/lib/authClient.ts
export type User = {
  name: string;
  email: string;
  password: string;
  sq?: string; // security question
  sa?: string; // security answer (plaintext para demo)
};

const keyUsers = "lecturium_users";
const keySession = "lecturium_current_user";

function safeGet<T>(k: string, fb: T): T {
  if (typeof window === "undefined") return fb;
  try { return JSON.parse(localStorage.getItem(k) || "") as T; } catch { return fb; }
}
function safeSet<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
}

export function getUsers(): Record<string, User> { return safeGet(keyUsers, {} as any); }
export function saveUser(u: User) {
  const users = getUsers();
  users[u.email.toLowerCase()] = u;
  safeSet(keyUsers, users);
}
export function userExists(email: string) {
  return !!getUsers()[email.toLowerCase()];
}

export function login(email: string, password: string) {
  const u = getUsers()[email.toLowerCase()];
  if (!u || u.password !== password) return false;
  safeSet(keySession, { email: u.email, name: u.name });
  return true;
}
export function logout() { if (typeof window !== "undefined") localStorage.removeItem(keySession); }
export function getCurrentUser() { return safeGet<{email:string;name:string} | null>(keySession, null); }
export function isLoggedIn() { return !!getCurrentUser(); }

// ----- Reset por pregunta de seguridad -----
export function setSecurity(email: string, sq: string, sa: string) {
  const users = getUsers();
  const key = email.toLowerCase();
  if (!users[key]) return false;
  users[key].sq = sq;
  users[key].sa = (sa || "").trim();
  safeSet(keyUsers, users);
  return true;
}

export function getSecurityQuestion(email: string) {
  const u = getUsers()[email.toLowerCase()];
  return u?.sq || null;
}

export function canResetWithAnswer(email: string, answer: string) {
  const u = getUsers()[email.toLowerCase()];
  if (!u || !u.sa) return false;
  return u.sa === (answer || "").trim();
}

export function resetPassword(email: string, newPassword: string) {
  const users = getUsers();
  const key = email.toLowerCase();
  if (!users[key]) return false;
  users[key].password = newPassword;
  safeSet(keyUsers, users);
  return true;
}
