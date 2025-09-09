// cypress/support/commands.js

// Comando personalizado para validar el menú principal del chatbot
Cypress.Commands.add('validateMainMenu', () => {
  cy.log('Verificando que el menú principal esté visible...');

  // 1. Verifica el último mensaje del bot.
  cy.get('.bot-bubble-comp .bubble-msg', { timeout: 7000 })
    .last()
    .should('contain.text', 'Elegí una de estas opciones');

  // 2. Verifica que los botones del menú estén visibles, haciendo scroll primero.
  cy.contains('button', 'Cotizar mi viaje').scrollIntoView().should('be.visible');
  cy.contains('button', 'Reclamos y gestiones').scrollIntoView().should('be.visible');
  cy.contains('button', 'Información general').scrollIntoView().should('be.visible');
});

// Comando personalizado para enviar un mensaje al bot y validar la respuesta
Cypress.Commands.add('askBot', (message, expectedKeywordsArray) => {
  cy.get('.bot-bubble-comp .bubble-msg').its('length').then((initialBotMessages) => {
  cy.get('#typing-text-area').should('be.visible').type(message, { force: true });
  cy.get('.send-btn').should('be.visible').click();

  // --- BLOQUE DE DEPURACIÓN Y VERIFICACIÓN ---
  cy.get('.bot-bubble-comp .bubble-msg', { timeout: 25000 })
     .should('have.length', initialBotMessages + 1)
      .last()
      // Usamos .then() para inspeccionar el elemento antes de la aserción final
      .then($lastMessage => {
        // Obtenemos el texto real que Cypress está viendo en ese elemento.
        const actualText = $lastMessage.text();
        // Ahora, con el texto real en la mano, hacemos la aserción.
        const regex = createAccentInsensitiveRegex(expectedKeywordsArray);
        expect(actualText).to.match(regex);
      });
  });
});

/**
 * Valida que un mensaje del bot que contenga una de las palabras clave esperadas
 * sea visible en la conversación, sin importar su posición.
 * @param {string[]} expectedKeywordsArray - Un array de palabras clave a buscar.
 */
Cypress.Commands.add('validateBotTextResponse', (expectedKeywordsArray) => {
  // 1. Creamos la expresión regular a partir de las palabras clave.
  const regex = createAccentInsensitiveRegex(expectedKeywordsArray);
  // 2. Usamos cy.contains() para encontrar CUALQUIER burbuja de mensaje que
  // coincida con nuestra expresión regular. Cypress esperará (hasta el timeout)
  // a que un elemento así aparezca.
  cy.contains('.bot-bubble-comp .bubble-msg', regex, { timeout: 10000 })
    .should('be.visible');
});


/**
 * Función ayudante para crear la expresión regular.
 */
function createAccentInsensitiveRegex(keywords) {
  if (!keywords || keywords.length === 0) return new RegExp('^$', 'i');
  const pattern = keywords.map(keyword =>
    keyword.replace(/a/g, '[aá]').replace(/e/g, '[eé]').replace(/i/g, '[ií]').replace(/o/g, '[oó]').replace(/u/g, '[uú]')
  ).join('|');
  return new RegExp(pattern, 'i');
}