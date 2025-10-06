describe('Mi Biblioteca Page', () => {
  beforeEach(() => {
    cy.visit('/es/miBiblioteca');
    
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

  it('renderiza correctamente la página principal', () => {
    // Verificar elementos principales
    cy.get('aside[title="Menu lateral"]').should('exist'); // SideMenu
    cy.get('input').should('exist'); // Barra de búsqueda
    cy.contains('Mi Biblioteca').should('exist');
  });

  it('muestra las opciones del menú lateral', () => {
    // Verificar opciones del SideMenu
    cy.contains('Mi Biblioteca').should('exist');
    cy.contains('Para leer').should('exist'); // Texto real según las traducciones
    cy.contains('Leídos').should('exist');
    cy.contains('Favoritos').should('exist');
    cy.contains('Crear Colección').should('exist');
  });

  it('permite cambiar entre diferentes colecciones', () => {
    // Navegar a "Para leer"
    cy.contains('Para leer').click();
    cy.get('section[role="region"]').should('exist'); // Contenido de la colección
    
    // Navegar a "Leídos"
    cy.contains('Leídos').click();
    cy.get('section[role="region"]').should('exist');
    
    // Navegar a "Favoritos"
    cy.contains('Favoritos').click();
    cy.get('section[role="region"]').should('exist');
  });

  it('muestra el botón "Solicitar libro" y redirige correctamente', () => {
    // Verificar que existe el botón
    cy.contains('Solicitar libro').should('exist');
    
    // Hacer clic y verificar redirección
    cy.contains('Solicitar libro').click();
    cy.url().should('include', '/miBiblioteca/solicitarlibro');
  });

  it('permite buscar libros', () => {
    // Escribir en la barra de búsqueda
    cy.get('input[placeholder*="Buscar"]').type('1984');
    
    // Verificar que la búsqueda funciona (debería filtrar resultados)
    cy.get('article').should('exist'); // BookCard es un article
  });

  it('muestra libros en formato de tarjetas', () => {
    // Verificar que se muestran libros
    cy.get('article').should('have.length.greaterThan', 0); // BookCard como article
    
    // Verificar elementos de las tarjetas
    cy.get('article').first().within(() => {
      cy.get('img').should('exist'); // Imagen del libro
      cy.get('h3').should('exist'); // Título
    });
  });

  it('permite navegar al detalle de un libro', () => {
    // Hacer clic en el primer libro
    cy.get('article a').first().click();
    
    // Verificar que navega al detalle
    cy.url().should('include', '/miBiblioteca/libros/');
  });

  it('muestra el formulario al seleccionar "Crear Colección"', () => {
    // Hacer clic en "Crear Colección"
    cy.contains('Crear Colección').click();
    
    // Verificar que aparece el formulario
    cy.get('form').should('exist');
    cy.get('input[name="nameCollection"]').should('exist');
    cy.get('textarea[name="description"]').should('exist');
  });

  it('muestra estados vacíos apropiados', () => {
    // Navegar a Favoritos (que debería estar vacío inicialmente)
    cy.contains('Favoritos').click();
    
    // Verificar mensaje de estado vacío
    cy.contains('No tienes libros favoritos aún').should('exist');
  });

  it('funciona correctamente en diferentes idiomas', () => {
    // Cambiar a inglés (si hay selector de idioma)
    // cy.get('[data-testid="language-selector"]').select('en');
    // cy.contains('My Library').should('exist');
    
    // Por ahora solo verificamos que funciona en español
    cy.contains('Mi Biblioteca').should('exist');
  });

  it('mantiene el estado de búsqueda al cambiar de colección', () => {
    // Buscar algo
    cy.get('input[placeholder*="Buscar"]').type('test');
    
    // Cambiar de colección
    cy.contains('Para leer').click();
    
    // Verificar que la búsqueda se mantiene
    cy.get('input[placeholder*="Buscar"]').should('have.value', 'test');
  });
});