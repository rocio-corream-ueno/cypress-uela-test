const { defineConfig } = require("cypress");

module.exports = defineConfig({

responseTimeout: 15000,
defaultCommandTimeout: 20000,
requestTimeout: 15000,

  e2e: {
    browser: 'chrome',
    setupNodeEvents(on, config) {
      defaultCommandTimeout: 20000 // Aumenta el timeout por defecto a 20 segundos (10000 ms)
    },
  },

  env: {
      chatbotUrl: 'https://platform.kore.ai/xo-webclient/88036686ce8b40db9128c8d8fb38609be920f5f1dbe64bb2ab9aa68adcfcefacstea?lang=en'
    }

});
