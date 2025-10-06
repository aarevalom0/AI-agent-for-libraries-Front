import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotesList from '@/components/reader/NotesList';

describe('NotesList', () => {
  it('muestra mensaje vacío', () => {
    render(<NotesList notes={[]} onDelete={() => {}} emptyLabel="No hay notas" />);
    expect(screen.getByText('No hay notas')).toBeInTheDocument();
  });

  it('renderiza notas y elimina por id', async () => {
    const user = userEvent.setup();
    const notes = [
      { id: '1', chapter: 0, text: 'Primera' },
      { id: '2', chapter: 1, text: 'Segunda' },
    ];
    const onDelete = jest.fn();
    render(<NotesList notes={notes} onDelete={onDelete} emptyLabel="Vacío" />);

    await user.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
