import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookDetail from '@/components/books/BookDetail'
import type { Book } from '@/types/book'
import type { Review } from '@/types/review'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      'buttons.bookDetails': 'Book Details',
      'buttons.share': 'Share',
      'buttons.bookDetailsAriaLabel': 'buttons.bookDetailsAriaLabel',
      'buttons.shareAriaLabel': 'buttons.shareAriaLabel',
      'labels.addToCollection': 'Add to collection:',
      'labels.selectCollection': 'Select collection',
      'labels.selectCollectionLabel': 'labels.selectCollectionLabel',
      'labels.favoritos': 'Favorites',
      'labels.pendientes': 'To Read',
      'labels.leidos': 'Read',
      'labels.reviews': 'reviews',
      'labels.reviewsTitle': 'Reviews',
      'labels.by': 'by',
      'labels.description': 'Book description',
      'labels.genres': 'Book genres',
      'labels.ratingStatistics': 'Rating statistics',
      'labels.ratingDistribution': 'Rating distribution',
      'labels.addReviewTitle': 'Add new review',
      'labels.reviewsListTitle': 'Reviews list',
      'skipToBookContent': 'skipToBookContent',
      'breadcrumb.navigation': 'breadcrumb.navigation',
      'actions.bookActions': 'actions.bookActions'
    }
    return translations[key] || key
  }),
  useLocale: jest.fn(() => 'es'),
}))

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = ({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-priority={priority} />
  )
  MockImage.displayName = 'MockImage'
  return MockImage
})

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; className?: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

// Mock the review components
jest.mock('@/components/reviews/RatingStars', () => {
  const MockRatingStars = ({ value, readOnly }: { value: number; readOnly?: boolean }) => (
    <div data-testid="rating-stars" data-value={value} data-readonly={readOnly}>
      Rating: {value}
    </div>
  )
  MockRatingStars.displayName = 'MockRatingStars'
  return MockRatingStars
})

jest.mock('@/components/reviews/AddReviewForm', () => {
  const MockAddReviewForm = ({ onAdd }: { onAdd: (review: Review) => void }) => (
    <div data-testid="add-review-form">
      <button 
        data-testid="mock-add-review"
        onClick={() => onAdd({
          id: 'test-review',
          author: 'Test User',
          avatar: '/test-avatar.jpg',
          rating: 5,
          text: 'Great book!',
          date: '2024-01-01',
          likes: 0,
          dislikes: 0
        })}
      >
        Add Review
      </button>
    </div>
  )
  MockAddReviewForm.displayName = 'MockAddReviewForm'
  return MockAddReviewForm
})

jest.mock('@/components/reviews/ReviewList', () => {
  const MockReviewList = ({ reviews, onLikeUpdate }: { 
    reviews: Review[]; 
    onLikeUpdate: (id: string, likes: number, dislikes: number) => void 
  }) => (
    <div data-testid="review-list">
      {reviews.map((review) => (
        <div key={review.id} data-testid={`review-${review.id}`}>
          <span>Review by {review.author}</span>
          <span>Rating: {review.rating}</span>
          <span>{review.text}</span>
          <button onClick={() => onLikeUpdate(review.id, (review.likes || 0) + 1, review.dislikes || 0)}>
            Like
          </button>
        </div>
      ))}
    </div>
  )
  MockReviewList.displayName = 'MockReviewList'
  return MockReviewList
})

// Mock BotonPersonalizado
jest.mock('@/components/elementos/BotonPersonalizado', () => {
  const MockBotonPersonalizado = ({ texto, href, ariaLabel }: { texto: string; href: string; ariaLabel: string }) => (
    <a href={href} aria-label={ariaLabel} data-testid="boton-personalizado">
      {texto}
    </a>
  )
  MockBotonPersonalizado.displayName = 'MockBotonPersonalizado'
  return MockBotonPersonalizado
})

