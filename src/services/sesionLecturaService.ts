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

export async function crearSesionLectura(input: {
  lectura_id: string;
}) {
  const res = await apiFetch("/sesion-lectura", {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Error al crear sesión de lectura");
  return res.json();
}

export async function cerrarSesionLectura(id: string, input: {
  paginas_leidas: number;
  tiempo_minutos: number;
}) {
  const res = await apiFetch(`/sesion-lectura/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Error al cerrar sesión de lectura");
  return res.json();
}

export async function getSesionesPorLectura(
  lecturaId: string,
): Promise<SesionLectura[]> {
  const res = await apiFetch(`/sesion-lectura/lectura/${lecturaId}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error al obtener sesiones");
  return res.json();
}
