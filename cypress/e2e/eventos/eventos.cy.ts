describe('Eventos E2E', () => {
  beforeEach(() => {
    // Simular usuario logueado
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem(
          "lecturium_current_user",
          JSON.stringify({
            email: "usuario@test.com",
            name: "Gabriela"
          })
        );
      }
    });

    // Navegar a la página de eventos
    cy.visit('/es/eventos');
  });

  it('should display the events page correctly', () => {
    // Verificar que la página carga
    cy.url().should('include', '/eventos');
    
    // Verificar que hay contenido de eventos
    cy.get('body').should('be.visible');
  });

  it('should display event cards with correct information', () => {
    // Verificar que hay tarjetas de eventos usando selectores más flexibles
    cy.get('[class*="EventCard"], [class*="eventCard"]').should('have.length.greaterThan', 0);
    
    // Verificar elementos de la primera tarjeta de evento
    cy.get('[class*="EventCard"], [class*="eventCard"]').first().within(() => {
      // Debe tener título
      cy.get('h3, h2, h4').should('exist');
      
      // Debe tener imagen
      cy.get('img').should('exist');
      
      // Debe tener botón de "Ver más"
      cy.contains('Ver más').should('exist');
    });
  });

  it('should navigate to event detail when clicking "Ver más"', () => {
    // Hacer clic en el primer botón "Ver más"
    cy.get('[class*="EventCard"], [class*="eventCard"]').first().within(() => {
      cy.contains('Ver más').click();
    });
    
    // Verificar navegación al detalle del evento
    cy.url().should('include', '/eventos/');
  });

  it('should display event images correctly', () => {
    cy.get('[class*="EventCard"] img, [class*="eventCard"] img').each(($img) => {
      // Verificar que las imágenes tienen atributo alt
      cy.wrap($img).should('have.attr', 'alt');
      
      // Verificar que las imágenes se cargan correctamente
      cy.wrap($img).should('be.visible');
    });
  });

  it('should handle navigation from other pages', () => {
    // Navegar desde la página principal
    cy.visit('/es/mainPage');
    
    // Buscar un enlace a eventos (ajustar según tu navbar)
    cy.get('nav').first().within(() => {
      cy.contains('Eventos').click();
    });
    
    // Verificar que llegamos a eventos
    cy.url().should('include', '/eventos');
  });

  it('should display event titles and descriptions', () => {
    // Verificar que los títulos no están vacíos
    cy.get('[class*="EventCard"] h3, [class*="eventCard"] h3, [class*="EventCard"] h2, [class*="eventCard"] h2').should('not.be.empty');
  });

  it('should be responsive on mobile devices', () => {
    // Cambiar a vista móvil
    cy.viewport('iphone-6');
    
    // Verificar que los elementos siguen siendo visibles
    cy.get('[class*="EventCard"], [class*="eventCard"]').should('be.visible');
    cy.get('[class*="EventCard"] img, [class*="eventCard"] img').should('be.visible');
  });

  it('should handle multiple events correctly', () => {
    // Contar eventos
    cy.get('[class*="EventCard"], [class*="eventCard"]').then(($events) => {
      const eventCount = $events.length;
      
      if (eventCount > 1) {
        // Si hay múltiples eventos, verificar que todos tienen la estructura correcta
        cy.get('[class*="EventCard"], [class*="eventCard"]').each(($event) => {
          cy.wrap($event).within(() => {
            cy.get('h3, h2, h4').should('exist');
            cy.get('img').should('exist');
          });
        });
      }
    });
  });
});