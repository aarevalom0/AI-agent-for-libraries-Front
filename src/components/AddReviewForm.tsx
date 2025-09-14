"use client";
import { useState } from "react";
import RatingStars from "./RatingStars";
import type { Review } from '@/types/review';

type AddReviewFormProps = {
  onAdd: (r: Review) => void;
};

const AddReviewForm = ({ onAdd }: AddReviewFormProps) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !text.trim()) return alert("Pon tu calificación (estrellas) y un comentario.");
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
      className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md space-y-4"
    >
      {/* Estrellas */}
      <div>
        <p className="text-sm text-gray-300 mb-1">Tu calificación:</p>
        <RatingStars value={rating} onChange={setRating} />
      </div>

      {/* Comentario */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un comentario..."
        rows={4}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {/* Botón */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar Reseña"}
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;
