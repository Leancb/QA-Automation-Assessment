import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'
import mochawesome from 'cypress-mochawesome-reporter/plugin.js'

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.feature',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }))
      mochawesome(on)
      return config
    },
    chromeWebSecurity: false,
  },
  env: {
    USERNAME: 'standard_user',
    PASSWORD: 'secret_sauce'
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: true
  },
  video: false,
})
