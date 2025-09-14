'use client';
import ReviewItem from './ReviewItem';
import type { Review } from '@/types/review';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="divide-y">
      {reviews.map((r) => (
        <ReviewItem key={r.id} review={r} />
      ))}
    </div>
  );
};

export default ReviewList;
