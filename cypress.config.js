const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    name: "test",
    Url: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  }
});
