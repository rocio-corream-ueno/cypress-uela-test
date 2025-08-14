// cypress/support/commands.js

Cypress.Commands.add('askBot', (message, expectedResponse) => {
  // 1. Contamos cuántos mensajes del bot hay ANTES de actuar.
  cy.get('.bot-bubble-comp .bubble-msg').its('length').then((initialBotMessages) => {
    cy.log(`Mensajes iniciales del bot: ${initialBotMessages}`);

    // 2. El usuario escribe y envía el mensaje
    cy.get('#typing-text-area').should('be.visible').type(message);
    cy.get('.send-btn').should('be.visible').click();

    // 3. ESPERAMOS A QUE LA UI SE ACTUALICE:
    // Verificamos que el número de mensajes ahora sea "el número inicial + 1".
    cy.get('.bot-bubble-comp .bubble-msg', { timeout: 20000 })
      .should('have.length', initialBotMessages + 1);

    // 4. Ahora que el nuevo mensaje existe, verificamos su contenido.
    cy.get('.bot-bubble-comp .bubble-msg')
      .last();
      // Si se proporcionaron palabras clave, se construye la verificación "O".
          if (expectedResponse.length > 0) {
            // Une todas las palabras con el símbolo "O" (|) para crear un patrón.
            const orPattern = expectedResponse.join('|');
            // Crea la expresión regular (la 'i' al final la hace insensible a mayúsculas/minúsculas).
            const regex = new RegExp(orPattern, 'i');

            cy.log(`Verificando que el mensaje contenga: ${orPattern}`);
            lastMessage.should('match', regex);
          }
  });
});