import { useTranslations, useLocale } from 'next-intl';
import type { Book } from '@/types/book';
import type { Review } from '@/types/review';

export function useTranslatedContent() {
  const locale = useLocale();
  const t = useTranslations('booksContent');

  // Para las reseñas
const getTranslatedReview = (review: Review): Review => {
  try {
    const keyAuthor = `reviews.${review.id}.author`;
    const keyText = `reviews.${review.id}.text`;

    const translatedAuthor = t.exists(keyAuthor) ? t(keyAuthor) : review.author;
    const translatedText = t.exists(keyText) ? t(keyText) : review.text;

    return {
      ...review,
      author: translatedAuthor,
      text: translatedText,
    };
  } catch (error) {
    console.log(`Translation error for review ${review.id}:`, error);
    return review;
  }
};

// Para el libro
const getTranslatedBook = (book: Book): Book => {
  try {
    const translationKey = book.title.replace(/\s+/g, '_');
    const messages = t.raw() || {};
    const bookTranslation = Object.values(messages)?.find((entry: any) => entry.title === book.title) || {};

    const translatedTitle = bookTranslation?.title || book.title;
    const translatedAuthor = bookTranslation?.author || (typeof book.author === 'string' ? book.author : Array.isArray(book.author) ? book.author[0] : 'Autor desconocido');
    const translatedDescription = bookTranslation?.description || book.description;
    const translatedGenres = bookTranslation?.genres || book.genres || [];

    const translatedReviews = Array.isArray(book.reviews) ? book.reviews.map(getTranslatedReview) : [];

    return {
      ...book,
      title: translatedTitle,
      author: translatedAuthor,
      description: translatedDescription,
      genres: translatedGenres,
      reviews: translatedReviews,
    };
  } catch (error) {
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