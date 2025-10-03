import BookDetail from '../../../../../components/books/BookDetail';
import { userBooks } from '@/lib/mock-data';
import Link from 'next/link';

// Esta función de Next.js recibe los parámetros de la URL
export default function BookDetailPage({ params }: { params: { id: string } }) {
  // Buscamos el libro en nuestros datos usando el ID de la URL
  const book = userBooks.find((b) => b.id === params.id);

  // Si no se encuentra el libro, mostramos un mensaje amigable
  if (!book) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Libro no encontrado</h1>
        <p className="mt-4">El libro que buscas no existe o ha sido movido.</p>
        <Link href="/miBiblioteca" className="mt-6 inline-block bg-[var(--colorPrincipal)] text-white px-6 py-2 rounded-md">
          Volver a Mi Biblioteca
        </Link>
      </div>
    );
  }

  // Si se encuentra el libro, mostramos todos sus detalles
  return (
    <BookDetail 
      book={book} 
      initialReviews={book.reviews} 
      previousPage={'Mi biblioteca'} 
      previousPageHref={'/miBiblioteca'} 
    />
  );
}