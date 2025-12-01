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
 * Obtiene un libro por su id desde el backend
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getBookById(id) {
  if (!id) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const b = await response.json();

    // Normalización para el front
    return {
      id: b._id || b.id,
      title: b.titulo || b.title || 'Sin título',
      author: Array.isArray(b.autores) ? b.autores[0] : 'Autor desconocido',
      cover: b.portada || '/placeholder-book.jpg',
      genres: b.genero ? [b.genero] : [],
      description: b.descripcion || '',
      reviews: []
    };

  } catch (error) {
    console.error('Error obteniendo libro por id:', error);
    throw error;
  }
}



export function getRandomBooks(books, count = 5) {
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

