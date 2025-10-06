import FormularioCrearColeccion from '@/components/formularios/FormularioCrearColeecion';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock de next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key, // devuelve la clave como string
}));

describe('FormularioCrearColeccion', () => {
  const renderForm = () => render(<FormularioCrearColeccion />);

  it('renderiza todos los campos del formulario', () => {
    renderForm();

    expect(screen.getByLabelText(/nameCollection.label/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description.label/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /button.submit/i })).toBeInTheDocument();
  });

  it('muestra error cuando se envía vacío', async () => {
    const user = userEvent.setup();
    renderForm();

    const submitButton = screen.getByRole('button', { name: /button.submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nameCollection.errors.required/i)).toBeInTheDocument();
    });
  });

  it('valida que la descripción no exceda el máximo de caracteres', async () => {
    const user = userEvent.setup();
    renderForm();

    const descriptionInput = screen.getByLabelText(/description.label/i);
    const longText = 'a'.repeat(256);
    await user.type(descriptionInput, longText);

    const submitButton = screen.getByRole('button', { name: /button.submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/description.errors.maxLength/i)).toBeInTheDocument();
    });
  });

  it('permite enviar formulario con datos válidos', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    renderForm();

    const nameInput = screen.getByLabelText(/nameCollection.label/i);
    const descriptionInput = screen.getByLabelText(/description.label/i);

    await user.type(nameInput, 'Mi Colección');
    await user.type(descriptionInput, 'Descripción de prueba');

    const submitButton = screen.getByRole('button', { name: /button.submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it('renderiza placeholder en el campo descripción', () => {
    renderForm();

    const descriptionInput = screen.getByPlaceholderText(/description.placeholder/i);
    expect(descriptionInput).toBeInTheDocument();
  });
});
