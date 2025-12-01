import { apiFetch } from "@/lib/authClient";

export type SesionLectura = {
  id: string;
  usuario_id: string;
  libro_id: string;
  fecha: string;           // ISO
  tiempo_lectura: number;  // minutos
  paginas_leidas: number;
};

const BASE = "/sesion-lectura";

export async function crearSesionLectura(input: {
  libro_id: string;
  fecha?: string;
  tiempo_lectura?: number;
  paginas_leidas?: number;
}): Promise<SesionLectura> {
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

  return res.json();
}

export async function actualizarSesionLectura(
  id: string,
  input: {
    libro_id?: string;
    fecha?: string;
    tiempo_lectura?: number;
    paginas_leidas?: number;
  },
): Promise<SesionLectura> {
  const res = await apiFetch(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    console.error(
      "actualizarSesionLectura ERROR",
      res.status,
      await res.text(),
    );
    throw new Error("Error al actualizar sesión de lectura");
  }

  return res.json();
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

  return res.json();
}
