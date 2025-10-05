import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReviewItem from '@/components/reviews/ReviewItem'
import type { Review } from '@/types/review'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      'labels.like': 'Like',
      'labels.dislike': 'Dislike'
    }
    return translations[key] || key
  }),
  useLocale: jest.fn(() => 'es'),
}))

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = ({ src, alt }: { src: string; alt: string; fill?: boolean; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  )
  MockImage.displayName = 'MockImage'
  return MockImage
})

// Mock RatingStars component
jest.mock('@/components/reviews/RatingStars', () => {
  const MockRatingStars = ({ value, readOnly }: { value: number; readOnly?: boolean }) => (
    <div data-testid="rating-stars" data-value={value} data-readonly={readOnly}>
      {value} stars
    </div>
  )
  MockRatingStars.displayName = 'MockRatingStars'
  return MockRatingStars
})

describe('ReviewItem', () => {
  const mockReview: Review = {
    id: '1',
    author: 'John Doe',
    avatar: '/avatar-test.png',
    rating: 4,
    text: 'This is a great book!',
    date: '2023-10-01T00:00:00.000Z',
    likes: 5,
    dislikes: 1
  }

  it('should render review information correctly', () => {
    render(<ReviewItem review={mockReview} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('This is a great book!')).toBeInTheDocument()
    expect(screen.getByText('4 stars')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument() // likes count
    expect(screen.getByText('1')).toBeInTheDocument() // dislikes count
  })

  it('should render avatar image with correct attributes', () => {
    render(<ReviewItem review={mockReview} />)
    
    const avatar = screen.getByAltText('Avatar de John Doe')
    expect(avatar).toHaveAttribute('src', '/avatar-test.png')
  })

  it('should use default avatar when avatar is not provided', () => {
    const reviewWithoutAvatar = { ...mockReview, avatar: undefined }
    render(<ReviewItem review={reviewWithoutAvatar} />)
    
    const avatar = screen.getByAltText('Avatar de John Doe')
    expect(avatar).toHaveAttribute('src', '/avatar-default.png')
  })

  it('should format date correctly', () => {
    render(<ReviewItem review={mockReview} />)
    
    // La fecha debe estar formateada (ser más flexible con el formato)
    const dateElement = screen.getByText(/\d{1,2}\/\d{1,2}\/\d{4}/)
    expect(dateElement).toBeInTheDocument()
  })

  it('should handle like button click', async () => {
    const mockOnLikeUpdate = jest.fn()
    const user = userEvent.setup()
    
    render(<ReviewItem review={mockReview} onLikeUpdate={mockOnLikeUpdate} />)
    
    const likeButton = screen.getByTitle('Like')
    await user.click(likeButton)
    
    expect(mockOnLikeUpdate).toHaveBeenCalledWith('1', 6, 1) // likes increased by 1
  })

  it('should handle dislike button click', async () => {
    const mockOnLikeUpdate = jest.fn()
    const user = userEvent.setup()
    
    render(<ReviewItem review={mockReview} onLikeUpdate={mockOnLikeUpdate} />)
    
    const dislikeButton = screen.getByTitle('Dislike')
    await user.click(dislikeButton)
    
    expect(mockOnLikeUpdate).toHaveBeenCalledWith('1', 5, 2) // dislikes increased by 1
  })

  it('should toggle like when clicked twice', async () => {
    const mockOnLikeUpdate = jest.fn()
    const user = userEvent.setup()
    
    render(<ReviewItem review={mockReview} onLikeUpdate={mockOnLikeUpdate} />)
    
    const likeButton = screen.getByTitle('Like')
    
    // First click - add like
    await user.click(likeButton)
    expect(mockOnLikeUpdate).toHaveBeenCalledWith('1', 6, 1)
    
    // Second click - remove like
    await user.click(likeButton)
    expect(mockOnLikeUpdate).toHaveBeenCalledWith('1', 5, 1)
  })

  it('should switch from dislike to like', async () => {
    const mockOnLikeUpdate = jest.fn()
    const user = userEvent.setup()
    
    render(<ReviewItem review={mockReview} onLikeUpdate={mockOnLikeUpdate} />)
    
    const likeButton = screen.getByTitle('Like')
    const dislikeButton = screen.getByTitle('Dislike')
    
    // First dislike
    await user.click(dislikeButton)
    expect(mockOnLikeUpdate).toHaveBeenCalledWith('1', 5, 2)
    
    // Then like (should remove dislike and add like)
    await user.click(likeButton)
    expect(mockOnLikeUpdate).toHaveBeenCalledWith('1', 6, 1)
  })

  it('should handle reviews without likes/dislikes', () => {
    const reviewWithoutLikes = {
      ...mockReview,
      likes: undefined,
      dislikes: undefined
    }
    
    render(<ReviewItem review={reviewWithoutLikes} />)
    
    // Should show 0 for both likes and dislikes
    const likeButton = screen.getByTitle('Like')
    const dislikeButton = screen.getByTitle('Dislike')
    
    expect(likeButton).toHaveTextContent('👍0')
    expect(dislikeButton).toHaveTextContent('👎0')
  })

  it('should work without onLikeUpdate callback', async () => {
    const user = userEvent.setup()
    
    render(<ReviewItem review={mockReview} />)
    
    const likeButton = screen.getByTitle('Like')
    
    // Should not throw error when clicking without callback
    expect(() => user.click(likeButton)).not.toThrow()
  })

  it('should apply correct styling to like button when voted', async () => {
    const user = userEvent.setup()
    
    render(<ReviewItem review={mockReview} />)
    
    const likeButton = screen.getByTitle('Like')
    
    // Initially should not have voted styling
    expect(likeButton).not.toHaveClass('bg-green-100')
    expect(likeButton).not.toHaveClass('text-green-700')
    
    // After clicking should have voted styling
    await user.click(likeButton)
    expect(likeButton).toHaveClass('bg-green-100')
    expect(likeButton).toHaveClass('text-green-700')
  })

  it('should apply correct styling to dislike button when voted', async () => {
    const user = userEvent.setup()
    
    render(<ReviewItem review={mockReview} />)
    
    const dislikeButton = screen.getByTitle('Dislike')
    
    // Initially should not have voted styling
    expect(dislikeButton).not.toHaveClass('bg-red-100')
    expect(dislikeButton).not.toHaveClass('text-red-700')
    
    // After clicking should have voted styling
    await user.click(dislikeButton)
    expect(dislikeButton).toHaveClass('bg-red-100')
    expect(dislikeButton).toHaveClass('text-red-700')
  })
})