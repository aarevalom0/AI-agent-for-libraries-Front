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
      const translatedTitle = t(`books.${book.id}.title`);
      const translatedAuthor = t(`books.${book.id}.author`);
      const translatedDescription = t(`books.${book.id}.description`);
      const translatedGenres = t.raw(`books.${book.id}.genres`) as string[];

      // Traducir también las reseñas del libro
      const translatedReviews = book.reviews?.map(review => getTranslatedReview(review)) || [];

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