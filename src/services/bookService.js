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

    console.log('Datos crudos del backend:', b);
    console.log('Campo autores del backend:', b.autores);

    // Normalización para el front
    return {
      id: b._id || b.id,
      title: b.titulo || b.title || 'Sin título',
      author: b.author?.buffer ? String.fromCharCode(...Object.values(b.author.buffer)) : Array.isArray(b.autores) ? b.autores[0] : 'Autor desconocido',
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

// Function to fetch author details by ID
const fetchAuthorDetails = async (authorId) => {
  try {
    console.log('Fetching author details for ID:', authorId); // Log the author ID
    const response = await fetch(`/api/authors/${authorId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch author with ID: ${authorId}`);
    }
    const authorData = await response.json();
    console.log('Author details fetched:', authorData); // Log the fetched author data
    return authorData;
  } catch (error) {
    console.error('Error fetching author details:', error);
    return { name: 'Autor desconocido' }; // Fallback in case of error
  }
};

// Function to get author from translation context
const getAuthorFromTranslationContext = (translationContext, translationKey) => {
  console.log('Translation context:', translationContext); // Log the translation context
  console.log('Translation key:', translationKey); // Log the translation key

  // Normalize the translationKey to match the title format in messages
  const normalizedKey = translationKey.replace(/_/g, ' ');
  console.log('Normalized translation key:', normalizedKey); // Log the normalized key

  console.log('Available titles in messages:', translationContext.messages.map(msg => msg.title)); // Log all titles in messages
  console.log('Normalized translation key being searched:', normalizedKey); // Log the normalized key being searched

  const message = translationContext.messages.find(
    (msg) => msg.title === normalizedKey
  );

  if (message) {
    console.log('Found message:', message); // Log the found message
    return message.author || 'Autor desconocido';
  }

  console.warn('Message not found for key:', translationKey);
  return 'Autor desconocido';
};

// Function to enhance book data with author details
const enhanceBookWithAuthor = async (book) => {
  console.log('Enhancing book:', book); // Log the book data before enhancement
  if (book.authorId) {
    const author = await fetchAuthorDetails(book.authorId);
    const enhancedBook = { ...book, author };
    console.log('Enhanced book:', enhancedBook); // Log the book after enhancement
    return enhancedBook;
  }
  return book;
};

// Example usage: Enhance books with author details
const fetchBooksWithAuthors = async () => {
  const books = await getAllBooks(); // Assuming fetchBooks fetches the list of books
  return Promise.all(books.map(enhanceBookWithAuthor));
};

export function getRandomBooks(books, count = 5) {
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

