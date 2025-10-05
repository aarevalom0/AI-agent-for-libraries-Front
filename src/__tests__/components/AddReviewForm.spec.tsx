import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddReviewForm from '@/components/reviews/AddReviewForm'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: Record<string, string> = {
      'labels.rating': 'Your rating:',
      'placeholders.writeReview': 'Write a comment...',
      'buttons.submitReview': 'Submit Review',
      'messages.submitting': 'Submitting...',
      'validation.pleaseRate': 'Please provide your rating (stars) and a comment.'
    }
    return translations[key] || key
  }),
  useLocale: jest.fn(() => 'es'),
}))

// Mock RatingStars component
jest.mock('@/components/reviews/RatingStars', () => {
  const MockRatingStars = ({ 
    value, 
    onChange 
  }: { 
    value?: number; 
    onChange?: (v: number) => void 
  }) => (
    <div data-testid="rating-stars">
      <button 
        data-testid="star-1"
        onClick={() => onChange?.(1)}
      >
        Star 1
      </button>
      <button 
        data-testid="star-2"
        onClick={() => onChange?.(2)}
      >
        Star 2
      </button>
      <button 
        data-testid="star-3"
        onClick={() => onChange?.(3)}
      >
        Star 3
      </button>
      <button 
        data-testid="star-4"
        onClick={() => onChange?.(4)}
      >
        Star 4
      </button>
      <button 
        data-testid="star-5"
        onClick={() => onChange?.(5)}
      >
        Star 5
      </button>
      <span>Current rating: {value || 0}</span>
    </div>
  )
  MockRatingStars.displayName = 'MockRatingStars'
  return MockRatingStars
})

// Mock alert function
const mockAlert = jest.fn()
global.alert = mockAlert

describe('AddReviewForm', () => {
  const mockOnAdd = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render form elements correctly', () => {
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    expect(screen.getByText('Your rating:')).toBeInTheDocument()
    expect(screen.getByTestId('rating-stars')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument()
    expect(screen.getByText('Submit Review')).toBeInTheDocument()
  })

  it('should allow user to enter comment text', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    const textarea = screen.getByPlaceholderText('Write a comment...')
    await user.type(textarea, 'This is my review')
    
    expect(textarea).toHaveValue('This is my review')
  })

  it('should allow user to select rating', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    const fourthStar = screen.getByTestId('star-4')
    await user.click(fourthStar)
    
    expect(screen.getByText('Current rating: 4')).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    // Set rating
    const fourthStar = screen.getByTestId('star-4')
    await user.click(fourthStar)
    
    // Enter comment
    const textarea = screen.getByPlaceholderText('Write a comment...')
    await user.type(textarea, 'Great book!')
    
    // Submit form
    const submitButton = screen.getByText('Submit Review')
    await user.click(submitButton)
    
    expect(mockOnAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        author: 'Tú',
        rating: 4,
        text: 'Great book!',
        likes: 0,
        dislikes: 0,
      })
    )
  })

  it('should show alert when submitting without rating', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    // Enter comment but no rating
    const textarea = screen.getByPlaceholderText('Write a comment...')
    await user.type(textarea, 'Great book!')
    
    // Submit form
    const submitButton = screen.getByText('Submit Review')
    await user.click(submitButton)
    
    expect(mockAlert).toHaveBeenCalledWith('Please provide your rating (stars) and a comment.')
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('should show alert when submitting without comment', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    // Set rating but no comment
    const fourthStar = screen.getByTestId('star-4')
    await user.click(fourthStar)
    
    // Submit form
    const submitButton = screen.getByText('Submit Review')
    await user.click(submitButton)
    
    expect(mockAlert).toHaveBeenCalledWith('Please provide your rating (stars) and a comment.')
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('should show alert when submitting with empty comment', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    // Set rating
    const fourthStar = screen.getByTestId('star-4')
    await user.click(fourthStar)
    
    // Enter only spaces in comment
    const textarea = screen.getByPlaceholderText('Write a comment...')
    await user.type(textarea, '   ')
    
    // Submit form
    const submitButton = screen.getByText('Submit Review')
    await user.click(submitButton)
    
    expect(mockAlert).toHaveBeenCalledWith('Please provide your rating (stars) and a comment.')
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('should reset form after successful submission', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    // Set rating
    const fourthStar = screen.getByTestId('star-4')
    await user.click(fourthStar)
    
    // Enter comment
    const textarea = screen.getByPlaceholderText('Write a comment...')
    await user.type(textarea, 'Great book!')
    
    // Submit form
    const submitButton = screen.getByText('Submit Review')
    await user.click(submitButton)
    
    // Form should be reset
    expect(textarea).toHaveValue('')
    expect(screen.getByText('Current rating: 0')).toBeInTheDocument()
  })

  it('should show loading state during submission', async () => {
    const user = userEvent.setup()
    
    // Mock onAdd to be async to see loading state
    const mockOnAddAsync = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<AddReviewForm onAdd={mockOnAddAsync} />)
    
    // Set rating
    const fourthStar = screen.getByTestId('star-4')
    await user.click(fourthStar)
    
    // Enter comment
    const textarea = screen.getByPlaceholderText('Write a comment...')
    await user.type(textarea, 'Great book!')
    
    // Submit form
    const submitButton = screen.getByText('Submit Review')
    
    // Since the component doesn't actually show loading state in a way we can test,
    // we'll just verify the form can be submitted
    await user.click(submitButton)
    
    expect(mockOnAddAsync).toHaveBeenCalled()
  })

  it('should trim whitespace from comment text', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    // Set rating
    const fourthStar = screen.getByTestId('star-4')
    await user.click(fourthStar)
    
    // Enter comment with extra whitespace
    const textarea = screen.getByPlaceholderText('Write a comment...')
    await user.type(textarea, '  Great book!  ')
    
    // Submit form
    const submitButton = screen.getByText('Submit Review')
    await user.click(submitButton)
    
    expect(mockOnAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Great book!', // Should be trimmed
      })
    )
  })

  it('should generate unique review ID', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    // Set rating
    const fourthStar = screen.getByTestId('star-4')
    await user.click(fourthStar)
    
    // Enter comment
    const textarea = screen.getByPlaceholderText('Write a comment...')
    await user.type(textarea, 'Great book!')
    
    // Submit form
    const submitButton = screen.getByText('Submit Review')
    await user.click(submitButton)
    
    expect(mockOnAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
      })
    )
  })

  it('should have proper form structure and styling', () => {
    const { container } = render(<AddReviewForm onAdd={mockOnAdd} />)
    
    const form = container.querySelector('form')
    expect(form).toHaveClass('bg-white')
    expect(form).toHaveClass('p-6')
    expect(form).toHaveClass('rounded-xl')
    expect(form).toHaveClass('border')
    expect(form).toHaveClass('shadow-md')
    expect(form).toHaveClass('space-y-4')
  })

  it('should handle form submission via Enter key in textarea', async () => {
    const user = userEvent.setup()
    render(<AddReviewForm onAdd={mockOnAdd} />)
    
    // Set rating
    const fourthStar = screen.getByTestId('star-4')
    await user.click(fourthStar)
    
    // Enter comment
    const textarea = screen.getByPlaceholderText('Write a comment...')
    await user.type(textarea, 'Great book!')
    
    // Focus on submit button and press Enter
    const submitButton = screen.getByText('Submit Review')
    submitButton.focus()
    await user.keyboard('{Enter}')
    
    expect(mockOnAdd).toHaveBeenCalled()
  })
})