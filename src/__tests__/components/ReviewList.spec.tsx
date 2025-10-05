import { render, screen } from '@testing-library/react'
import ReviewList from '@/components/reviews/ReviewList'
import type { Review } from '@/types/review'

// Mock ReviewItem component
jest.mock('@/components/reviews/ReviewItem', () => {
  const MockReviewItem = ({ review, onLikeUpdate }: { 
    review: Review; 
    onLikeUpdate?: (reviewId: string, likes: number, dislikes: number) => void 
  }) => (
    <div data-testid={`review-item-${review.id}`}>
      <span>Review by {review.author}</span>
      <span>{review.text}</span>
      <button 
        onClick={() => onLikeUpdate?.(review.id, 10, 5)}
        data-testid={`like-button-${review.id}`}
      >
        Like
      </button>
    </div>
  )
  MockReviewItem.displayName = 'MockReviewItem'
  return MockReviewItem
})

describe('ReviewList', () => {
  const mockReviews: Review[] = [
    {
      id: '1',
      author: 'John Doe',
      avatar: '/avatar1.png',
      rating: 5,
      text: 'Excellent book!',
      date: '2023-10-01T00:00:00.000Z',
      likes: 10,
      dislikes: 1
    },
    {
      id: '2',
      author: 'Jane Smith',
      avatar: '/avatar2.png',
      rating: 4,
      text: 'Really good read.',
      date: '2023-10-02T00:00:00.000Z',
      likes: 5,
      dislikes: 0
    },
    {
      id: '3',
      author: 'Bob Johnson',
      rating: 3,
      text: 'It was okay.',
      date: '2023-10-03T00:00:00.000Z',
      likes: 2,
      dislikes: 3
    }
  ]

  it('should render all reviews', () => {
    render(<ReviewList reviews={mockReviews} />)
    
    expect(screen.getByTestId('review-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('review-item-2')).toBeInTheDocument()
    expect(screen.getByTestId('review-item-3')).toBeInTheDocument()
  })

  it('should display review content correctly', () => {
    render(<ReviewList reviews={mockReviews} />)
    
    expect(screen.getByText('Review by John Doe')).toBeInTheDocument()
    expect(screen.getByText('Excellent book!')).toBeInTheDocument()
    expect(screen.getByText('Review by Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Really good read.')).toBeInTheDocument()
    expect(screen.getByText('Review by Bob Johnson')).toBeInTheDocument()
    expect(screen.getByText('It was okay.')).toBeInTheDocument()
  })

  it('should render empty list when no reviews provided', () => {
    render(<ReviewList reviews={[]} />)
    
    // Should not find any review items
    expect(screen.queryByTestId(/review-item-/)).not.toBeInTheDocument()
  })

  it('should pass onLikeUpdate callback to each ReviewItem', () => {
    const mockOnLikeUpdate = jest.fn()
    
    render(<ReviewList reviews={mockReviews} onLikeUpdate={mockOnLikeUpdate} />)
    
    // Should render all like buttons
    expect(screen.getByTestId('like-button-1')).toBeInTheDocument()
    expect(screen.getByTestId('like-button-2')).toBeInTheDocument()
    expect(screen.getByTestId('like-button-3')).toBeInTheDocument()
  })

  it('should call onLikeUpdate when a review item triggers it', () => {
    const mockOnLikeUpdate = jest.fn()
    
    render(<ReviewList reviews={mockReviews} onLikeUpdate={mockOnLikeUpdate} />)
    
    const likeButton = screen.getByTestId('like-button-1')
    likeButton.click()
    
    expect(mockOnLikeUpdate).toHaveBeenCalledWith('1', 10, 5)
  })

  it('should work without onLikeUpdate callback', () => {
    expect(() => {
      render(<ReviewList reviews={mockReviews} />)
    }).not.toThrow()
    
    expect(screen.getByTestId('review-item-1')).toBeInTheDocument()
  })

  it('should handle single review', () => {
    const singleReview = [mockReviews[0]]
    
    render(<ReviewList reviews={singleReview} />)
    
    expect(screen.getByTestId('review-item-1')).toBeInTheDocument()
    expect(screen.queryByTestId('review-item-2')).not.toBeInTheDocument()
    expect(screen.queryByTestId('review-item-3')).not.toBeInTheDocument()
  })

  it('should render reviews in the same order as provided', () => {
    render(<ReviewList reviews={mockReviews} />)
    
    const reviewItems = screen.getAllByTestId(/review-item-/)
    
    expect(reviewItems[0]).toHaveAttribute('data-testid', 'review-item-1')
    expect(reviewItems[1]).toHaveAttribute('data-testid', 'review-item-2')
    expect(reviewItems[2]).toHaveAttribute('data-testid', 'review-item-3')
  })

  it('should apply correct CSS classes', () => {
    const { container } = render(<ReviewList reviews={mockReviews} />)
    
    const listContainer = container.firstChild
    expect(listContainer).toHaveClass('divide-y')
  })

  it('should handle reviews with missing optional properties', () => {
    const reviewsWithMissingProps: Review[] = [
      {
        id: '1',
        author: 'Test User',
        rating: 4,
        text: 'Good book',
        date: '2023-10-01T00:00:00.000Z'
        // avatar, likes, dislikes are optional and missing
      }
    ]
    
    expect(() => {
      render(<ReviewList reviews={reviewsWithMissingProps} />)
    }).not.toThrow()
    
    expect(screen.getByTestId('review-item-1')).toBeInTheDocument()
  })
})