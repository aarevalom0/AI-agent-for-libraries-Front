import FormularioSolLibro from '@/components/formularios/FormularioSolLibro';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';


const messages = {
  formularios: {
    formulario_sol_libro: {
      errors: {
        titulo: 'Title is required',
        nombreAutor: 'Author name is required',
        isbn: 'ISBN is required',
        editorial: 'Publisher is required',
        anioPublicacion: 'Publication year is required',
        numeroPaginas: 'Number of pages must be at least 1',
        idioma: 'Language is required',
        genero: 'At least one genre is required',
        resumenCorto: 'Summary must be at least 10 characters',
        resumen: 'Summary must be less than 255 characters',
        imagenPortada: 'Invalid URL'
      },
      form: {
        fields: {
          titulo: 'Title',
          nombreAutor: 'Author Name',
          isbn: 'ISBN',
          editorial: 'Publisher',
          anioPublicacion: 'Publication Year',
          numeroPaginas: 'Number of Pages',
          idioma: 'Language',
          generos: 'Genres',
          resumen: 'Summary',
          imagenPortada: 'Cover Image'
        },
        placeholders: {
          genero: 'Enter genre'
        },
        buttons: {
          agregarGenero: 'Add Genre',
          eliminar: 'Remove',
          submit: 'Submit'
        }
      }
    }
  }
};

describe('FormularioSolLibro Component', () => {
  const renderForm = () => {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FormularioSolLibro />
      </NextIntlClientProvider>
    );
  };

  it('renders all form fields', () => {
    renderForm();
    
    expect(screen.getByTitle('Título del libro')).toBeInTheDocument();
    expect(screen.getByTitle('Nombre del autor')).toBeInTheDocument();
    expect(screen.getByTitle('ISBN del libro')).toBeInTheDocument();
    expect(screen.getByTitle('Editorial del libro')).toBeInTheDocument();
  });

  it('adds a new genre field when "Add Genre" button is clicked', () => {
    renderForm();
    
    const addButton = screen.getByRole('button', { name: 'Add Genre' });
    fireEvent.click(addButton);
    
    const genreInputs = screen.getAllByPlaceholderText('Enter genre');
    expect(genreInputs.length).toBeGreaterThan(0);
  });

  it('removes genre field when "Remove" button is clicked', async () => {
    renderForm();
    
    const addButton = screen.getByRole('button', { name: 'Add Genre' });
    fireEvent.click(addButton);
    
    const removeButton = screen.getByRole('button', { name: 'Remove' });
    fireEvent.click(removeButton);
    
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Enter genre')).not.toBeInTheDocument();
    });
  });

  it('shows validation error for empty title', async () => {
    renderForm();
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid URL in cover image', async () => {
    renderForm();
    
    const coverImageInput = screen.getByTitle('URL de la imagen de portada del libro');
    fireEvent.change(coverImageInput, { target: { value: 'not-a-url' } });
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid URL')).toBeInTheDocument();
    });
  });

  it('validates number of pages is a positive number', async () => {
    renderForm();
    
    const pagesInput = screen.getByTitle('Número de páginas del libro');
    fireEvent.change(pagesInput, { target: { value: '0' } });
    
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Number of pages must be at least 1')).toBeInTheDocument();
    });
  });
});