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
  if (!res.ok) throw new Error("Error al obtener lecturas");
  return res.json();
}

export async function getLectura(id: string): Promise<Lectura> {
  const res = await apiFetch(`/lecturas/${id}`, { method: "GET" });
  if (!res.ok) throw new Error("Lectura no encontrada");
  return res.json();
}

// si en el back ya tomas usuario_id del JWT, aquí NO lo envías
export async function createLectura(input: {
  libro_id: string;
  porcentaje_lectura: number;
  notas?: string[];
}) {
  const res = await apiFetch("/lecturas", {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Error al crear lectura");
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
  if (!res.ok) throw new Error("Error al actualizar lectura");
  return res.json();
}

export async function deleteLectura(id: string) {
  const res = await apiFetch(`/lecturas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar lectura");
}
