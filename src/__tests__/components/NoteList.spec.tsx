import { render, screen, fireEvent } from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import NotesList, { Note } from '@/components/reader/NotesList';

describe('NotesList', () => {
  it('muestra vacío', () => {
    render(
      <NotesList
        notes={[]}
        onDelete={() => {}}
        emptyLabel="Sin notas en este capítulo."
      />
    );
    expect(screen.getByText(/sin notas en este capítulo|no notes/i)).toBeInTheDocument();
  });

  it('elimina una nota', () => {
    const notes: Note[] = [{ id: '1', chapter: 0, text: 'Hola' }];
    const onDelete = vi.fn();

    render(
      <NotesList
        notes={notes}
        onDelete={onDelete}
        emptyLabel="Sin notas"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /eliminar|delete/i }));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
