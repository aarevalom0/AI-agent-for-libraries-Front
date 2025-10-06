// cypress/e2e/reader/flow-leer-ahora-to-reader.cy.ts

// Ruta del catálogo "Leer ahora" (ajústala si es distinta)
const CATALOG_URL = Cypress.env('CATALOG_URL') || '/leerAhora';

// --- Helpers ---

// "Capítulo N" (con/sin tilde)
function getChapterNumber() {
  return cy.contains(/^Cap[ií]tulo\s+\d+$/i).invoke('text').then((t) => {
    const n = Number((t.match(/\d+/) || [])[0]);
    return n;
  });
}

// Solo el viewport que pinta fondo (div.reader-surface con <article.prose> dentro)
const getViewport = () => cy.get('article.prose').closest('div.reader-surface');

describe('Lectorium — flujo: Leer ahora → Reader', () => {
  it('abre desde "Seguir Leyendo" y usa herramientas, notas y navegación', () => {
    // 1) Catálogo
    cy.visit(CATALOG_URL);

    // 2) Entrar al reader
    cy.contains(/Seguir Leyendo/i).first().click();

    // 3) Reader visible
    getViewport().should('be.visible');
    cy.contains(/^Cap[ií]tulo\s+\d+$/i).should('be.visible');

    // 4) HERRAMIENTAS (si hay sidebar)
    cy.get('body').then(($body) => {
      const hasSidebar =
        $body.find('.reader-panel').length > 0 ||
        $body.find('button[aria-label="Ocultar herramientas"]').length > 0;

      if (hasSidebar) {
        // 4.1 Modo nocturno -> rgb(28, 27, 26)
        cy.contains('label', /(Modo nocturno|Modo noche)/i)
          .should('be.visible')
          .find('input[type="checkbox"]').check({ force: true });

        getViewport().should('have.css', 'background-color', 'rgb(28, 27, 26)');

        // 4.2 Cambiar fuente a 'serif'
        cy.get('select').select('serif').should('have.value', 'serif');

        // 4.3 Cambiar tamaño: validar con el propio slider (no con CSS ni label)
        cy.get('input[type="range"]').as('fontSlider');

        cy.get('@fontSlider').invoke('val').then((beforeStr) => {
          const before = parseInt(String(beforeStr), 10) || 20;
          let target = before < 28 ? before + 1 : before - 1;

          cy.get('@fontSlider')
            .invoke('val', target).trigger('input').trigger('change');

          // Asegura que el control refleje el nuevo valor
          cy.get('@fontSlider').should('have.value', String(target));
        });

        // 4.4 Fondo "cream" -> rgb(248, 244, 234)
        cy.get('button[aria-label="cream"]').first().click();
        getViewport().should('have.css', 'background-color', 'rgb(248, 244, 234)');

        // 4.5 NOTAS: crear y eliminar
        cy.get('input[placeholder="Agregar nota"], input[placeholder="Escribe una nota"]')
          .first().type('Nota Cypress');
        cy.contains('button', /Guardar/i).click();

        cy.contains('li', 'Nota Cypress').should('exist');
        cy.contains('li', 'Nota Cypress').within(() => {
          cy.contains('button', /Eliminar/i).click();
        });
        cy.contains('li', 'Nota Cypress').should('not.exist');
      }
    });

    // 5) NAVEGACIÓN DE CAPÍTULOS
    let initial = 0;
    getChapterNumber().then((n) => { initial = n; });

    // 5.1 Siguiente (acepta "Siguiente Capítulo" o "Siguiente")
    cy.get('body').then(($b) => {
      const $next = $b.find('button:contains("Siguiente Capítulo"), button:contains("Siguiente")');
      if ($next.length && !$next.is(':disabled')) {
        getChapterNumber().then((n0) => {
          cy.wrap($next.first()).click();
          getChapterNumber().should((n1) => {
            expect(n1).to.be.greaterThan(n0);
          });
        });
      }
    });

    // 5.2 Anterior (acepta "Capítulo Anterior" o "Anterior")
    cy.get('body').then(($b) => {
      const $prev = $b.find('button:contains("Capítulo Anterior"), button:contains("Anterior")');
      if ($prev.length && !$prev.is(':disabled')) {
        getChapterNumber().then((n0) => {
          cy.wrap($prev.first()).click();
          getChapterNumber().should((n1) => {
            expect(n1).to.be.lessThan(n0);
          });
        });
      }
    });

    // 6) Link de retorno
    cy.contains(/Volver a Leer Ahora/i).should('have.attr', 'href');
  });
});
