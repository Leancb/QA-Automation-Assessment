export class CheckoutPage {
  goToStepOne() {
    cy.get('#checkout').should('be.visible').click();
    cy.url().should('include', '/checkout-step-one.html');
  }

  fillYourInfo(first, last, zip) {
    cy.get('#first-name').should('be.visible').clear().type(first);
    cy.get('#last-name').should('be.visible').clear().type(last);
    cy.get('#postal-code').should('be.visible').clear().type(zip);
    cy.get('#continue').should('be.visible').click();
    cy.url().should('include', '/checkout-step-two.html');
  }

  assertOverview() {
    cy.get('#header_container .title')
      .should('be.visible')
      .should('have.text', 'Checkout: Overview');
  }

  assertProductVisible(name) {
    cy.contains('.inventory_item_name', name).should('be.visible');
  }

  assertProductPriceEqualsSaved(name, alias = '@valorProdutoGuardado') {
    cy.contains('.inventory_item_name', name)
      .parents('.cart_item')
      .find('.inventory_item_price')
      .invoke('text')
      .then(t => t.trim())
      .then(precoOverview => {
        cy.get(alias).then(precoGuardado => {
          const norm = s => s.replace(/\s+/g, '');
          expect(norm(precoOverview)).to.eq(norm(precoGuardado));
        });
      });
  }

  finish() {
    cy.get('#finish').should('be.visible').click();
    cy.url().should('include', '/checkout-complete.html');
  }

  assertThankYou(msg = 'Thank you for your order!') {
    cy.get('#checkout_complete_container h2')
      .should('be.visible')
      .invoke('text')
      .then(t => t.trim())
      .should('eq', msg);
  }

  backHome() {
    cy.get('#back-to-products').should('be.visible').click();
    cy.url().should('include', '/inventory.html');
  }
}