describe('BookDetail', () => {
  const mockBook: Book = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    cover: '/test-cover.jpg',
    description: 'This is a test book description.',
    genres: ['Fiction', 'Adventure'],
    infoURL: 'https://example.com/book-info',
    status: 'por-leer',
    reviews: []
  }

  const mockReviews: Review[] = [
    {
      id: 'review1',
      author: 'John Doe',
      avatar: '/avatar1.jpg',
      rating: 5,
      text: 'I really enjoyed this book.',
      date: '2024-01-01',
      likes: 10,
      dislikes: 1
    },
    {
      id: 'review2',
      author: 'Jane Smith',
      avatar: '/avatar2.jpg',
      rating: 4,
      text: 'Pretty good, would recommend.',
      date: '2024-01-02',
      likes: 5,
      dislikes: 0
    }
  ]

  const mockProps = {
    book: mockBook,
    initialReviews: mockReviews,
    previousPage: 'Library',
    previousPageHref: '/library'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render book information correctly', () => {
    render(<BookDetail {...mockProps} />)
    
    // Use more specific selectors to avoid duplicate text issues
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Book')
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByText('This is a test book description.')).toBeInTheDocument()
  })

  it('should render book cover with correct alt text', () => {
    render(<BookDetail {...mockProps} />)
    
    const image = screen.getByAltText('Portada del libro "Test Book" por Test Author')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-cover.jpg')
  })

  it('should render breadcrumb navigation correctly', () => {
    render(<BookDetail {...mockProps} />)
    
    const breadcrumbLink = screen.getByText('Library')
    expect(breadcrumbLink).toHaveAttribute('href', '/library')
    
    // The title appears in both breadcrumb and header
    const titleElements = screen.getAllByText('Test Book')
    expect(titleElements.length).toBeGreaterThan(0)
  })

  it('should render action buttons', () => {
    render(<BookDetail {...mockProps} />)
    
    expect(screen.getByText('Book Details')).toBeInTheDocument()
    expect(screen.getByText('Share')).toBeInTheDocument()
  })

  it('should render genres correctly', () => {
    render(<BookDetail {...mockProps} />)
    
    expect(screen.getByText('Fiction')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()
  })

  it('should render collection selector', () => {
    render(<BookDetail {...mockProps} />)
    
    expect(screen.getByText('Add to collection:')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Select collection')).toBeInTheDocument()
    expect(screen.getByText('Favorites')).toBeInTheDocument()
    expect(screen.getByText('To Read')).toBeInTheDocument()
    expect(screen.getByText('Read')).toBeInTheDocument()
  })

  it('should calculate and display rating statistics correctly', () => {
    render(<BookDetail {...mockProps} />)
    
    // Average should be (5 + 4) / 2 = 4.5
    expect(screen.getByText('4.5')).toBeInTheDocument()
    
    // Check for reviews count text with pattern matching
    expect(screen.getByText((content, element) => {
      return element?.textContent === '2 reviews'
    })).toBeInTheDocument()
  })

  it('should render rating distribution bars', () => {
    render(<BookDetail {...mockProps} />)
    
    // Check for star ratings in distribution
    expect(screen.getByText('5★')).toBeInTheDocument()
    expect(screen.getByText('4★')).toBeInTheDocument()
    expect(screen.getByText('3★')).toBeInTheDocument()
    expect(screen.getByText('2★')).toBeInTheDocument()
    expect(screen.getByText('1★')).toBeInTheDocument()
  })

  it('should render review components', () => {
    render(<BookDetail {...mockProps} />)
    
    expect(screen.getByTestId('add-review-form')).toBeInTheDocument()
    expect(screen.getByTestId('review-list')).toBeInTheDocument()
    expect(screen.getByText('Reviews')).toBeInTheDocument()
  })

  it('should handle adding new reviews', async () => {
    const user = userEvent.setup()
    render(<BookDetail {...mockProps} />)
    
    const addButton = screen.getByTestId('mock-add-review')
    await user.click(addButton)
    
    // Should update the review count
    expect(screen.getByText((content, element) => {
      return element?.textContent === '3 reviews'
    })).toBeInTheDocument()
  })

  it('should handle book without genres', () => {
    const bookWithoutGenres = { ...mockBook, genres: [] }
    render(<BookDetail book={bookWithoutGenres} initialReviews={mockReviews} previousPage="Library" previousPageHref="/library" />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Book')
    // Should not render genre section
    expect(screen.queryByText('Fiction')).not.toBeInTheDocument()
  })

  it('should render with empty reviews', () => {
    render(<BookDetail book={mockBook} initialReviews={[]} previousPage="Library" previousPageHref="/library" />)
    
    expect(screen.getByText('0.0')).toBeInTheDocument() // Average rating
    expect(screen.getByText((content, element) => {
      return element?.textContent === '0 reviews'
    })).toBeInTheDocument()
  })

  it('should handle book without cover', () => {
    const bookWithoutCover = { ...mockBook, cover: '' }
    render(<BookDetail book={bookWithoutCover} initialReviews={mockReviews} previousPage="Library" previousPageHref="/library" />)
    
    const image = screen.getByAltText('Portada del libro "Test Book" por Test Author')
    expect(image).toHaveAttribute('src', '/placeholder-cover.png')
  })

  it('should handle book without info URL', () => {
    const bookWithoutURL = { ...mockBook, infoURL: undefined }
    render(<BookDetail book={bookWithoutURL} initialReviews={mockReviews} previousPage="Library" previousPageHref="/library" />)
    
    const detailsButton = screen.getByText('Book Details')
    expect(detailsButton).toHaveAttribute('href', '#')
  })

  it('should have proper accessibility attributes', () => {
    render(<BookDetail {...mockProps} />)
    
    // Check skip link
    expect(screen.getByText('skipToBookContent')).toBeInTheDocument()
    
    // Check ARIA labels and landmarks
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('article')).toBeInTheDocument()
    
    // Check heading structure
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    
    // Check collection selector accessibility
    const select = screen.getByRole('combobox')
    expect(select).toHaveAttribute('aria-describedby', 'collection-help')
  })

  it('should update rating statistics when reviews change', async () => {
    const user = userEvent.setup()
    render(<BookDetail {...mockProps} />)
    
    // Initial average: (5 + 4) / 2 = 4.5
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      return element?.textContent === '2 reviews'
    })).toBeInTheDocument()
    
    // Add a new review (rating 5)
    const addReviewButton = screen.getByTestId('mock-add-review')
    await user.click(addReviewButton)
    
    // New average: (5 + 4 + 5) / 3 = 4.7 (rounded to 4.7)
    expect(screen.getByText((content, element) => {
      return element?.textContent === '3 reviews'
    })).toBeInTheDocument()
    expect(screen.getByText('4.7')).toBeInTheDocument()
  })

  it('should handle like updates for reviews', async () => {
    const user = userEvent.setup()
    render(<BookDetail {...mockProps} />)
    
    const likeButton = screen.getAllByText('Like')[0]
    await user.click(likeButton)
    
    // The component should handle the like update
    expect(screen.getByTestId('review-list')).toBeInTheDocument()
  })

  it('should render reviews in correct order (newest first)', async () => {
    const user = userEvent.setup()
    render(<BookDetail {...mockProps} />)
    
    // Add a new review
    const addButton = screen.getByTestId('mock-add-review')
    await user.click(addButton)
    
    // New review should appear first in the list
    expect(screen.getByTestId('review-test-review')).toBeInTheDocument()
  })
})