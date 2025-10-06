describe('Ranking E2E', () => {
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

    // Navegar a estadísticas y luego al ranking
    cy.visit('/es/estadisticas');
    cy.wait(2000);
    cy.contains('button', 'Ranking').click();
    cy.wait(1000);
  });

  it('should display the ranking section correctly', () => {
    // Verificar que está en el ranking
    cy.contains('Ranking de Lectores').should('be.visible');
    
    // Verificar que la pestaña ranking está activa usando selector más flexible
    cy.contains('button', 'Ranking').should('have.attr', 'class').and('include', 'active');
  });

  it('should display all filter buttons', () => {
    // Verificar que están todos los botones de filtro
    cy.contains('button', 'Hoy').should('be.visible');
    cy.contains('button', 'Semana').should('be.visible');
    cy.contains('button', 'Mes').should('be.visible');
    cy.contains('button', 'Total').should('be.visible');
  });

  it('should have Total filter active by default', () => {
    // Verificar que "Total" está activo por defecto usando selector más flexible
    cy.contains('button', 'Total').should('have.attr', 'class').and('include', 'active');
  });

  it('should switch active filter when clicked', () => {
    // Hacer clic en "Semana"
    cy.contains('button', 'Semana').click();
    cy.wait(500);
    
    // Verificar que "Semana" está activo
    cy.contains('button', 'Semana').should('have.attr', 'class').and('include', 'active');
  });

  it('should display ranking table with headers', () => {
    // Verificar headers de la tabla
    cy.get('table').should('be.visible');
    cy.get('thead').should('be.visible');
  });

  it('should display ranking data in table format', () => {
    // Verificar que hay tabla y tbody
    cy.get('[class*="rankingTable"]').should('be.visible');
    cy.get('tbody').should('be.visible');
    
    // Verificar que hay al menos una fila
    cy.get('tbody tr').should('have.length.at.least', 1);
  });

  it('should display position numbers correctly', () => {
    // Verificar números de posición
    cy.get('tbody tr').first().should('contain.text', '1º');
  });

  it('should display reader names', () => {
    // Verificar que se muestran nombres de lectores del mock data
    cy.get('tbody tr').should('contain.text', 'Ana García');
  });

  it('should display formatted reading time', () => {
    // Verificar formato de tiempo (horas y minutos)
    cy.get('tbody tr').first().should('contain.text', 'h');
    cy.get('tbody tr').first().should('contain.text', 'min');
  });

  it('should maintain ranking order by reading time', () => {
    // Verificar que Ana García está primera (mayor tiempo)
    cy.get('tbody tr').first().should('contain.text', 'Ana García');
    cy.get('tbody tr').first().should('contain.text', '1º');
  });

  it('should update filter selection on different button clicks', () => {
    // Probar múltiples filtros
    cy.contains('button', 'Hoy').click();
    cy.wait(500);
    cy.contains('button', 'Hoy').should('have.attr', 'class').and('include', 'active');
    
    cy.contains('button', 'Mes').click();
    cy.wait(500);
    cy.contains('button', 'Mes').should('have.attr', 'class').and('include', 'active');
  });

  it('should display all ranking users from data', () => {
    // Verificar que se muestran usuarios del mock data
    cy.get('[class*="rankingTable"]').should('contain.text', 'Ana García');
    cy.get('[class*="rankingTable"]').should('contain.text', 'Carlos López');
    cy.get('[class*="rankingTable"]').should('contain.text', 'Sofía Martínez');
  });

  it('should show correct number of ranking positions', () => {
    // Verificar que hay posiciones numeradas
    cy.get('tbody tr').should('have.length.at.least', 3);
  });

  it('should have responsive design for mobile', () => {
    // Cambiar a vista móvil
    cy.viewport('iphone-6');
    cy.wait(500);
    
    // Verificar que el ranking sigue siendo visible
    cy.contains('Ranking de Lectores').should('be.visible');
    cy.get('table').should('be.visible');
    
    // Verificar filtros en móvil
    cy.contains('button', 'Semana').click();
    cy.wait(500);
    cy.contains('button', 'Semana').should('have.attr', 'class').and('include', 'active');
  });

  it('should navigate back to statistics from ranking', () => {
    // Hacer clic en pestaña de estadísticas
    cy.contains('button', 'Estadísticas Personales').click();
    cy.wait(1000);
    
    // Verificar que regresó a estadísticas
    cy.get('[class*="statsCards"]').should('be.visible');
  });
});