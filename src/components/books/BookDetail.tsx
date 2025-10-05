'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RatingStars from '../reviews/RatingStars';
import AddReviewForm from '../reviews/AddReviewForm';
import ReviewList from '../reviews/ReviewList';
import type { Review } from '@/types/review';
import type { Book } from '@/types/book';
import BotonPersonalizado from '../elementos/BotonPersonalizado';
import { useTranslations, useLocale } from 'next-intl';

interface BookDetailProps {
  book: Book;
  initialReviews: Review[];
  previousPage:string;
  previousPageHref:string;
}

export default function BookDetail({ book, initialReviews, previousPage,previousPageHref }: BookDetailProps) {
    const locale = useLocale();
    const t = useTranslations('bookDetail');

    // Función helper para obtener traducciones con fallback
    const getTranslation = (key: string, fallback: string) => {
      try {
        return t(key);
      } catch {
        if (locale === 'en') {
          // Fallbacks en inglés
          const englishFallbacks: Record<string, string> = {
            'buttons.bookDetails': 'Book Details',
            'buttons.share': 'Share',
            'labels.addToCollection': 'Add to collection:',
            'labels.selectCollection': 'Select collection',
            'labels.favoritos': 'Favorites',
            'labels.pendientes': 'To Read',
            'labels.leidos': 'Read',
            'labels.reviews': 'reviews',
            'labels.reviewsTitle': 'Reviews',
            'labels.by': 'by'
          };
          return englishFallbacks[key] || fallback;
        } else {
          return fallback;
        }
      }
    };

    // Manejador para añadir reseñas (optimista)
    const [reviews, setReviews] = useState<Review[]>(initialReviews);

    const handleAddReview = (newReview: Review) => {
       setReviews([newReview, ...reviews]);
    };

    // Manejador para actualizar likes/dislikes
    const handleLikeUpdate = (reviewId: string, likes: number, dislikes: number) => {
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === reviewId 
            ? { ...review, likes, dislikes }
            : review
        )
      );
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
  <article className="max-w-5xl mx-auto text-black px-6 py-8 bg-white">
    {/* Skip link para accesibilidad */}
    <a 
      href="#book-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {getTranslation('skipToBookContent', 'Ir al contenido del libro')}
    </a>

    {/* Breadcrumb navigation */}
    <nav aria-label={getTranslation('breadcrumb.navigation', 'Navegación de migas de pan')} className="text-sm text-[var(--colorSecundario)] mb-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href={previousPageHref}
            className="hover:underline cursor-pointer text-[var(--colorSecundario)] focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
            aria-label={`Volver a ${previousPage}`}
          >
            {previousPage}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">
          <span className="font-medium">{book.title}</span>
        </li>
      </ol>
    </nav>

    {/* Imagen + info */}
    <header id="book-content" className="flex flex-col md:flex-row gap-8 mb-8">
      <div className="relative w-[250px] h-[350px] flex-shrink-0 mx-auto md:mx-0">
        <Image
          src={book.cover || '/placeholder-cover.png'}
          alt={`Portada del libro "${book.title}" por ${book.author}`}
          fill
          className="object-cover rounded-lg shadow-lg"
          sizes="(max-width: 768px) 250px, 250px"
          priority
        />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <div>
          <h1 className="text-3xl font-bold text-[var(--colorPrincipal)] mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-[var(--colorSecundario)]">
            <span className="sr-only">{getTranslation('labels.by', 'por')}</span>
            <strong>{book.author}</strong>
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-3 flex-wrap" role="group" aria-label={getTranslation('actions.bookActions', 'Acciones del libro')}>
          <BotonPersonalizado
            texto={getTranslation('buttons.bookDetails', 'Detalles del libro')}
            href={book.infoURL || '#'}
            ariaLabel={getTranslation('buttons.bookDetailsAriaLabel', `Ver más detalles sobre ${book.title}`)}
          />
          <BotonPersonalizado
            texto={getTranslation('buttons.share', 'Compartir')}
            href={'#'}
            ariaLabel={getTranslation('buttons.shareAriaLabel', `Compartir el libro ${book.title}`)}
          />
        </div>

        <div className="space-y-4">
          <section aria-labelledby="description-heading">
            <h2 id="description-heading" className="sr-only">
              {getTranslation('labels.description', 'Descripción del libro')}
            </h2>
            <p className="text-[var(--colorSecundario)] leading-relaxed">{book.description}</p>
          </section>

          {/* Géneros */}
          {book.genres && book.genres.length > 0 && (
            <section aria-labelledby="genres-heading">
              <h2 id="genres-heading" className="sr-only">
                {getTranslation('labels.genres', 'Géneros del libro')}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2" role="list">
                {book.genres.map((g) => (
                  <span
                    key={g}
                    role="listitem"
                    className="px-3 py-1 bg-[var(--colorMenus)] text-white rounded-full text-sm"
                    aria-label={`Género: ${g}`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Añadir a colección */}
          <section aria-labelledby="collection-heading" className="mt-4">
            <h2 id="collection-heading" className="font-semibold text-[var(--colorSecundario)] mb-2">
              {getTranslation('labels.addToCollection', 'Añadir a colección:')}
            </h2>
            <label htmlFor="collection-select" className="sr-only">
              {getTranslation('labels.selectCollectionLabel', 'Seleccionar colección para añadir el libro')}
            </label>
            <select 
              id="collection-select"
              className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-[var(--colorSecundario)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-describedby="collection-help"
            >
              <option value="">{getTranslation('labels.selectCollection', 'Selecciona colección')}</option>
              <option value="favoritos">{getTranslation('labels.favoritos', 'Favoritos')}</option>
              <option value="pendientes">{getTranslation('labels.pendientes', 'Pendientes')}</option>
              <option value="leídos">{getTranslation('labels.leidos', 'Leídos')}</option>
            </select>
            <p id="collection-help" className="sr-only">
              {getTranslation('help.collectionSelect', 'Usa las flechas para navegar y Enter para seleccionar una colección')}
            </p>
          </section>
        </div>
      </div>
    </header>

    {/* Gráfica de reseñas */}
    <section aria-labelledby="rating-stats-heading" className="mt-10">
      <h2 id="rating-stats-heading" className="sr-only">
        {getTranslation('labels.ratingStatistics', 'Estadísticas de calificaciones')}
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Promedio */}
        <div className="flex flex-col items-center w-full md:w-1/4" role="group" aria-labelledby="average-rating">
          <div id="average-rating" className="text-center">
            <div className="text-5xl font-bold text-[var(--colorMenus)]" aria-label={`Calificación promedio: ${average.toFixed(1)} de 5 estrellas`}>
              {average.toFixed(1)}
            </div>
            <div aria-hidden="true">
              <RatingStars value={average} readOnly />
            </div>
            <p className="text-[var(--colorSecundario)] mt-2">
              <span className="font-medium">{total}</span> {getTranslation('labels.reviews', 'reseñas')}
            </p>
          </div>
        </div>

        {/* Barras */}
        <div className="flex-1 space-y-2" role="group" aria-labelledby="rating-distribution">
          <h3 id="rating-distribution" className="sr-only">
            {getTranslation('labels.ratingDistribution', 'Distribución de calificaciones')}
          </h3>
          {[5, 4, 3, 2, 1].map((star, i) => {
            const percent = total ? (counts[i] / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2" role="group" aria-label={`${star} estrellas: ${percent.toFixed(0)}% de las reseñas`}>
                <span className="w-6 text-[var(--colorSecundario)]" aria-hidden="true">{star}★</span>
                <div className="flex-1 h-3 bg-gray-200 rounded overflow-hidden" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${percent.toFixed(0)}% de calificaciones de ${star} estrella${star > 1 ? 's' : ''}`}>
                  <div
                    className="h-3 bg-[var(--colorMenus)] rounded transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-[var(--colorSecundario)]" aria-hidden="true">
                  {percent.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Reseñas */}
    <section aria-labelledby="reviews-heading" className="mt-10">
      <h2 id="reviews-heading" className="text-xl font-semibold mb-4 text-[var(--colorSecundario)]">
        {getTranslation('labels.reviewsTitle', 'Reseñas')}
      </h2>
      
      <div className="space-y-6">
        <div aria-labelledby="add-review-heading">
          <h3 id="add-review-heading" className="sr-only">
            {getTranslation('labels.addReviewTitle', 'Añadir nueva reseña')}
          </h3>
          <AddReviewForm onAdd={handleAddReview} />
        </div>
        
        <div aria-live="polite" aria-labelledby="reviews-list-heading">
          <h3 id="reviews-list-heading" className="sr-only">
            {getTranslation('labels.reviewsListTitle', 'Lista de reseñas')}
          </h3>
          <ReviewList reviews={reviews} onLikeUpdate={handleLikeUpdate} />
        </div>
      </div>
    </section>
  </article>
);  
};

