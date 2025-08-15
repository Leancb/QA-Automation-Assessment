export class LoginPage {
  visit() {
    // baseUrl já deve estar em cypress.config.* (padrão: https://www.saucedemo.com/)
    cy.visit('/');
  }

  login(user = 'standard_user', pass = 'secret_sauce') {
    cy.get('#user-name').should('be.visible').clear().type(user);
    cy.get('#password').should('be.visible').clear().type(pass);
    cy.get('#login-button').should('be.visible').click();
    cy.url().should('include', '/inventory.html');
  }
}
