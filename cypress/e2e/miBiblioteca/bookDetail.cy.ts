describe('BookDetail Page', () => {
  beforeEach(() => {
    cy.visit('/es/miBiblioteca/libros/2');
    
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

  it('renderiza correctamente los detalles del libro', () => {
    // Verificar que el componente BookDetail se carga
    cy.get('article').should('exist'); // El componente principal es un article
    
    // Verificar elementos básicos del libro
    cy.get('img[alt*="Portada del libro"]').should('exist');
    cy.get('h1').should('exist'); // Título del libro
    cy.get('nav[aria-label*="migas de pan"]').should('exist'); // Breadcrumb con el texto real
  });

  it('muestra la información del libro correctamente', () => {
    // Verificar que se muestra información específica del libro
    cy.get('h1').should('contain.text', '1984'); // Título específico del libro ID 2
    cy.get('strong').should('contain.text', 'George Orwell'); // Autor
    cy.get('span[role="listitem"]').should('exist'); // Géneros
    cy.get('p.text-\\[var\\(--colorSecundario\\)\\].leading-relaxed').should('exist'); // Descripción
  });

  it('permite navegación de regreso a Mi Biblioteca', () => {
    // Verificar enlace en el breadcrumb (href viene del prop previousPageHref que es '/miBiblioteca')
    cy.get('nav ol li a').should('exist').and('have.attr', 'href', '/miBiblioteca');
    cy.get('nav ol li a').first().click();
    cy.url().should('include', '/miBiblioteca');
  });

  it('muestra las reseñas del libro', () => {
    // Verificar sección de reseñas
    cy.get('section[aria-labelledby="reviews-heading"]').should('exist');
    cy.get('h2#reviews-heading').should('exist');
    cy.contains('Reseñas').should('exist');
  });

  it('permite agregar el libro a colecciones', () => {
    // Verificar selector de colecciones
    cy.get('select').should('exist');
    cy.get('select option').should('have.length.greaterThan', 0);
    
    // Seleccionar una colección
    cy.get('select').select('Favoritos');
    cy.get('select').should('have.value', 'favoritos');
  });

  it('muestra botones de acción', () => {
    // Verificar botones principales
    cy.contains('Compartir').should('exist');
    cy.contains('Detalles del libro').should('exist');
  });

  it('maneja libro no encontrado', () => {
    cy.visit('/es/miBiblioteca/libros/999');
    
    cy.window().then((win) => {
      win.localStorage.setItem(
        "lecturium_current_user",
        JSON.stringify({
          email: "usuario@test.com",
          name: "Gabriela"
        })
      );
    });
    
    // Verificar mensaje de error
    cy.contains('Libro no encontrado').should('exist');
    cy.get('a[href="/miBiblioteca"]').should('exist');
  });
});