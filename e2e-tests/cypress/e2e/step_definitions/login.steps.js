import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que eu abro a página inicial', () => {
  cy.visit('/')
})

When('eu faço login com credenciais válidas', () => {
  cy.get('#user-name').type(Cypress.env('USERNAME'))
  cy.get('#password').type(Cypress.env('PASSWORD'))
  cy.get('#login-button').click()
})

Then('devo ver a página de produtos', () => {
  cy.url().should('include', '/inventory.html')
  cy.get('.inventory_list').should('be.visible')
})
