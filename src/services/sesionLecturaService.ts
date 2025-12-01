// src/services/sesionLecturaService.ts
import { apiFetch } from "@/lib/authClient";

export type SesionLectura = {
  id: string;
  lectura_id: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  paginas_leidas: number;
  tiempo_minutos: number;
};

const BASE = "/sesion-lectura"; // o "/sesiones-lectura" según tu controller

export async function crearSesionLectura(input: {
  lectura_id: string;
}) {
  const res = await apiFetch(BASE, {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    console.error(
      "crearSesionLectura ERROR",
      res.status,
      await res.text(),
    );
    throw new Error("Error al crear sesión de lectura");
  }

  return res.json() as Promise<SesionLectura>;
}

export async function cerrarSesionLectura(
  id: string,
  input: {
    lectura_id: string;        // 👈 importante
    paginas_leidas: number;
    tiempo_minutos: number;
  },
) {
  const res = await apiFetch(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    console.error(
      "cerrarSesionLectura ERROR",
      res.status,
      await res.text(),
    );
    throw new Error("Error al cerrar sesión de lectura");
  }

  return res.json() as Promise<SesionLectura>;
}

export async function getSesionesPorLectura(
  lecturaId: string,
): Promise<SesionLectura[]> {
  const res = await apiFetch(`${BASE}/lectura/${lecturaId}`, {
    method: "GET",
  });

  if (!res.ok) {
    console.error(
      "getSesionesPorLectura ERROR",
      res.status,
      await res.text(),
    );
    throw new Error("Error al obtener sesiones de lectura");
  }

  return res.json() as Promise<SesionLectura[]>;
}
