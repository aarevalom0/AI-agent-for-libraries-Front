import { API_BASE_URL } from './api.config';
/**
 * Obtiene la información de un autor por su ID
 * @param {string} authorId - ID del autor
 * @returns {Promise<Object>} Información del autor
 */
export async function getAuthorById(authorId) {
  try {
    const response = await fetch(`${API_BASE_URL}/authors/${authorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const author = await response.json();
    return author;
  } catch (error) {
    console.error(`Error obteniendo autor ${authorId}:`, error);
    return null; // Retornar null si falla
  }
}