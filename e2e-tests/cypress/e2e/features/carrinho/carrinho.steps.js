import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CheckoutPage } from "../../../pages/CheckoutPage";

const login = new LoginPage();
const inv   = new InventoryPage();
const chk   = new CheckoutPage();

// ---------- Background ----------
Given('que estou logado na aplicação', () => {
  login.visit();
  login.login(); // já valida /inventory.html
});

// ---------- Passos do cenário ----------

When('eu procuro o produto {string}', (nome) => {
  inv.productCard(nome); // assert de visibilidade dentro do método
});

When('eu guardo o valor do produto {string}', (nome) => {
  inv.getPrice(nome).as('valorProdutoGuardado');
});

When('eu clico no botão Add to cart do produto {string}', (nome) => {
  inv.addToCart(nome);
});

When('eu localizo novamente o produto {string}', (nome) => {
  inv.productCard(nome); // só revalida presença
});

When('eu clico no botão Remover do produto {string}', (nome) => {
  inv.removeFromCart(nome);
});

When('eu clico no botão Add to cart do produto {string} novamente', (nome) => {
  inv.addToCart(nome);
});

When('eu clico no carrinho de compras', () => {
  inv.goToCart();
});

When('eu clico no botão checkout', () => {
  chk.goToStepOne();
});

// ===== CAMPOS (passos EXATOS, sem regex, sem ambiguidade) =====
When('eu preencho o campo First Name com {string}', (v) => {
  cy.get('#first-name').should('be.visible').clear().type(v);
});

When('eu preencho o campo Last Name com {string}', (v) => {
  cy.get('#last-name').should('be.visible').clear().type(v);
});

When('eu preencho o campo Cep com {string}', (v) => {
  cy.get('#postal-code').should('be.visible').clear().type(v);
});
// ===============================================================

When('eu clico no botão Continue', () => {
  cy.get('#continue').should('be.visible').click();
  cy.url().should('include', '/checkout-step-two.html');
});

Then('deve abrir a tela Checkout: Overview', () => {
  chk.assertOverview();
});

Then('o produto {string} deve estar visível no Overview', (nome) => {
  chk.assertProductVisible(nome);
});

Then('o preço do produto {string} no Overview deve ser igual ao valor guardado', (nome) => {
  chk.assertProductPriceEqualsSaved(nome, '@valorProdutoGuardado');
});

When('eu clico no botão Finish', () => {
  chk.finish();
});

Then('deve aparecer a mensagem {string}', (msg) => {
  chk.assertThankYou(msg);
});

Then('eu clico no botão Back Home', () => {
  chk.backHome();
});

Then('eu fecho as telas', () => {
  cy.get('.title').should('contain.text', 'Products');
});
