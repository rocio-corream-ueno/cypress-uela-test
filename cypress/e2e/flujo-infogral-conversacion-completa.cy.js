describe('Pruebas del flujo "Informacion General Recorrido Completo"', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('chatbotUrl'));
    //hacemos clic en el botón "Informacion General" ---
    cy.get('.bot-bubble-comp .bubble-msg', { timeout: 7000 }).should('have.length.at.least', 2);
    cy.contains('button', 'Información general').should('be.visible').click();
     // Verificamos la primera respuesta del bot para este flujo
    cy.contains('.bot-bubble-comp .bubble-msg', 'contame cómo puedo ayudarte', { matchCase: false})
          .should('be.visible');
  });

  it('Debe completar el flujo de informacion general -- usando flujoInfoGral.json', () => {

    // --- CARGAR Y RECORRER LOS DATOS archivo ---
    cy.fixture('flujoInfoGral.json').then((datos) => {//aca se coloca el nombre del archivo JSON
      datos.flujoInfoGral.forEach(turno => {// aca se coloca el nombre del array del archivo JSON
        cy.askBot(turno.pregunta, turno.respuestasEsperadas);
      });
    });
    cy.validateMainMenu();
  });
});