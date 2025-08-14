// cypress/e2e/chatbot.cy.js

describe('Pruebas del flujo "Cotizar mi viaje"', () => {

  beforeEach(() => {
    // Visita la página antes de cada prueba
    cy.visit(Cypress.env ('chatbotUrl'));
    // VERIFICAR los mensajes iniciales y hacer clic en el botón
        cy.get('.bot-bubble-comp .bubble-msg', { timeout: 15000 }).should('have.length.at.least', 2);
        cy.get('.bot-bubble-comp .bubble-msg').eq(1).should('contain.text', 'Elegí una de estas opciones');
        cy.contains('button', 'Cotizar mi viaje').should('be.visible').click();
        // Esperamos la primera respuesta después del clic
        cy.get('.bot-bubble-comp .bubble-msg').last().should('contain.text', 'Contame sobre el viaje');
  });

  it('Debe completar la cotización y finalizar con No, gracias', () => {

   // CARGAR Y RECORRER LOS DATOS ---
       cy.fixture('flujoCotizacion.json').then((datos) => {
         datos.flujoCotizacion.forEach(turno => {
           // 'turno.respuestasEsperadas' es el array de palabras
           cy.askBot(turno.pregunta, turno.respuestasEsperadas);
         });
       });
       // Después de que toda la conversación del JSON termina, hacemos el último clic.
       cy.contains('button', 'No, gracias',{ matchCase : false }).should('be.visible').click();
       // validar que el bot regresó al inicio
           cy.validateMainMenu();
  });

it('Debe completar la cotización y finalizar con Si, gracias', () => {

   // CARGAR Y RECORRER LOS DATOS ---
       cy.fixture('flujoCotizacion.json').then((datos) => {
         datos.flujoCotizacion.forEach(turno => {
           // 'turno.respuestasEsperadas' es el array de palabras
           cy.askBot(turno.pregunta, turno.respuestasEsperadas);
         });
       });
       // Después de que toda la conversación del JSON termina, hacemos el último clic.
       cy.contains('button', 'Sí, por favor',{ matchCase : false }).should('be.visible').click();
       // validar que el bot regresó al inicio
       cy.validateMainMenu();
  });
});