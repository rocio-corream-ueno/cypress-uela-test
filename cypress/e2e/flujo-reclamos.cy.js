describe('Pruebas del flujo "Reclamos y Gestiones"', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('chatbotUrl'));
    //hacemos clic en el botón "Reclamos y gestiones" ---
    cy.get('.bot-bubble-comp .bubble-msg', { timeout: 15000 }).should('have.length.at.least', 2);
    cy.contains('button', 'Reclamos y gestiones').should('be.visible').click();
     // Verificamos la primera respuesta del bot para este flujo
    cy.get('.bot-bubble-comp .bubble-msg').last().should('contain.text', 'Contame cómo puedo ayudarte');
  });

  it('Debe completar el flujo de reclamos y terminando con un Si, por favor', () => {

    // --- CARGAR Y RECORRER LOS DATOS archivo ---
    cy.fixture('flujoReclamos.json').then((datos) => {
      datos.flujoReclamos.forEach(turno => {
        cy.askBot(turno.pregunta, turno.respuestasEsperadas);
      });
    });
    cy.contains('button', 'Sí, por favor', { matchCase: false }).should('be.visible').click();
    // Verifica el último mensaje o botón de este flujo
    cy.validateMainMenu();
  });

 it('Debe completar el flujo de reclamos y terminando con un No, gracias', () => {

     // --- CARGAR Y RECORRER LOS DATOS archivo ---
     cy.fixture('flujoReclamos.json').then((datos) => {
       datos.flujoReclamos.forEach(turno => {
         cy.askBot(turno.pregunta, turno.respuestasEsperadas);
       });
     });
     cy.contains('button', 'No, gracias', { matchCase: false }).should('be.visible').click();
     // Verifica el último mensaje o botón de este flujo
     cy.validateMainMenu();
   });
});