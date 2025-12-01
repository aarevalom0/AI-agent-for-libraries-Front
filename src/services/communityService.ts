import { API_BASE_URL } from './api.config';

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

