// src/services/notasService.ts
import { apiFetch } from "@/lib/authClient";

export type Nota = {
  id: string;
  usuario_id: string;
  libro_id: string;
  capitulo: number;
  contenido: string;
  fecha_creacion: string;
};

export async function crearNota(
  lecturaId: string,
  input: { capitulo: number; contenido: string }
): Promise<Nota> {
  const res = await apiFetch(`/lecturas/${lecturaId}/notas`, {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Backend error al crear nota:", res.status, text);
    throw new Error("Error al crear nota");
  }

  return res.json();
}
