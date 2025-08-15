// cypress.config.cjs - habilita Cucumber + Mochawesome (HTML)
// Requer:
//   npm i -D @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor
//   npm i -D cypress-mochawesome-reporter mochawesome mochawesome-merge

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    baseUrl: "https://www.saucedemo.com/",
    video: false, // opcional

    setupNodeEvents: async (on, config) => {
      // Cucumber
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin(config)] }));

      // Mochawesome reporter
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },

  // Reporter HTML
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    charts: true,
    reportPageTitle: "Relatório de Testes",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
});
