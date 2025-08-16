// El describe agrupa toda la suite de pruebas
describe('Pruebas del flujo Informacion General donde analiza respuesta de una pregunta', () => {

  // --- PASO 1: Cargar los datos al principio con require ---
  const datos = require('../fixtures/flujoInfoGral.json'); /// aca hay que cambiarlo por el archivo JSON relcionado

  // beforeEach se ejecutará antes de cada 'it'
  beforeEach(() => {
    cy.visit(Cypress.env('chatbotUrl'));
    // Hacemos clic en el botón "Informacion General"
    cy.get('.bot-bubble-comp .bubble-msg', { timeout: 7000 }).should('have.length.at.least', 2);
    cy.contains('button', 'Información general').should('be.visible').click();
    // Verificamos la primera respuesta del bot para este flujo
    cy.get('.bot-bubble-comp .bubble-msg').last().should('contain.text', 'ayudarte', { matchCase: false });
    cy.wait(500);
  });

  // Crear los 'it' usando los datos ya cargados --
  datos.flujoInfoGral.forEach(turno => { //aca se coloca el nombre del array del archivo JSON
    it(`Debería responder a "${turno.pregunta}" con una de las palabras esperadas`, () => {
      // El comando 'askBot' se encarga de escribir, enviar y validar la respuesta.
      cy.askBot(turno.pregunta, turno.respuestasEsperadas);
    });
  });
});