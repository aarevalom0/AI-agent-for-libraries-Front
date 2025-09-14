'use client';
import Image from 'next/image';
import RatingStars from './RatingStars';
import type { Review } from '@/types/review';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
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

        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <span>👍 {review.likes ?? 0}</span>
          <span>👎 {review.dislikes ?? 0}</span>
        </div>
      </div>
    </article>
  );
};

export default ReviewItem;
