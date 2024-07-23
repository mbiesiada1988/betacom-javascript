const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://edxdemo1.betacom.com.pl',
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: false,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {},
  },
});
