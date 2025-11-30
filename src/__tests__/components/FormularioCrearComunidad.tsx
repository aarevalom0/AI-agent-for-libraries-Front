import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FormularioCrearComunidad from "@/components/formularios/FormularioCrearComunidad"

// Simula las traducciones de next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      "formulario_crear_comunidad.nameCommunity.label": "Nombre de la comunidad:",
      "formulario_crear_comunidad.nameCommunity.placeholder": "Escribe el nombre de la comunidad",
      "formulario_crear_comunidad.nameCommunity.errors.required": "El nombre de la comunidad es obligatorio",
      "formulario_crear_comunidad.description.label": "Descripción:",
      "formulario_crear_comunidad.description.placeholder": "Escribe una breve descripción de la comunidad",
      "formulario_crear_comunidad.description.errors.short": "La descripción debe tener al menos 10 caracteres",
      "formulario_crear_comunidad.description.errors.maxLength": "La descripción no puede superar los 255 caracteres",
      "formulario_crear_comunidad.imagen.label": "Imagen de la comunidad:",
      "formulario_crear_comunidad.imagen.errors.required": "La imagen de la comunidad es obligatoria",
      "formulario_crear_comunidad.imagen.errors.invalid": "Por favor ingresa una URL válida",
      "formulario_crear_comunidad.button.submit": "Crear comunidad",
    };
    return messages[key] || key;
  },
}));

describe("FormularioCrearComunidad", () => {
  it("renderiza todos los campos correctamente", () => {
    render(<FormularioCrearComunidad />);

    expect(screen.getByText("Nombre de la comunidad:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Escribe el nombre de la comunidad")).toBeInTheDocument();

    expect(screen.getByText("Descripción:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Escribe una breve descripción de la comunidad")).toBeInTheDocument();

    expect(screen.getByText("Imagen de la comunidad:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Crear comunidad/i })).toBeInTheDocument();
  });

 
});
