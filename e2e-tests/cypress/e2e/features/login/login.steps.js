const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Given(/^que eu abro a página inicial$/, () => {
  cy.visit('https://www.saucedemo.com/');
});

When(/^eu faço login$/, () => {
  cy.get('[data-test="username"]').clear().type('standard_user');
  cy.get('[data-test="password"]').clear().type('secret_sauce', { log: false });
  cy.get('[data-test="login-button"]').click();
});

Then(/^devo ver a lista de produtos$/, () => {
  cy.url().should('include', '/inventory.html');
  cy.get('.inventory_list').should('be.visible');
});
