describe('MainPage E2E', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        // Simular base de datos local de usuarios
        win.localStorage.setItem(
          "lecturium_users",
          JSON.stringify({
            "usuario@test.com": {
              name: "Gabriela",
              email: "usuario@test.com",
              password: "123456"
            }
          })
        );

        // Simular sesión activa
        win.localStorage.setItem(
          "lecturium_current_user",
          JSON.stringify({
            email: "usuario@test.com",
            name: "Gabriela"
          })
        );
      }
    });

    cy.visit('/es/mainPage'); // ajusta a la ruta de MainPage
  });

  it('redirects to login if not logged in', () => {
    cy.window().then((win) => {
      win.localStorage.removeItem("lecturium_current_user"); // borrar sesión
    });
    cy.visit('/es/mainPage');
    cy.url().should('include', '/login');
  });

  it('renders greeting and subtitle with logged in user', () => {
    cy.get('h2[title="Saludo"]').should('contain.text', 'Gabriela');
    cy.get('h4').should('exist');
  });

  it('renders recommended books', () => {
    cy.get('div[title="Libros Recomendados"]').within(() => {
      cy.get('[data-testid="book-card"]').should('have.length.greaterThan', 0);
    });
  });

  it('renders current reads with progress bars', () => {
    cy.get('div[title="Lecturas actuales"]').within(() => {
      cy.get('[data-testid="book-card-progress"]').should('have.length.greaterThan', 0);
    });
  });

  it('renders featured event card', () => {
    cy.get('div[title="Evento Destacado"]').within(() => {
      cy.get('.EventCard').should('exist');
    });
  });

  it('renders calendar in the aside', () => {
    cy.get('aside[title="Side section"]').within(() => {
      cy.get('div[title="Calendario"]').should('exist');
    });
  });

  it('renders badges section with insignias', () => {
  cy.get('aside[title="Side section"]').within(() => {
    cy.get('div[title="Insignias y logros"]').should('exist');
    cy.get('div[title="Insignias"]')
      .find('[data-testid="Insignias"]')
      .should('have.length.greaterThan', 0);
  });
});

});
