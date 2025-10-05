describe('LayoutWrapper visibility', () => {
  const visibleRoutes = [ '/es/mainPage', '/en/mainPage','/es/comunidad', '/en/comunidad'];
  const hiddenRoutes = ['/es', '/es/login', '/es/register', '/en', '/en/login', '/en/register'];

  visibleRoutes.forEach((route) => {
    it(`should show NavBar and Footer on ${route}`, () => {
      cy.visit(route);
      cy.get('nav').should('exist');
      cy.get('footer').should('exist');
    });
  });

  hiddenRoutes.forEach((route) => {
    it(`should hide NavBar and Footer on ${route}`, () => {
      cy.visit(route);
      cy.get('nav').should('not.exist');
      cy.get('footer').should('not.exist');
    });
  });
});

describe('Navbar', () => {
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
    })
    });

    it('should render the NavBar', () => {
        cy.visit('/es/mainPage');
        cy.get('[data-testid="main-navbar"]').should('exist');
        });

    it('should contain navigation links', () => {
        cy.visit('/es/mainPage');
        cy.get('[data-testid="main-navbar"]').within(() => {
        cy.contains('Home').should('exist');
        cy.contains('Eventos').should('exist');
        cy.contains('Estadísticas').should('exist');
        cy.contains('Mi biblioteca').should('exist');
        cy.contains('Leer ahora').should('exist');
        cy.contains('Comunidad').should('exist');
        });
    });


    it('should contain navigation links and navigate correctly', () => {
        cy.visit('/es/mainPage');
        cy.get('[data-testid="main-navbar"]').within(() => {
            cy.contains('Eventos').click();
        });
        const links = [
          '/mainPage',
          '/eventos',
          '/estadisticas',
          '/miBiblioteca',
          '/leerAhora',
          '/comunidad',
        ];

        links.forEach((href) => {
          cy.get('[data-testid="main-navbar"]')
            .find(`a[href="${href}"]`)
            .should('exist');
        });
    });


    it('should switch language when clicking locale button', () => {
        cy.visit('/es/mainPage');
        cy.get('[data-testid="main-navbar"]').contains('EN').click();
        cy.url().should('include', '/en');
    });

});


describe('Footer', () => {
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
    })
    cy.visit('/mainPage')
    });


  it('should render the footer', () => {
    cy.get('[data-testid="main-footer"]').should('exist');
  });

  it('should contain navigation links', () => {
    const links = [
      '/mainPage',
      '/eventos',
      '/estadisticas',
      '/miBiblioteca',
      '/leerAhora',
      '/comunidad',
    ];

    links.forEach((href) => {
      cy.get('[data-testid="main-footer"]')
        .find(`a[href="${href}"]`)
        .should('exist');
    });
  });

  it('should display social media icons', () => {
    cy.get('footer').within(() => {
      cy.get('svg').should('have.length.at.least', 4); // Facebook, LinkedIn, Instagram, YouTube
    });
  });

  it('should show copyright text with current year', () => {
    const year = new Date().getFullYear();
    cy.contains(`© ${year} Innovatech Solutions`).should('exist');
  });
});


