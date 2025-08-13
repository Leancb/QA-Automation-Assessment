// CJS (CommonJS) – compatível com Node ao usar .cjs
const { defineConfig } = require('cypress');
const mochawesome = require('cypress-mochawesome-reporter/plugin');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const cucumberEsbuild = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    // 👇 ajuda o plugin a encontrar seus steps
    stepDefinitions: [
      'cypress/e2e/**/*.steps.{js,mjs,ts,tsx}',
      'cypress/support/step_definitions/**/*.{js,mjs,ts,tsx}'
    ],
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      embeddedScreenshots: true,
      charts: true
    },
    setupNodeEvents: async (on, config) => {
      const mochawesome = require('cypress-mochawesome-reporter/plugin');
      mochawesome(on);

      const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
      const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
      const cucumberEsbuild = require('@badeball/cypress-cucumber-preprocessor/esbuild');

      await addCucumberPreprocessorPlugin(on, config);

      const esb = cucumberEsbuild.createEsbuildPlugin || cucumberEsbuild.default;
      on('file:preprocessor', createBundler({ plugins: [esb(config)] }));

      return config;
    }
  }
});
