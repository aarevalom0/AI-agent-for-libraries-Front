// __tests__/components/Insignia.test.tsx
import Insignia from '@/components/mainPage/Insignias';
import { render, screen } from '@testing-library/react';


describe('Insignia Component', () => {
  it('renders with name', () => {
    const { container } = render(<Insignia nombre="Test Badge" />);
    
    const insignia = container.querySelector('[title="Test Badge"]');
    expect(insignia).toBeInTheDocument();
  });

  it('displays image when imageUrl is provided', () => {
    render(<Insignia nombre="Test Badge" imageUrl="/test-image.jpg" />);
    
    const image = screen.getByAltText('Imagen para el libro Test Badge');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  it('displays placeholder icon when no imageUrl is provided', () => {
    const { container } = render(<Insignia nombre="Test Badge" />);
    
    const placeholder = screen.getByTitle('Espacio para insignias');
    expect(placeholder).toBeInTheDocument();
    
    const closeIcon = container.querySelector('[data-testid="CloseIcon"]');
    expect(closeIcon).toBeInTheDocument();
  });

  it('applies correct CSS classes for container', () => {
    const { container } = render(<Insignia nombre="Test Badge" />);
    
    const insigniaDiv = container.querySelector('.relative.w-40.h-40');
    expect(insigniaDiv).toBeInTheDocument();
    expect(insigniaDiv).toHaveClass('rounded-full');
  });

  it('renders without imageUrl (empty state)', () => {
    render(<Insignia nombre="Empty Badge" />);
    
    const placeholder = screen.getByTitle('Espacio para insignias');
    expect(placeholder).toBeInTheDocument();
  });
});