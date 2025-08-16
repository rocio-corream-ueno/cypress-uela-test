describe('Pruebas de flujo fuera - Todas deben mostrar el menú principal', () => {
  const datos = require('../fixtures/flujoFuera.json');

  beforeEach(() => {
    cy.visit(Cypress.env('chatbotUrl'));
  });

  // Creamos un 'it' para cada pregunta del archivo
  datos.fueraDeLosFlujos.forEach(turno => {
    it(`La pregunta "${turno.pregunta}" debería mostrar el menú principal`, () => {
      cy.log(`--- Probando pregunta: "${turno.pregunta}" ---`);

      // 1. ACCIÓN
      cy.get('#typing-text-area').should('be.visible').type(turno.pregunta);
      cy.get('.send-btn').should('be.visible').click();
      // 2. VALIDACIÓN
      // Se espera que la respuesta final sea siempre el menú principal.
      // Si no lo es, este comando fallará y la prueba se marcará en rojo.
      cy.validateMainMenu();
    });
  });
});