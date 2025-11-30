// src/lib/authClient.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api/v1";

export type BackendUser = {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  foto_perfil: string | null;
  biografia: string | null;
};

type Session = {
  token: string;
  user: BackendUser;
};

const keySession = "lecturium_session";

// Helpers seguros para localStorage
function safeGet<T>(k: string, fb: T): T {
  if (typeof window === "undefined") return fb;
  try {
    const raw = localStorage.getItem(k);
    if (!raw) return fb;
    return JSON.parse(raw) as T;
  } catch {
    return fb;
  }
}

function safeSet<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
}

function safeRemove(k: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(k);
}

// ---------- Sesión ----------

function getSession(): Session | null {
  return safeGet<Session | null>(keySession, null);
}

export function getCurrentUser(): BackendUser | null {
  return getSession()?.user ?? null;
}

export function isLoggedIn(): boolean {
  return !!getSession();
}

export function logout() {
  safeRemove(keySession);
}

// ---------- Auth contra el backend ----------

export async function login(
  email: string,
  password: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        contrasena: password, // 👈 campo que espera tu backend
      }),
    });

    if (!res.ok) {
      return false;
    }

    const data: { access_token: string; user: BackendUser } = await res.json();

    safeSet<Session>(keySession, {
      token: data.access_token,
      user: data.user,
    });

    return true;
  } catch (e) {
    console.error("Error en login:", e);
    return false;
  }
}

export async function register(
  nombre: string,
  email: string,
  password: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        email,
        contrasena: password, // 👈 mismo nombre que en el backend
      }),
    });

    if (!res.ok) {
      return false;
    }

    const data: { access_token: string; user: BackendUser } = await res.json();

    // Opcional: al registrarse también lo dejas logueado
    safeSet<Session>(keySession, {
      token: data.access_token,
      user: data.user,
    });

    return true;
  } catch (e) {
    console.error("Error en register:", e);
    return false;
  }
}

// ---------- Helper para peticiones autenticadas ----------

export async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const session = getSession();
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (session?.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
}
