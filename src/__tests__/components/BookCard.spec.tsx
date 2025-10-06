import BookCard from '@/components/books/BookCard';
import { render, screen } from '@testing-library/react';

describe('BookCard Component', () => {
  const defaultProps = {
    title: 'The Great Gatsby',
    autor: 'F. Scott Fitzgerald',
    imageUrl: '/gatsby.jpg',
    href: '/book/gatsby'
  };

  it('renders book title and author', () => {
    render(<BookCard {...defaultProps} />);
    
    expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
    expect(screen.getByText('F. Scott Fitzgerald')).toBeInTheDocument();
  });

  it('renders book cover image with correct alt text', () => {
    render(<BookCard {...defaultProps} />);
    
    const image = screen.getByAltText('Portada del libro "The Great Gatsby" por F. Scott Fitzgerald');
    expect(image).toBeInTheDocument();
  });

  it('renders as an article element', () => {
    const { container } = render(<BookCard {...defaultProps} />);
    
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('link has correct aria-label for accessibility', () => {
    render(<BookCard {...defaultProps} />);
    
    const link = screen.getByLabelText('Ver detalles del libro "The Great Gatsby" por F. Scott Fitzgerald');
    expect(link).toBeInTheDocument();
  });

  it('link has correct href attribute', () => {
    render(<BookCard {...defaultProps} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/book/gatsby');
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<BookCard {...defaultProps} />);
    
    const imageContainer = container.querySelector('.relative.w-\\[150px\\].h-\\[220px\\]');
    expect(imageContainer).toBeInTheDocument();
  });

  it('renders with different book data', () => {
    const newProps = {
      title: '1984',
      autor: 'George Orwell',
      imageUrl: '/1984.jpg',
      href: '/book/1984'
    };
    
    render(<BookCard {...newProps} />);
    
    expect(screen.getByText('1984')).toBeInTheDocument();
    expect(screen.getByText('George Orwell')).toBeInTheDocument();
  });
});