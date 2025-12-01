// src/lib/authClient.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api/v1";

export enum RolUsuario {
  LECTOR = "lector",
  AUTOR = "autor",
}

export type BackendUser = {
  id: string;
  nombre: string;
  email: string;
  rol: RolUsuario;
  foto_perfil: string | null;
  biografia: string | null;

  generos_preferidos: string[];

  estadisticas: {
    total_libros_leidos: number;
    total_paginas_leidas: number;
    tiempo_total_lectura: number;
    generos_leidos: string[];
  };

  racha_lectura: {
    dias_consecutivos: number;
    fecha_inicio_racha: Date | null;
    ultima_fecha_lectura: Date | null;
  };

  librerias: string[];
  insignias: string[];

  createdAt: Date;
  updatedAt: Date;
};

type Session = {
  token: string;
  user: BackendUser;
};

const keySession = "lecturium_session";

// ---------- Helpers seguros para localStorage ----------

function safeGet<T>(k: string, fb: T): T {
  if (typeof window === "undefined") return fb;
  try {
    const raw = window.localStorage.getItem(k);
    if (!raw) return fb;
    return JSON.parse(raw) as T;
  } catch {
    return fb;
  }
}

function safeSet<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(k, JSON.stringify(v));
  } catch {
    // ignore
  }
}

function safeRemove(k: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(k);
  } catch {
    // ignore
  }
}

// ---------- Normalización de token ----------

function normalizeToken(raw: unknown): string | null {
  if (!raw || typeof raw !== "string") return null;
  if (raw.startsWith("Bearer ")) {
    return raw.slice("Bearer ".length);
  }
  return raw;
}

// ---------- Sesión ----------

function getSession(): Session | null {
  const raw = safeGet<any>(keySession, null);
  if (!raw) return null;

  const token = normalizeToken(raw.token);
  if (!token) {
    safeRemove(keySession);
    return null;
  }

  return {
    token,
    user: raw.user as BackendUser,
  };
}

export function getCurrentUser(): BackendUser | null {
  return getSession()?.user ?? null;
}

export function isLoggedIn(): boolean {
  return !!getSession()?.token;
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
        contrasena: password,
      }),
    });

    if (!res.ok) {
      return false;
    }

    const data: any = await res.json();

    const token = normalizeToken(
      data.access_token ?? data.accessToken ?? data.token,
    );
    const user: BackendUser | undefined = data.user ?? data.usuario;

    if (!token || !user) {
      console.error("Respuesta de login sin token o user:", data);
      return false;
    }

    safeSet<Session>(keySession, { token, user });

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
        contrasena: password,
      }),
    });

    if (!res.ok) {
      return false;
    }

    const data: any = await res.json();

    const token = normalizeToken(
      data.access_token ?? data.accessToken ?? data.token,
    );
    const user: BackendUser | undefined = data.user ?? data.usuario;

    if (!token || !user) {
      console.error("Respuesta de register sin token o user:", data);
      return false;
    }

    safeSet<Session>(keySession, { token, user });

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
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (session?.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  const url = `${API_BASE_URL}${path}`;
  return fetch(url, {
    ...options,
    headers,
  });
}
