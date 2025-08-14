// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'


Cypress.on('uncaught:exception', (err, runnable) => {
    // Le decimos a Cypress que ignore los errores específicos de IndexedDB
    // que vienen de la aplicación del chatbot.
    if (err.message.includes('The database connection is closing')) {
      return false;
    }
    // Para cualquier otro error, deja que Cypress falle la prueba.
    return true;
  });