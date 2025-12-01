import { useTranslations, useLocale } from 'next-intl';
import type { Book } from '@/types/book';
import type { Review } from '@/types/review';

export function useTranslatedContent() {
  const locale = useLocale();
  const t = useTranslations('booksContent');

  const getTranslatedReview = (review: Review): Review => {
    try {
      const translatedAuthor = t(`reviews.${review.id}.author`);
      const translatedText = t(`reviews.${review.id}.text`);

      return {
        ...review,
        author: translatedAuthor || review.author,
        text: translatedText || review.text,
      };
    } catch (error) {
      // Si hay error con las traducciones, retorna la reseña original
      console.log(`Translation error for review ${review.id}:`, error);
      return review;
    }
  };

  const getTranslatedBook = (book: Book): Book => {
    try {
      const translationKey = book.title.replace(/\s+/g, '_');
      const messages = (typeof t.raw() === 'object' && t.raw() !== null) ? t.raw() : {};
      const bookTranslation = Object.values(messages)?.find((entry: any) => entry.title === book.title);

      const translatedTitle = bookTranslation?.title || book.title;
      const translatedAuthor = bookTranslation?.author || (typeof book.author === 'string' ? book.author : Array.isArray(book.author) ? book.author[0] : 'Autor desconocido');
      const translatedDescription = bookTranslation?.description || book.description;
      const translatedGenres = bookTranslation?.genres || book.genres || [];

      // Traducir también las reseñas del libro
      const translatedReviews = Array.isArray(book.reviews) ? book.reviews.map(review => getTranslatedReview(review)) : [];

      // Manejo explícito de errores de traducción
      if (!translatedTitle || translatedTitle.startsWith('booksContent.')) {
        console.warn(`Missing translation for title: books.${translationKey}.title`);
      }
      if (!translatedAuthor || translatedAuthor.startsWith('booksContent.')) {
        console.warn(`Missing translation for author: books.${translationKey}.author`);
      }
      if (!translatedDescription || translatedDescription.startsWith('booksContent.')) {
        console.warn(`Missing translation for description: books.${translationKey}.description`);
      }

      // Log the translation context and key for debugging
      const translationContext = {
        locale,
        translationKey,
        messages: t.raw('books') // Verificar si las claves están disponibles
      };
      console.log('Translation context in useTranslatedContent:', translationContext);
      console.log('Translation key in useTranslatedContent:', translationKey);

      return {
        ...book,
        title: translatedTitle || book.title,
        author: translatedAuthor || book.author,
        description: translatedDescription || book.description,
        genres: translatedGenres?.length > 0 ? translatedGenres : book.genres,
        reviews: translatedReviews,
      };
    } catch (error) {
      // Si hay error con las traducciones, retorna el libro original
      console.log(`Translation error for book ${book.id}:`, error);
      return book;
    }
  };

  const getTranslatedBooks = (books: Book[]): Book[] => {
    return books.map(book => getTranslatedBook(book));
  };

  return {
    getTranslatedBook,
    getTranslatedReview,
    getTranslatedBooks,
    locale
  };
}