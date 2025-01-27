const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 60000,
    reporter: "mochawesome",
    video: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    reporterOptions: {
      reportDir: "results/logs",
      overwrite: true,
      html: false,
      json: true,
    },
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
  env: {
    name: "test",
    Url: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  }
});
