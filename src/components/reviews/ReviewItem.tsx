'use client';
import Image from 'next/image';
import RatingStars from './RatingStars';
import type { Review } from '@/types/review';
import { useState } from 'react';

interface ReviewItemProps {
  review: Review;
  onLikeUpdate?: (reviewId: string, likes: number, dislikes: number) => void;
}

const ReviewItem = ({ review, onLikeUpdate }: ReviewItemProps) => {
  const [currentLikes, setCurrentLikes] = useState(review.likes ?? 0);
  const [currentDislikes, setCurrentDislikes] = useState(review.dislikes ?? 0);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    let newLikes = currentLikes;
    let newDislikes = currentDislikes;

    if (userVote === 'like') {
      // Quitar like
      newLikes = currentLikes - 1;
      setUserVote(null);
    } else {
      // Agregar like
      newLikes = currentLikes + 1;
      // Si tenía dislike, quitarlo
      if (userVote === 'dislike') {
        newDislikes = currentDislikes - 1;
      }
      setUserVote('like');
    }

    setCurrentLikes(newLikes);
    setCurrentDislikes(newDislikes);
    onLikeUpdate?.(review.id, newLikes, newDislikes);
  };

  const handleDislike = () => {
    let newLikes = currentLikes;
    let newDislikes = currentDislikes;

    if (userVote === 'dislike') {
      // Quitar dislike
      newDislikes = currentDislikes - 1;
      setUserVote(null);
    } else {
      // Agregar dislike
      newDislikes = currentDislikes + 1;
      // Si tenía like, quitarlo
      if (userVote === 'like') {
        newLikes = currentLikes - 1;
      }
      setUserVote('dislike');
    }

    setCurrentLikes(newLikes);
    setCurrentDislikes(newDislikes);
    onLikeUpdate?.(review.id, newLikes, newDislikes);
  };
  return (
    <article className="flex gap-3 p-4 border-b">
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={review.avatar || '/avatar-default.png'}
          alt={`Avatar de ${review.author}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <strong>{review.author}</strong>
          <small className="text-gray-500">
            {new Date(review.date).toLocaleDateString()}
          </small>
        </div>

        <RatingStars value={review.rating} readOnly />

        <p className="mt-2">{review.text}</p>

        <div className="flex gap-4 text-sm mt-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              userVote === 'like'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Me gusta"
          >
            <span className={userVote === 'like' ? '👍' : '👍'}>👍</span>
            <span>{currentLikes}</span>
          </button>
          
          <button
            onClick={handleDislike}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
              userVote === 'dislike'
                ? 'bg-red-100 text-red-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="No me gusta"
          >
            <span className={userVote === 'dislike' ? '👎' : '👎'}>👎</span>
            <span>{currentDislikes}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ReviewItem;
