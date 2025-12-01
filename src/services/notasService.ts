// src/services/notasService.ts
import { apiFetch } from "@/lib/authClient";

export type Nota = {
  id: string;
  usuario_id: string;
  libro_id: string;
  capitulo?: number;
  contenido: string;
  pagina?: number;
  createdAt: string;
};

export async function crearNota(input: {
  libro_id: string;
  contenido: string;
  capitulo?: number;
  pagina?: number;
}) {
  const res = await apiFetch("/notas", {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Error al crear nota");
  return res.json();
}

export async function getNotasByLectura(
  lecturaId: string,
): Promise<Nota[]> {
  const res = await apiFetch(`/lecturas/${lecturaId}/notas`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error al obtener notas");
  return res.json();
}
