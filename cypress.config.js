const { defineConfig } = require("cypress");

module.exports = defineConfig({

responseTimeout: 15000,
defaultCommandTimeout: 15000,
requestTimeout: 15000,

  e2e: {
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 5,
    browser: 'chrome',
    setupNodeEvents(on, config) {
      defaultCommandTimeout: 15000 // Aumenta el timeout por defecto a 15 segundos (15000 ms)
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },

  reporter: 'cypress-mochawesome-reporter',
          reporterOptions: {
            charts: true,
            reportPageTitle: 'Reporte de Pruebas - Chatbot Uela',
            embeddedScreenshots: true,
            inlineAssets: true,
            saveAllAttempts: false,
          },

  env: {//aca se cambia la URL del chatbot para otros ambientes
   //DEV: 'https://platform.kore.ai/xo-webclient/88036686ce8b40db9128c8d8fb38609be920f5f1dbe64bb2ab9aa68adcfcefacstea?lang=en'
      chatbotUrl: 'https://platform.kore.ai/xo-webclient/ed9bdc0908eb40599780b26cb715229767f3c2787fa84c24a3308de7e4e455e4std2?lang=en' // este es QA
    }

});
