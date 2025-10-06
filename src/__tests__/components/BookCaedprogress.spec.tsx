import BookCardProgress from '@/components/books/BookCardProgress';
import { render, screen } from '@testing-library/react';


describe('BookCardProgress Component', () => {
  const defaultProps = {
    title: 'Test Book',
    autor: 'Test Author',
    imageUrl: '/test-image.jpg',
    porcentaje: 50,
    href: '/book/1'
  };

  it('renders book information correctly', () => {
    render(<BookCardProgress {...defaultProps} />);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Autor: Test Author')).toBeInTheDocument();
  });

  it('displays book cover image', () => {
    render(<BookCardProgress {...defaultProps} />);
    
    const image = screen.getByAltText('Imagen para el libro Test Book');
    expect(image).toBeInTheDocument();
  });

  it('renders progress bar with correct percentage', () => {
    render(<BookCardProgress {...defaultProps} />);
    
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders as a link with correct href', () => {
    const { container } = render(<BookCardProgress {...defaultProps} />);
    
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/book/1');
  });

  it('displays 0% progress correctly', () => {
    render(<BookCardProgress {...defaultProps} porcentaje={0} />);
    
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('displays 100% progress correctly', () => {
    render(<BookCardProgress {...defaultProps} porcentaje={100} />);
    
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
