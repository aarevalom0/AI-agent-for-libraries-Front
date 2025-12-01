import '@testing-library/jest-dom';
import EventCard from '@/components/eventos/EventCard';
import { render, screen } from '@testing-library/react';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'botonEventos.texto': 'Ver más'
    };
    return translations[key] || key;
  }
}));

describe('EventCard Component', () => {
  const defaultProps = {
    title: 'Reunión del Club de Lectura',
    descripcion: 'Discusión sobre literatura clásica',
    imageUrl: '/Images/event1.jpg',
    href: '/eventos/1'
  };

  it('renders event title and description', () => {
    render(<EventCard {...defaultProps} />);
    
    expect(screen.getByText('Reunión del Club de Lectura')).toBeInTheDocument();
    expect(screen.getByText('Discusión sobre literatura clásica')).toBeInTheDocument();
  });

  it('renders pretitulo when provided', () => {
    const propsWithPretitulo = {
      ...defaultProps,
      pretitulo: 'Evento Especial'
    };

    render(<EventCard {...propsWithPretitulo} />);
    
    expect(screen.getByText('Evento Especial')).toBeInTheDocument();
  });

  it('does not render pretitulo when not provided', () => {
    render(<EventCard {...defaultProps} />);
    
    expect(screen.queryByText('Evento Especial')).not.toBeInTheDocument();
  });

  it('renders event image with correct alt text', () => {
    render(<EventCard {...defaultProps} />);
    
    const image = screen.getByAltText('Imagen para el libro Reunión del Club de Lectura');
    expect(image).toBeInTheDocument();
  });

  it('renders custom button with correct text', () => {
    render(<EventCard {...defaultProps} />);
    
    expect(screen.getByText('Ver más')).toBeInTheDocument();
  });

  it('applies correct CSS classes and structure', () => {
    const { container } = render(<EventCard {...defaultProps} />);
    
    const eventCard = container.querySelector('.EventCard');
    expect(eventCard).toBeInTheDocument();
    expect(eventCard).toHaveClass('flex');
    expect(eventCard).toHaveClass('py-8');
  });

  it('has correct text element title attribute', () => {
    render(<EventCard {...defaultProps} />);
    
    const textoEvento = screen.getByTitle('texto evento');
    expect(textoEvento).toBeInTheDocument();
    expect(textoEvento).toHaveClass('font-newsreader');
    expect(textoEvento).toHaveClass('pt-5');
  });

  it('renders with different event data', () => {
    const newProps = {
      pretitulo: 'Club de Lectura Virtual',
      title: 'Charla con Autor',
      descripcion: 'Sesión de preguntas y respuestas',
      imageUrl: '/Images/author-event.jpg',
      href: '/eventos/2'
    };
    
    render(<EventCard {...newProps} />);
    
    expect(screen.getByText('Club de Lectura Virtual')).toBeInTheDocument();
    expect(screen.getByText('Charla con Autor')).toBeInTheDocument();
    expect(screen.getByText('Sesión de preguntas y respuestas')).toBeInTheDocument();
  });

  it('image container has correct dimensions', () => {
    const { container } = render(<EventCard {...defaultProps} />);
    
    const imageContainer = container.querySelector('.w-\\[500px\\].h-\\[220px\\]');
    expect(imageContainer).toBeInTheDocument();
  });

  it('image has correct styling classes', () => {
    render(<EventCard {...defaultProps} />);
    
    const image = screen.getByAltText('Imagen para el libro Reunión del Club de Lectura');
    expect(image).toHaveClass('object-cover');
    expect(image).toHaveClass('rounded-md');
  });
});