'use client';
import BookDetail from '../../../../../components/books/BookDetail';
import { userBooks } from '@/lib/mock-data';
import { useTranslatedContent } from '@/lib/useTranslatedContent';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { use } from 'react';

// Esta función de Next.js recibe los parámetros de la URL
export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { getTranslatedBook } = useTranslatedContent();
  const tMiBiblioteca = useTranslations('miBiblioteca');
  const tBookDetail = useTranslations('bookDetail');
  
  // Unwrap params usando React.use()
  const { id } = use(params);
  
  // Buscamos el libro en nuestros datos usando el ID de la URL
  const originalBook = userBooks.find((b) => b.id === id);

  // Si no se encuentra el libro, mostramos un mensaje amigable
  if (!originalBook) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">{tBookDetail('errors.bookNotFound')}</h1>
        <p className="mt-4">{tBookDetail('errors.bookNotFoundDesc')}</p>
        <Link href="/miBiblioteca" className="mt-6 inline-block bg-[var(--colorPrincipal)] text-white px-6 py-2 rounded-md">
          {tBookDetail('errors.backToLibrary')}
        </Link>
      </div>
    );
  }

  // Obtener el libro traducido
  const book = getTranslatedBook(originalBook);

  // Si se encuentra el libro, mostramos todos sus detalles traducidos
  return (
    <BookDetail 
      book={book} 
      initialReviews={book.reviews} 
      previousPage={tMiBiblioteca('menu.myLibrary')} 
      previousPageHref={'/miBiblioteca'} 
    />
  );
}