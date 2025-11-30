import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import BookReading from '@/components/books/BookReading';

it('renderiza título, autor y progreso', () => {
  render(<BookReading title="1984" autor="George Orwell" imageUrl="/img.jpg" progreso={60} />);
  expect(screen.getByText('1984')).toBeInTheDocument();
  expect(screen.getByText(/George Orwell/)).toBeInTheDocument();
  
  // Verificar que el porcentaje se muestra
  expect(screen.getByText('60%')).toBeInTheDocument();
  
  // Buscar la barra de progreso por su estilo
  const progressBar = document.querySelector('.h-2.rounded.bg-\\[var\\(--colorMenus\\)\\]') as HTMLElement;
  expect(progressBar).toBeTruthy();
  expect(progressBar).toHaveStyle({ width: '60%' });
});