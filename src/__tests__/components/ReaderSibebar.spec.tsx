import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReaderSidebar from '@/components/reader/ReaderSidebar';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, vars?: any) => {
    const dict: any = {
      hide_tools: 'Ocultar herramientas',
      tools: 'Herramientas',
      night: 'Modo noche',
      font: 'Fuente',
      fontSize: `Tamaño ${vars?.size ?? ''}`.trim(),
      bgColor: 'Fondo',
      notes: 'Notas',
      add_note_ph: 'Escribe una nota',
      save: 'Guardar',
      no_notes: 'No hay notas',
    };
    return dict[key] ?? key;
  },
}));

it('interacciones principales (toggle, night, font, size, bg, notas)', async () => {
  const user = userEvent.setup();
  const onSet = jest.fn();
  const onAddNote = jest.fn();
  const onDeleteNote = jest.fn();
  const onToggleSidebar = jest.fn();

  render(
    <ReaderSidebar
      settings={{ night: false, font: 'Newsreader', fontSize: 16, bg: 'default' }}
      onSet={onSet}
      notes={[{ id: 'n1', chapter: 0, text: 'Hola' }]}
      onAddNote={onAddNote}
      onDeleteNote={onDeleteNote}
      onToggleSidebar={onToggleSidebar}
    />
  );

  await user.click(screen.getByRole('button', { name: 'Ocultar herramientas' }));
  expect(onToggleSidebar).toHaveBeenCalled();

  await user.click(screen.getByLabelText('Modo noche'));
  expect(onSet).toHaveBeenCalledWith({ night: true });

  await user.selectOptions(screen.getByRole('combobox'), 'serif');
  expect(onSet).toHaveBeenCalledWith({ font: 'serif' });

  // 🔧 Cambiar el tamaño con un change event explícito
  const slider = screen.getByRole('slider') as HTMLInputElement;
  fireEvent.change(slider, { target: { value: '18' } });
  expect(onSet).toHaveBeenCalledWith({ fontSize: 18 });

  await user.click(screen.getByRole('button', { name: 'cream' }));
  expect(onSet).toHaveBeenCalledWith({ bg: 'cream', night: false });

  const li = screen.getByText('Hola').closest('li')!;
  await user.click(within(li).getByRole('button', { name: 'Eliminar' }));
  expect(onDeleteNote).toHaveBeenCalledWith('n1');

  await user.type(screen.getByPlaceholderText('Escribe una nota'), 'Nueva');
  await user.click(screen.getByRole('button', { name: 'Guardar' }));
  expect(onAddNote).toHaveBeenCalledWith('Nueva');
});
