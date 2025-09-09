describe('Pruebas del flujo "Reclamos y Gestiones"', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('chatbotUrl'));
    //hacemos clic en el botón "Reclamos y gestiones" ---
    cy.get('.bot-bubble-comp .bubble-msg', { timeout: 10000 }).should('have.length.at.least', 2);
    cy.contains('button', 'Reclamos y gestiones').should('be.visible').click();

    // 1. Verificamos que aparezca el PRIMER mensaje nuevo.
      // cy.contains espera automáticamente a que el elemento aparezca.
      cy.contains('.bot-bubble-comp .bubble-msg', 'Asistencia inmediata', { timeout: 10000 })
        .should('be.visible');

    // 2. Y LUEGO, verificamos que aparezca el SEGUNDO mensaje, que es nuestro punto de partida.
      cy.contains('.bot-bubble-comp .bubble-msg', 'puedo ayudarte',{ matchCase: false, timeout: 15000 })
        .should('be.visible');
  });

  it('Debe completar el flujo de reclamos y terminando con un Si, por favor -- flujoReclamos.json', () => {

    // --- CARGAR Y RECORRER LOS DATOS archivo ---
    cy.fixture('flujoReclamos.json').then((datos) => { //aca se coloca el nombre del archivo JSON
      datos.flujoReclamos.forEach(turno => {//aca se coloca el nombre del array del archivo JSON
        cy.askBot(turno.pregunta, turno.respuestasEsperadas);
      });
    });
    cy.contains('button', 'Sí, por favor', { matchCase: false }).should('be.visible').click();
    // Verifica el último mensaje o botón de este flujo
    cy.validateMainMenu();
  });

 it('Debe completar el flujo de reclamos y terminando con un No, gracias -- flujoReclamos.json', () => {
     // --- CARGAR Y RECORRER LOS DATOS archivo ---
     cy.fixture('flujoReclamos.json').then((datos) => {// aca se coloca el nombre del array del archivo JSON,, pueden ser archivos diferentes
       datos.flujoReclamos.forEach(turno => {// aca se coloca el nombre del array del archivo JSON
         cy.askBot(turno.pregunta, turno.respuestasEsperadas);
       });
     });
     cy.contains('button', 'No, gracias', { matchCase: false }).should('be.visible').click();
     // Verifica el último mensaje o botón de este flujo
     cy.validateMainMenu();
   });
});