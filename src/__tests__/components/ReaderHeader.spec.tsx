import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import ReaderHeader from '@/components/reader/ReaderHeader';

describe('ReaderHeader', () => {
  it('muestra título, capítulo y link de volver', () => {
    render(<ReaderHeader title="1984" chapter={1} />);
    expect(screen.getByRole('heading', {name: /1984/i})).toBeInTheDocument();
    expect(screen.getByText(/cap[ií]tulo|chapter/i)).toBeInTheDocument();
    const back = screen.getByRole('link', {name: /volver|back/i});
    expect(back).toHaveAttribute('href', '/leerAhora');
  });
});
