"use client";
import { useState } from "react";
import RatingStars from "./RatingStars";
import type { Review } from '@/types/review';
import { useTranslations, useLocale } from 'next-intl';

type AddReviewFormProps = {
  onAdd: (r: Review) => void;
};

const AddReviewForm = ({ onAdd }: AddReviewFormProps) => {
  const locale = useLocale();
  const t = useTranslations('bookDetail');
  
  // Función helper para obtener traducciones con fallback
  const getTranslation = (key: string, fallback: string) => {
    try {
      return t(key);
    } catch {
      if (locale === 'en') {
        const englishFallbacks: Record<string, string> = {
          'labels.rating': 'Your rating:',
          'placeholders.writeReview': 'Write a comment...',
          'buttons.submitReview': 'Submit Review',
          'messages.submitting': 'Submitting...',
          'validation.pleaseRate': 'Please provide your rating (stars) and a comment.'
        };
        return englishFallbacks[key] || fallback;
      } else {
        return fallback;
      }
    }
  };

  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !text.trim()) return alert(getTranslation('validation.pleaseRate', 'Pon tu calificación (estrellas) y un comentario.'));
    setLoading(true);

    const newReview: Review = {
      id: String(Date.now()),
      author: "Tú",
      avatar: "/avatar-you.png",
      rating,
      text: text.trim(),
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };

    onAdd(newReview); // Optimista

    setText("");
    setRating(0);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl border border-[var(--colorSecundario)] shadow-md space-y-4"
    >
      {/* Estrellas */}
      <div>
        <p className="text-sm text-[var(--colorSecundario)] mb-1">{getTranslation('labels.rating', 'Tu calificación:')}</p>
        <RatingStars value={rating} onChange={setRating} />
      </div>

      {/* Comentario */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={getTranslation('placeholders.writeReview', 'Escribe un comentario...')}
        rows={4}
        className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--colorPrincipal)]"
      />

      {/* Botón */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[var(--colorMenus)] hover:bg-[var(--colorSecundario)] text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          {loading ? getTranslation('messages.submitting', 'Enviando...') : getTranslation('buttons.submitReview', 'Enviar Reseña')}
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;
