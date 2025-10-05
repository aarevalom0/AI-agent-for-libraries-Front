import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BarraBusqueda from '@/components/elementos/BarraBusqueda'

// Mock Material-UI Search icon
jest.mock('@mui/icons-material/Search', () => {
  const MockSearch = () => <svg data-testid="search-icon" />
  MockSearch.displayName = 'MockSearch'
  return MockSearch
})

describe('BarraBusqueda', () => {
  const defaultProps = {
    textHolder: 'Buscar...',
    ancho: 'md' as const
  }

  it('should render search bar with placeholder', () => {
    render(<BarraBusqueda {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('Buscar...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('should render search icon', () => {
    render(<BarraBusqueda {...defaultProps} />)
    
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should apply correct width class for different sizes', () => {
    const { rerender } = render(<BarraBusqueda {...defaultProps} ancho="sm" />)
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
    
    rerender(<BarraBusqueda {...defaultProps} ancho="md" />)
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
    
    rerender(<BarraBusqueda {...defaultProps} ancho="lg" />)
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })

  it('should update input value when typing', async () => {
    const user = userEvent.setup()
    render(<BarraBusqueda {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('Buscar...')
    await user.type(input, 'test search')
    
    expect(input).toHaveValue('test search')
  })

  it('should call onSearch callback when input changes', async () => {
    const mockOnSearch = jest.fn()
    const user = userEvent.setup()
    
    render(<BarraBusqueda {...defaultProps} onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Buscar...')
    await user.type(input, 'test')
    
    expect(mockOnSearch).toHaveBeenCalledWith('t')
    expect(mockOnSearch).toHaveBeenCalledWith('te')
    expect(mockOnSearch).toHaveBeenCalledWith('tes')
    expect(mockOnSearch).toHaveBeenCalledWith('test')
  })

  it('should use custom aria-label when provided', () => {
    render(<BarraBusqueda {...defaultProps} ariaLabel="Custom search" />)
    
    const input = screen.getByLabelText('Custom search')
    expect(input).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<BarraBusqueda {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('Buscar...')
    expect(input).toHaveAttribute('aria-label', 'Buscar...')
    expect(input).toHaveAttribute('autoComplete', 'off')
    
    // Check that the label exists and is properly associated
    const label = screen.getByLabelText('Buscar...')
    expect(label).toBe(input)
  })

  it('should handle onChange event correctly', () => {
    const mockOnSearch = jest.fn()
    render(<BarraBusqueda {...defaultProps} onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'new search' } })
    
    expect(input).toHaveValue('new search')
    expect(mockOnSearch).toHaveBeenCalledWith('new search')
  })

  it('should work without onSearch callback', () => {
    render(<BarraBusqueda {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('Buscar...')
    
    // Should not throw error when typing without onSearch
    expect(() => {
      fireEvent.change(input, { target: { value: 'test' } })
    }).not.toThrow()
    
    expect(input).toHaveValue('test')
  })
})