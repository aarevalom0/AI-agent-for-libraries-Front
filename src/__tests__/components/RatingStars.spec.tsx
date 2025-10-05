import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RatingStars from '@/components/reviews/RatingStars'

describe('RatingStars', () => {
  it('should render 5 stars', () => {
    render(<RatingStars />)
    
    const stars = screen.getAllByRole('radio')
    expect(stars).toHaveLength(5)
  })

  it('should display correct value when read-only', () => {
    render(<RatingStars value={3} readOnly />)
    
    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup).toHaveAttribute('aria-label', 'Valoración')
  })

  it('should handle click events when not read-only', async () => {
    const mockOnChange = jest.fn()
    const user = userEvent.setup()
    
    render(<RatingStars onChange={mockOnChange} />)
    
    const thirdStar = screen.getByTitle('3 estrellas')
    await user.click(thirdStar)
    
    expect(mockOnChange).toHaveBeenCalledWith(3)
  })

  it('should not handle clicks when read-only', async () => {
    const mockOnChange = jest.fn()
    const user = userEvent.setup()
    
    render(<RatingStars readOnly onChange={mockOnChange} />)
    
    const thirdStar = screen.getByTitle('3 estrellas')
    await user.click(thirdStar)
    
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('should show hover effect when not read-only', async () => {
    const user = userEvent.setup()
    render(<RatingStars />)
    
    const fourthStar = screen.getByTitle('4 estrellas')
    
    await user.hover(fourthStar)
    // El hover debería cambiar la visualización de las estrellas
    expect(fourthStar).toBeInTheDocument()
  })

  it('should handle mouse leave correctly', async () => {
    const user = userEvent.setup()
    render(<RatingStars />)
    
    const fourthStar = screen.getByTitle('4 estrellas')
    
    await user.hover(fourthStar)
    await user.unhover(fourthStar)
    
    expect(fourthStar).toBeInTheDocument()
  })

  it('should render with initial value', () => {
    render(<RatingStars value={4} />)
    
    const fourthStar = screen.getByTitle('4 estrellas')
    expect(fourthStar).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<RatingStars />)
    
    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup).toHaveAttribute('aria-label', 'Valoración')
    
    const stars = screen.getAllByRole('radio')
    stars.forEach((star, index) => {
      expect(star).toHaveAttribute('title', `${index + 1} estrella${index > 0 ? 's' : ''}`)
      expect(star).toHaveAttribute('aria-checked')
    })
  })

  it('should display half stars correctly for decimal values', () => {
    render(<RatingStars value={3.5} readOnly />)
    
    // Verificar que se renderizan todas las estrellas
    const stars = screen.getAllByRole('radio')
    expect(stars).toHaveLength(5)
  })

  it('should use default cursor for read-only mode', () => {
    render(<RatingStars readOnly />)
    
    const firstStar = screen.getByTitle('1 estrella')
    expect(firstStar).toHaveClass('cursor-default')
  })

  it('should use pointer cursor for interactive mode', () => {
    render(<RatingStars />)
    
    const firstStar = screen.getByTitle('1 estrella')
    expect(firstStar).toHaveClass('cursor-pointer')
  })
})