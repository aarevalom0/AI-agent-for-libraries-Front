describe('My community Page', () => {
  beforeEach(() => {
    cy.visit('/es/comunidad');
    
    // Configurar localStorage después de la visita
    cy.window().then((win) => {
      win.localStorage.setItem(
        "lecturium_current_user",
        JSON.stringify({
          email: "usuario@test.com",
          name: "Gabriela"
        })
      );
    });
  });


  it('renderiza correctamente la página principal de comunidad', () => {
    cy.get('aside').should('exist'); // Sidebar
    cy.get('h1').should('exist'); // Título principal
    cy.get('input[type="text"]').should('exist'); // Barra de búsqueda
  });

  it('muestra las opciones del menú lateral', () => {
    cy.get('aside').within(() => {
      cy.contains(/Autores|Comunidad/i).should('exist');
      cy.contains(/Amigos/i).should('exist');
      cy.contains(/Club/i).should('exist');
    });
  });

  it('permite navegar entre secciones (Autores, Amigos, Clubes)', () => {
    cy.contains(/Amigos/i).click();
    cy.url().should('include', '/comunidad/amigos');
    cy.get('h1').should('contain.text', 'Amigos');

    cy.contains(/Club/i).click();
    cy.url().should('include', '/comunidad/club');
    cy.get('h1').should('contain.text', 'Club');

    cy.contains(/Autor|Comunidad/i).click();
    cy.url().should('include', '/comunidad');
  });

  it('muestra tarjetas de autores o comunidades', () => {
    cy.get('div')
      .filter(':contains("Unirse")') // botón dentro de la tarjeta
      .should('exist');
  });

  it('permite buscar dentro de la comunidad', () => {
    cy.get('input[type="text"]').type('Gabriel');
    cy.get('input[type="text"]').should('have.value', 'Gabriel');
  });



  it('muestra el formulario de crear comunidad con sus campos', () => {
    cy.visit('/es/comunidad/crearComunidad');
    cy.get('form').should('exist');
    cy.get('input').should('exist');
    cy.get('textarea').should('exist');
  });

  it('muestra la lista de amigos correctamente', () => {
    cy.visit('/es/comunidad/amigos');
    cy.get('h1').should('contain.text', 'Amigos');
  });

  it('muestra la lista de clubes de lectura correctamente', () => {
    cy.visit('/es/comunidad/club');
    cy.get('h1').should('contain.text', 'Club');
  });

  it('verifica el comportamiento de búsqueda en clubes', () => {
    cy.visit('/es/comunidad/club');
    cy.get('input[type="text"]').type('Misterio');
    cy.get('input[type="text"]').should('have.value', 'Misterio');
  });

  it('verifica que las traducciones carguen correctamente', () => {
    cy.get('aside').should('contain.text', 'Amigos');
  });
});