describe('Formulario Solicitar Libro', () => {
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
    cy.visit('/es/miBiblioteca/solicitarlibro')
    });

  it('renderiza el formulario correctamente', () => {
    cy.get('input[title="Título del libro"]').should('exist');
    cy.get('input[title="Nombre del autor"]').should('exist');
    cy.get('input[title="ISBN del libro"]').should('exist');
    cy.get('input[title="Editorial del libro"]').should('exist');
    cy.get('input[title="Año de publicación del libro"]').should('exist');
    cy.get('input[title="Número de páginas del libro"]').should('exist');
    cy.get('input[title="Idioma del libro"]').should('exist');
    cy.get('textarea[title="Resumen del libro"]').should('exist');
    cy.get('input[title="URL de la imagen de portada del libro"]').should('exist');
  });

  it('muestra errores de validación al enviar vacío', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.text-red-500').should('have.length.greaterThan', 0);
  });

  it('permite agregar y eliminar géneros', () => {
    cy.contains('Agregar género').click();
    cy.get('input[placeholder="Género"]').should('have.length', 1);
    cy.contains('Eliminar').click();
    cy.get('input[placeholder="Género"]').should('have.length', 0);
  });

  it('envía el formulario con datos válidos', () => {
    cy.get('input[title="Título del libro"]').type('Cien años de soledad');
    cy.get('input[title="Nombre del autor"]').type('Gabriel García Márquez');
    cy.get('input[title="ISBN del libro"]').type('9780307474728');
    cy.get('input[title="Editorial del libro"]').type('Sudamericana');
    cy.get('input[title="Año de publicación del libro"]').type('1967-05-30');
    cy.get('input[title="Número de páginas del libro"]').type('417');
    cy.get('input[title="Idioma del libro"]').type('Español');
    cy.contains('Agregar género').click();
    cy.get('input[placeholder="Género"]').type('Realismo mágico');
    cy.get('textarea[title="Resumen del libro"]').type('Una obra maestra que narra la historia de la familia Buendía en Macondo.');
    cy.get('input[title="URL de la imagen de portada del libro"]').type('https://example.com/portada.jpg');

    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('formSubmit');
    });

    cy.get('button[type="submit"]').click();
    cy.get('@formSubmit').should('be.calledWithMatch', {
      titulo: 'Cien años de soledad',
      nombreAutor: 'Gabriel García Márquez',
    });
  });
});


describe('Formulario Crear Colección', () => {
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
    cy.visit('/es/miBiblioteca')
    });

  it('navega al formulario al seleccionar "Crear Colección"', () => {
    cy.contains('Crear Colección').click(); // Texto visible en el SideMenu
    cy.get('form').should('exist');
    cy.get('input[name="nameCollection"]').should('exist');
    cy.get('textarea[name="description"]').should('exist');
  });

  it('muestra error si el nombre está vacío', () => {
    cy.contains('Crear Colección').click();
    cy.get('button[type="submit"]').click();
    cy.get('.text-red-500').should('contain.text', 'El nombre de la colección es obligatorio'); // Ajusta según tu traducción
  });

  it('muestra error si la descripción supera 255 caracteres', () => {
    cy.contains('Crear Colección').click();
    cy.get('input[name="nameCollection"]').type('Mi colección');
    cy.get('textarea[name="description"]').type('a'.repeat(256));
    cy.get('button[type="submit"]').click();
    cy.get('.text-red-500').should('contain.text', 'La descripción no puede tener más de 255 caracteres'); // Ajusta según tu traducción
  });

  it('envía el formulario con datos válidos', () => {
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('formSubmit');
    });

    cy.contains('Crear Colección').click();
    cy.get('input[name="nameCollection"]').type('Colección de clásicos');
    cy.get('textarea[name="description"]').type('Libros esenciales de la literatura universal.');
    cy.get('button[type="submit"]').click();

    cy.get('@formSubmit').should('be.calledWithMatch', {
      nameCollection: 'Colección de clásicos',
      description: 'Libros esenciales de la literatura universal.',
    });
  });
});

