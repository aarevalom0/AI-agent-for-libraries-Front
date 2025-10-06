import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import Pagination from '@/components/navigation/Pagination';

describe('Pagination', () => {
  it('invoca onPageChange al siguiente', () => {
    const onPage = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPage} />);
    fireEvent.click(screen.getByRole('button', {name: /next|siguiente/i}));
    expect(onPage).toHaveBeenCalledWith(3);
  });

  it('invoca onPageChange al anterior', () => {
    const onPage = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPage} />);
    fireEvent.click(screen.getByRole('button', {name: /prev|anterior/i}));
    expect(onPage).toHaveBeenCalledWith(2);
  });

  it('deshabilita prev/next en límites', () => {
    const onPage = vi.fn();
    const {rerender} = render(<Pagination currentPage={1} totalPages={5} onPageChange={onPage} />);
    expect(screen.getByRole('button', {name: /prev|anterior/i})).toBeDisabled();

    rerender(<Pagination currentPage={5} totalPages={5} onPageChange={onPage} />);
    expect(screen.getByRole('button', {name: /next|siguiente/i})).toBeDisabled();
  });
});
