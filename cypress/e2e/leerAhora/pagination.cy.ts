// Usa la ruta real si es diferente
const LEER_AHORA = Cypress.env('READER_URL') || '/leerAhora';

describe('Lectorium — Leer ahora (catálogo)', () => {
  beforeEach(() => {
    cy.visit(LEER_AHORA);
  });

  it('muestra Lecturas actuales y permite "Seguir Leyendo"', () => {
    // Encabezado de la sección
    cy.contains(/Lecturas actuales/i).should('be.visible');

    // Primer botón "Seguir Leyendo" navega a la lectura
    cy.contains(/Seguir Leyendo/i).first().click();

    // Solo validamos que la ruta cambie respecto a /leerAhora (no asumimos el path exacto)
    cy.location('pathname').should('not.eq', LEER_AHORA);

    // Volver para continuar con otras verificaciones
    cy.go('back');
  });

  it('busca por título o autor ("1984")', () => {
    // Placeholder según tu UI
    const ph = 'Busca libros por título o autor.';

    cy.get(`input[placeholder="${ph}"]`).should('be.visible').as('search');

    // Limpiar (por si viene con valor) y buscar
    cy.get('@search').clear().type('1984');

    // Ver que el resultado incluye el libro buscado
    cy.contains(/1984/i).should('be.visible');
  });

  it('paginación: ir a página 2 y volver a 1', () => {
    // En la captura se ven botones "1", "2" y la flecha "›"

    // Ir a página 2 si existe
    cy.contains('button', /^2$/).then(($b) => {
      if ($b.length) {
        cy.wrap($b).click();

        // Tu botón activo usa clases bg-[var(--colorMenus)] text-white
        cy.contains('button', /^2$/)
          .should('have.class', 'bg-[var(--colorMenus)]')
          .and('have.class', 'text-white');

        // Aparece flecha "‹" para volver
        cy.contains('button', '‹').click();

        cy.contains('button', /^1$/)
          .should('have.class', 'bg-[var(--colorMenus)]')
          .and('have.class', 'text-white');
      } else {
        // Si no hay segunda página, al menos validamos que la 1 esté activa
        cy.contains('button', /^1$/)
          .should('have.class', 'bg-[var(--colorMenus)]')
          .and('have.class', 'text-white');
      }
    });
  });
});
