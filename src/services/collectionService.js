import { API_BASE_URL } from './api.config';
/**
 * Obtiene todas las bibliotecas (colecciones) de un usuario
 */
export async function getUserCollections(userId) {
  if (!userId) {
    console.error('getUserCollections: userId es requerido');
    return [];
  }
  try {
    const response = await fetch(`${API_BASE_URL}/library/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      // Intentar leer el error del body si existe
      const errorBody = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorBody}`);
    }
    const data = await response.json();

    // Validación básica de que data es un array
    if (!Array.isArray(data)) {
      console.warn('getUserCollections: La respuesta no es un array', data);
      return [];
    }
    return data.map(lib => ({
      id: lib.id || lib._id, // Manejar ambos casos de ID
      nombre: lib.nombre || 'Sin nombre',
      icon: lib.icon || "list",
      descripcion: lib.descripcion || '',
      totalLibros: Array.isArray(lib.libros) ? lib.libros.length : 0
    }));
  } catch (error) {
    console.error('Error obteniendo colecciones:', error);
    return [];
  }
}
/**
 * Obtiene los detalles de una biblioteca específica
 */
export async function getCollectionDetails(libraryId) {
  if (!libraryId) return null;
  try {
    const response = await fetch(`${API_BASE_URL}/library/${libraryId}/with-books`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const library = await response.json();
    if (!library) return null;
    // Asegurar que libros es un array
    const librosRaw = Array.isArray(library.libros) ? library.libros : [];
    return {
      id: library.id || library._id,
      nombre: library.nombre,
      descripcion: library.descripcion,
      libros: librosRaw
        .filter(item => item && item.libro_id) // Filtrar items inválidos
        .map(item => {
          // Manejo defensivo de libro_id (puede venir populado o no)
          const libroData = item.libro_id || {};

          return {
            id: libroData._id || libroData.id || 'unknown-id',
            title: libroData.titulo || 'Libro no disponible',
            author: libroData.autores?.[0]?.nombre || 'Autor desconocido',
            cover: libroData.portada || '/placeholder-book.jpg', // Fallback de imagen

            // Metadatos de la librería
            estado: item.estado || 'por_leer',
            fechaAgregado: item.fecha_agregado,
            progreso: item.progreso?.porcentaje || 0,
            paginaActual: item.progreso?.pagina_actual || 0
          };
        })
    };
  } catch (error) {
    console.error(`Error obteniendo biblioteca ${libraryId}:`, error);
    return null;
  }
}
/**
 * Obtiene TODOS los libros (Vista "Mi Biblioteca")
 */
export async function getAllUserBooks(userId) {
  if (!userId) return [];
  try {
    const response = await fetch(`${API_BASE_URL}/library/user/${userId}/all-books`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const books = await response.json();

    if (!Array.isArray(books)) return [];
    return books.map(book => ({
      id: book._id || book.id,
      title: book.titulo || 'Sin título',
      author: book.autores?.[0]?.nombre || 'Autor desconocido',
      cover: book.portada || '/placeholder-book.jpg',
      estado: book.estado
    }));
  } catch (error) {
    console.error('Error obteniendo todos los libros:', error);
    return [];
  }
}
/**
 * Crea una nueva biblioteca
 */
export async function createCollection(userId, token, nombre, descripcion, icon) {
  try {
    const cuerpo = {
        usuario_id: userId,
        nombre,
        descripcion,
        icon,
        libros: []
      }
    console.log(token);
    const response = await fetch(`${API_BASE_URL}/library`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(cuerpo)
    });
    console.log(response);
    if (!response.ok) throw new Error('Error al crear biblioteca');
    return await response.json();
  } catch (error) {
    console.error('Error creando colección:', error);
    throw error;
  }
}