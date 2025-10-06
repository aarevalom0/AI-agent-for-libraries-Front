import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioSolLibro from '@/components/formularios/FormularioSolLibro'

// Mock de next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key, // devuelve la clave como string
}))

describe('FormularioSolLibro', () => {
  const renderForm = () => render(<FormularioSolLibro />)

  it('renderiza todos los campos del formulario', () => {
    renderForm()
    expect(screen.getByLabelText(/titulo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nombreAutor/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/isbn/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/editorial/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/numeroPaginas/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/idioma/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/resumen/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/imagenPortada/i)).toBeInTheDocument()
  })

  it('permite agregar y eliminar géneros', async () => {
    const user = userEvent.setup()
    renderForm()

    const addButton = screen.getByRole('button', { name: /agregarGenero/i })
    await user.click(addButton)

    const genreInput = screen.getByPlaceholderText(/genero/i)
    expect(genreInput).toBeInTheDocument()

    const removeButton = screen.getByRole('button', { name: /eliminar/i })
    await user.click(removeButton)

    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/genero/i)).not.toBeInTheDocument()
    })
  })

  it('muestra error cuando se envía vacío', async () => {
    const user = userEvent.setup()
    renderForm()

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(() => {
      // Como mockeamos next-intl, los mensajes de error son las claves
      expect(screen.getByText(/formulario_sol_libro.errors.titulo/i)).toBeInTheDocument()
    })
  })

  it('valida que la imagen sea una URL válida', async () => {
    const user = userEvent.setup()
    renderForm()

    const portadaInput = screen.getByLabelText(/imagenPortada/i)
    await user.type(portadaInput, 'not-a-url')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/imagenPortada/i)).toBeInTheDocument()
    })
  })

  it('valida que número de páginas sea positivo', async () => {
    const user = userEvent.setup()
    renderForm()

    const pagesInput = screen.getByLabelText(/formulario_sol_libro.form.fields.numeroPaginas/i)
    await user.type(pagesInput, '0')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/formulario_sol_libro.errors.numeroPaginas/i)).toBeInTheDocument()
    })
  })
})
