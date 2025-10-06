import {render, screen} from '@testing-library/react';
import BookReading from '@/components/books/BookReading';

it('renderiza título, autor y progreso', () => {
  render(<BookReading title="1984" autor="George Orwell" imageUrl="/img.jpg" progreso={60} />);
  expect(screen.getByText('1984')).toBeInTheDocument();
  expect(screen.getByText(/George Orwell/)).toBeInTheDocument();
  // la barra suele ser un <div style={{ width: '60%' }} />
  const bar = screen.getByRole('progressbar', { hidden: true }) || screen.getByTestId('progress-bar');
  expect(bar).toHaveStyle({ width: '60%' });
});