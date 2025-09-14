'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RatingStars from './RatingStars';
import AddReviewForm from './AddReviewForm';
import ReviewList from './ReviewList';
import type { Review } from '@/types/review';
import type { Book } from '@/types/book';

interface BookDetailProps {
  book: Book;
  initialReviews: Review[];
}

export default function BookDetail({ book, initialReviews }: BookDetailProps) {
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
    <div className="text-sm text-gray-600 mb-4">
      <Link
        href="/miBiblioteca"
        className="hover:underline cursor-pointer text-[var(--colorCafe, #6B4226)]"
      >
        Mi Biblioteca
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
        <h1 className="text-3xl font-bold text-[var(--colorCafe, #6B4226)]">
          {book.title}
        </h1>
        <p className="text-lg text-gray-700">por {book.author}</p>

        {/* Botones */}
        <div className="flex gap-3">
          <a
            href={book.infoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[var(--colorCafe, #A67C52)] text-[var(--colorCafe, #6B4226)] rounded-md text-sm hover:bg-[var(--colorCafe, #A67C52)] hover:text-white transition"
          >
            📖 Detalles del libro
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(pageUrl)}
            className="px-4 py-2 border border-[var(--colorCafe, #A67C52)] text-[var(--colorCafe, #6B4226)] rounded-md text-sm flex items-center gap-1 hover:bg-[var(--colorCafe, #A67C52)] hover:text-white transition"
          >
            📤 Compartir
          </button>
        </div>

        <p className="text-gray-800">{book.description}</p>

        {/* Géneros */}
        <div className="flex flex-wrap gap-2 mt-2">
          {book.genres?.map((g) => (
            <span
              key={g}
              className="px-3 py-1 bg-[var(--colorCafeSuave,#F5E6DA)] text-[var(--colorCafe,#6B4226)] rounded-full text-sm"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Añadir a colección */}
        <div className="mt-4">
          <p className="font-semibold text-[var(--colorCafe,#6B4226)]">Añadir a colección:</p>
          <select className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-gray-800">
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
        <h2 className="text-5xl font-bold text-[var(--colorCafe,#6B4226)]">{average.toFixed(1)}</h2>
        <RatingStars value={average} readOnly />
        <p className="text-gray-600">{total} reseñas</p>
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
                  className="h-3 bg-[var(--colorCafe,#A67C52)] rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-10 text-right text-sm text-gray-600">
                {percent.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Reseñas */}
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4 text-[var(--colorCafe,#6B4226)]">Reseñas</h3>
      <AddReviewForm onAdd={handleAddReview} />
      <ReviewList reviews={reviews} />
    </div>
  </div>
);  
};

