'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RatingStars from './RatingStars';
import AddReviewForm from './AddReviewForm';
import ReviewList from './ReviewList';
import type { Review } from '@/types/review';
import type { Book } from '@/types/book';
import BotonPersonalizado from './BotonPersonalizado';

interface BookDetailProps {
  book: Book;
  initialReviews: Review[];
  previousPage:string;
  previousPageHref:string;
}

export default function BookDetail({ book, initialReviews, previousPage,previousPageHref }: BookDetailProps) {
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";

    // Manejador para añadir reseñas (optimista)
    const [reviews, setReviews] = useState<Review[]>(initialReviews);

    const handleAddReview = (newReview: Review) => {
       setReviews([newReview, ...reviews]);
    };

    //Calcular el promedio de las reseñas y que no sea estatico
    const total = reviews.length;
    const average = total
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
      : 0;
    const counts = [5, 4, 3, 2, 1].map(
      (star) => reviews.filter((r) => r.rating === star).length
    );


  return ( 
  <div className="max-w-5xl mx-auto text-black px-6 py-8 bg-white">
    {/* Path */}
    <div className="text-sm text-[var(--colorSecundario)] mb-4">
      <Link
        href={previousPageHref}
        className="hover:underline cursor-pointer text-[var(--colorSecundario)]"
      >
        {previousPage}
      </Link>{" "}
      / <span>{book.title}</span>
    </div>

    {/* Imagen + info */}
    <div className="flex flex-col md:flex-row gap-8">
      <div className="relative w-[250px] h-[350px] flex-shrink-0">
        <Image
          src={book.cover || '/placeholder-cover.png'}
          alt={`Portada de ${book.title}`}
          fill
          className="object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <h1 className="text-3xl font-bold text-[var(--colorPrincipal)]">
          {book.title}
        </h1>
        <p className="text-lg text-[var(--colorSecundario)]">por {book.author}</p>

        {/* Botones */}
        <div className="flex gap-3">
          <BotonPersonalizado
            texto="Detalles del libro"
            href={book.infoURL || '#'}
          />
          <BotonPersonalizado
            texto="Compartir"
            href={'#'}
          />
          
        </div>

        <p className="text-[var(--colorSecundario)]">{book.description}</p>

        {/* Géneros */}
        <div className="flex flex-wrap gap-2 mt-2">
          {book.genres?.map((g) => (
            <span
              key={g}
              className="px-3 py-1 bg-[var(--colorMenus)] text-white rounded-full text-sm"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Añadir a colección */}
        <div className="mt-4">
          <p className="font-semibold text-[var(--colorSecundario)]">Añadir a colección:</p>
          <select className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-[var(--colorSecundario)]">
            <option value="">Selecciona colección</option>
            <option value="favoritos">Favoritos</option>
            <option value="pendientes">Pendientes</option>
            <option value="leídos">Leídos</option>
          </select>
        </div>
      </div>
    </div>

    {/* Gráfica de reseñas */}
    <div className="mt-10 flex gap-8">
      {/* Promedio */}
      <div className="flex flex-col items-center w-1/4">
        <h2 className="text-5xl font-bold text-[var(--colorMenus)]">{average.toFixed(1)}</h2>
        <RatingStars value={average} readOnly />
        <p className="text-[var(--colorSecundario)]">{total} reseñas</p>
      </div>

      {/* Barras */}
      <div className="flex-1 space-y-2">
        {[5, 4, 3, 2, 1].map((star, i) => {
          const percent = total ? (counts[i] / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-6">{star}★</span>
              <div className="flex-1 h-3 bg-gray-200 rounded">
                <div
                  className="h-3 bg-[var(--colorMenus)] rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-10 text-right text-sm text-[var(--colorSecundario)]">
                {percent.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Reseñas */}
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4 text-[var(--colorSecundario)]">Reseñas</h3>
      <AddReviewForm onAdd={handleAddReview} />
      <ReviewList reviews={reviews} />
    </div>
  </div>
);  
};

