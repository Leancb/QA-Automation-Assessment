import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CheckoutPage } from "../../../pages/CheckoutPage";

const login = new LoginPage();
const inv   = new InventoryPage();
const chk   = new CheckoutPage();

Given('que acesso a aplicação', () => {
  login.visit();
});

When('eu faço login com credenciais válidas', () => {
  login.login(); // já valida /inventory.html
});

When('eu navego até o formulário de checkout', () => {
  inv.goToCart();
  chk.goToStepOne();
});

Then('deve abrir a tela Checkout: Your Information', () => {
  cy.url().should('include', '/checkout-step-one.html');
  cy.get('#header_container .title')
    .should('be.visible')
    .should('have.text', 'Checkout: Your Information');
});
