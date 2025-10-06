describe('Estadísticas E2E', () => {
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

    // Navegar a la página de estadísticas
    cy.visit('/es/estadisticas');
    cy.wait(2000); // Esperar a que cargue completamente
  });

  it('should display the statistics page correctly', () => {
    // Verificar que la página carga
    cy.url().should('include', '/estadisticas');
    
    // Verificar que hay contenido de estadísticas
    cy.get('body').should('be.visible');
    cy.contains('Estadísticas de Lectura').should('be.visible');
  });

  it('should display statistics tab by default', () => {
    // Verificar que la pestaña de estadísticas está activa por defecto
    cy.contains('button', 'Estadísticas Personales').should('be.visible');
    
    // Verificar elementos de estadísticas básicos que deben estar siempre
    cy.get('[class*="statsCards"]').should('be.visible');
    cy.get('[class*="card"]').should('have.length.at.least', 1);
  });

  it('should switch to ranking tab when clicked', () => {
    // Hacer clic en la pestaña de ranking
    cy.contains('button', 'Ranking').click();
    cy.wait(1000);
    
    // Verificar que la pestaña está activa usando un selector más flexible
    cy.contains('button', 'Ranking').should('have.attr', 'class').and('include', 'active');
  });

  it('should display statistics cards with data', () => {
    // Verificar que hay tarjetas usando selectores de CSS modules
    cy.get('[class*="card"]').should('have.length.at.least', 1);
    
    // Verificar que las tarjetas tienen contenido
    cy.get('[class*="card"]').first().should('contain.text', 'Horas de lectura');
  });

  it('should display reading summary section', () => {
    // Verificar sección de resumen usando selector más flexible
    cy.get('[class*="summaryCard"]').should('be.visible');
    cy.contains('libros').should('be.visible');
  });

  it('should display charts in statistics view', () => {
    // Verificar que hay sección de gráficos
    cy.get('[class*="chartsSection"]').should('be.visible');
    
    // Verificar que hay al menos un gráfico
    cy.get('[class*="chartCard"]').should('have.length.at.least', 1);
  });

  it('should switch back to statistics from ranking', () => {
    // Ir al ranking
    cy.contains('button', 'Ranking').click();
    cy.wait(1000);
    
    // Volver a estadísticas
    cy.contains('button', 'Estadísticas Personales').click();
    cy.wait(1000);
    
    // Verificar que regresó a estadísticas
    cy.get('[class*="statsCards"]').should('be.visible');
  });

  it('should display accessibility tooltips', () => {
    // Verificar que hay elementos con títulos (tooltips)
    cy.get('[title]').should('have.length.at.least', 1);
  });

  it('should handle responsive design', () => {
    // Probar en móvil
    cy.viewport('iphone-6');
    cy.wait(500);
    
    // Verificar que elementos siguen siendo visibles
    cy.contains('button', 'Estadísticas Personales').should('be.visible');
    
    // Probar cambio de pestaña en móvil
    cy.contains('button', 'Ranking').click();
    cy.wait(500);
    cy.contains('button', 'Ranking').should('have.attr', 'class').and('include', 'active');
  });

  it('should display year indicator in multiple sections', () => {
    // Verificar que aparece "este año" o el año actual
    const currentYear = new Date().getFullYear().toString();
    
    // Buscar indicadores de año en el contenido
    cy.get('body').should('contain.text', currentYear);
  });
});