import { API_BASE_URL } from './api.config';

/**
 * Obtiene todos los libros del backend
 * @returns {Promise<Array>} Array de libros
 */
export async function getAllBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
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
    console.error('Error obteniendo libros:', error);
    throw error;
  }
}


/**
 * Selecciona N libros aleatorios de un array
 * @param {Array} books - Array de libros
 * @param {number} count - Cantidad de libros a seleccionar
 * @returns {Array} Array de libros aleatorios
 */
export function getRandomBooks(books, count = 5) {
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}