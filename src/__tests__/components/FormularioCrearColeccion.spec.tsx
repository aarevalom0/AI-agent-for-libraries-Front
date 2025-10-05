import FormularioCrearColeccion from '@/components/formularios/FormularioCrearColeecion';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';


const messages = {
  formularios: {
    formulario_crear_coleccion: {
      title: 'Create Collection',
      nameCollection: {
        label: 'Collection Name',
        errors: {
          required: 'Name is required'
        }
      },
      description: {
        label: 'Description',
        placeholder: 'Enter description',
        errors: {
          maxLength: 'Description must be less than 255 characters'
        }
      },
      button: {
        submit: 'Create Collection'
      }
    }
  }
};

describe('FormularioCrearColeccion Component', () => {
  const renderForm = () => {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FormularioCrearColeccion />
      </NextIntlClientProvider>
    );
  };

  it('renders form with all fields', () => {
    renderForm();
    
    expect(screen.getByLabelText('Collection Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Collection' })).toBeInTheDocument();
  });

  it('shows validation error when name is empty', async () => {
    renderForm();
    
    const submitButton = screen.getByRole('button', { name: 'Create Collection' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('shows validation error when description exceeds max length', async () => {
    renderForm();
    
    const descriptionInput = screen.getByLabelText('Description');
    const longText = 'a'.repeat(256);
    
    fireEvent.change(descriptionInput, { target: { value: longText } });
    
    const submitButton = screen.getByRole('button', { name: 'Create Collection' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Description must be less than 255 characters')).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    renderForm();
    
    const nameInput = screen.getByLabelText('Collection Name');
    const descriptionInput = screen.getByLabelText('Description');
    
    fireEvent.change(nameInput, { target: { value: 'My Collection' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    
    const submitButton = screen.getByRole('button', { name: 'Create Collection' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    
    consoleSpy.mockRestore();
  });

  it('renders placeholder text in description field', () => {
    renderForm();
    
    const descriptionInput = screen.getByPlaceholderText('Enter description');
    expect(descriptionInput).toBeInTheDocument();
  });
});