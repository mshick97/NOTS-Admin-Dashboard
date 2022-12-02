const { defineConfig } = require('cypress');

console.log(process.env.NODE_ENV);

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
