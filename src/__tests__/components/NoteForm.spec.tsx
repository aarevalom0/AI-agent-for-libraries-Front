import { render, screen, fireEvent } from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import NoteForm from '@/components/reader/NoteForm';

describe('NoteForm', () => {
  it('envía la nota y limpia el input', () => {
    const onAdd = vi.fn();
    render(
      <NoteForm
        onAdd={onAdd}
        placeholder="Agregar nota"
        saveLabel="Guardar"
      />
    );

    const input = screen.getByPlaceholderText(/agregar nota|add note/i);
    fireEvent.change(input, { target: { value: 'Mi nota' } });
    fireEvent.click(screen.getByRole('button', { name: /guardar|save/i }));

    expect(onAdd).toHaveBeenCalledWith('Mi nota');
    expect((input as HTMLInputElement).value).toBe('');
  });
});
