// src/__tests__/components/pagination.spec.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '@/components/navigation/Pagination';

describe('Pagination', () => {
  it('deshabilita Anterior en la primera y Siguiente en la última', () => {
    const onPageChange = jest.fn();

    const { rerender } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    const prev = screen.getByRole('button', { name: '‹' });
    const next = screen.getByRole('button', { name: '›' });

    expect(prev).toBeDisabled();
    expect(next).not.toBeDisabled();

    rerender(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: '›' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '‹' })).not.toBeDisabled();
  });

  it('llama onPageChange al usar flechas', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    render(<Pagination currentPage={2} totalPages={4} onPageChange={onPageChange} />);

    await user.click(screen.getByRole('button', { name: '›' }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole('button', { name: '‹' }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('navega por número y marca visualmente la página actual', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    const { rerender } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    await user.click(screen.getByRole('button', { name: '4' }));
    expect(onPageChange).toHaveBeenCalledWith(4);

    // Verificación del estado "actual" mediante clases (tu componente usa bg-[var(--colorMenus)] text-white)
    rerender(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    const currentBtn = screen.getByRole('button', { name: '3' });
    expect(currentBtn.className).toMatch(/bg-\[var\(--colorMenus\)\]\s+text-white/);
  });
});