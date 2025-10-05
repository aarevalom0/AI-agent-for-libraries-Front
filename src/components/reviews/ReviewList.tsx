'use client';
import ReviewItem from './ReviewItem';
import type { Review } from '@/types/review';

interface ReviewListProps {
  reviews: Review[];
  onLikeUpdate?: (reviewId: string, likes: number, dislikes: number) => void;
}

const ReviewList = ({ reviews, onLikeUpdate }: ReviewListProps) => {
  return (
    <div className="divide-y">
      {reviews.map((r) => (
        <ReviewItem 
          key={r.id} 
          review={r} 
          onLikeUpdate={onLikeUpdate}
        />
      ))}
    </div>
  );
};

export default ReviewList;
