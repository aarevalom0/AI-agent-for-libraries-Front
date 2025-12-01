import { API_BASE_URL } from './api.config';
import { getSession } from "@/lib/authClient";

/**
 * Obtiene todas las comunidades desde el backend.
 * @returns {Promise<Array>} Array de comunidades.
 * 
 */
export async function getAllCommunities() {
  try {
    const response = await fetch(`${API_BASE_URL}/community`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log("Los datos fueron", data)
    return data;
  } catch (error) {
    console.error('Error obteniendo comunidades:', error);
    throw error;
  }
}

export async function createCommunity(formData: FormData) {
  try {
    const session = getSession();
    if (!session?.token) {
      throw new Error("No autenticado: token no encontrado.");
    }

    const token = session.token; 
    const response = await fetch(`${API_BASE_URL}/community`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`Error HTTP: ${response.status} => ${msg}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creando comunidad:", error);
    throw error;
  }
}
