// cypress/e2e/chatbot.cy.js

describe('Pruebas del flujo "Cotizar mi viaje"', () => {

  beforeEach(() => {
    // Visita la página antes de cada prueba
    cy.visit(Cypress.env ('chatbotUrl'));
  });

  it('Debe completar una cotización respondiendo las preguntas del bot', () => {

    // 1. VERIFICAR los mensajes iniciales y hacer clic en el botón
    cy.get('.bot-bubble-comp .bubble-msg', { timeout: 15000 }).should('have.length.at.least', 2);
    cy.get('.bot-bubble-comp .bubble-msg').eq(1).should('contain.text', 'Elegí una de estas opciones');
    cy.contains('button', 'Cotizar mi viaje').should('be.visible').click();

     // Esperamos la primera respuesta después del clic
        cy.get('.bot-bubble-comp .bubble-msg', { timeout:20000 }).last().should('contain.text', 'Contame sobre el viaje');

    // 2. USAR NUESTRO COMANDO PERSONALIZADO para la conversación
    cy.log('--- Respondiendo a las preguntas de cotización ---');

    cy.askBot('Quiero viajar a Cancún'      , { or: ['Cancun','desde', 'donde'] });
    cy.askBot('voy a salir desde Bogota'   , { or: ['fecha', 'fechas', 'pensado'] });
    cy.askBot('del 20 al 30 del proximo mes', { or: ['adultos', 'personas'] });
    cy.askBot('2 Adultos y 3 niños'            , { or: ['Productos', 'Paquetes'] });
    cy.askBot('quiero averiguar por el paquete turistico' , { or: ['Nombre', 'Apellido'] });
    cy.askBot('Juan Perez'            , { or: ['correo', 'electronico'] });
    cy.askBot('uenotests@gmail.com'            , { or: ['resumen', 'confirma'] });
    cy.askBot('si esta ok'            , { or: ['ayudo', 'algo'] });
    cy.contains('button', 'No, gracias').should('be.visible').click();
  });


});