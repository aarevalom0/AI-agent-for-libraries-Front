// src/services/lecturasServices.ts
import { apiFetch } from "@/lib/authClient";

export type Lectura = {
  id: string;
  usuario_id: string;
  libro_id: string;
  porcentaje_lectura: number;
  notas: string[];
};

export async function getLecturas(): Promise<Lectura[]> {
  const res = await apiFetch("/lecturas", { method: "GET" });

  if (res.status === 401 || res.status === 403) {
    console.warn("No autorizado en /lecturas, devolviendo [].");
    return [];
  }

  if (res.status === 204) {
    return [];
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Error al obtener lecturas:", res.status, text);
    return [];
  }

  return res.json();
}

export async function getLectura(id: string): Promise<Lectura> {
  const res = await apiFetch(`/lecturas/${id}`, { method: "GET" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Error al obtener lectura:", res.status, text);
    throw new Error("Lectura no encontrada");
  }

  return res.json();
}

export async function createLectura(input: {
  libro_id: string;
  porcentaje_lectura: number;
  notas?: string[];
}) {
  const res = await apiFetch("/lecturas", {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (res.status === 401 || res.status === 403) {
    const text = await res.text().catch(() => "");
    console.error("No autorizado al crear lectura:", res.status, text);
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Error al crear lectura:", res.status, text);
    throw new Error("Error al crear lectura");
  }

  return res.json();
}

export async function updateLectura(
  id: string,
  input: Partial<{ porcentaje_lectura: number; notas: string[] }>,
) {
  const res = await apiFetch(`/lecturas/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Error al actualizar lectura:", res.status, text);
    throw new Error("Error al actualizar lectura");
  }

  return res.json();
}

export async function deleteLectura(id: string) {
  const res = await apiFetch(`/lecturas/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Error al eliminar lectura:", res.status, text);
    throw new Error("Error al eliminar lectura");
  }
}
