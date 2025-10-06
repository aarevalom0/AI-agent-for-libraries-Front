import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from '@/components/reader/NoteForm';

describe('NoteForm', () => {
  it('envía nota con trim y limpia input', async () => {
    const user = userEvent.setup();
    const onAdd = jest.fn();
    render(<NoteForm onAdd={onAdd} placeholder="Escribe" saveLabel="Guardar" />);

    const input = screen.getByPlaceholderText('Escribe') as HTMLInputElement;
    await user.type(input, '  hola mundo  ');
    await user.click(screen.getByRole('button', { name: 'Guardar' }));

    expect(onAdd).toHaveBeenCalledWith('hola mundo');
    expect(input.value).toBe('');
  });

  it('no llama onAdd si está vacío', async () => {
    const user = userEvent.setup();
    const onAdd = jest.fn();
    render(<NoteForm onAdd={onAdd} placeholder="Escribe" saveLabel="Guardar" />);
    await user.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(onAdd).not.toHaveBeenCalled();
  });
});
