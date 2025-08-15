export class InventoryPage {
  productCard(name) {
    return cy.contains('.inventory_item_name', name).should('be.visible').parents('.inventory_item');
  }

  addToCart(name) {
    this.productCard(name)
      .find('button')
      .contains(/^Add to cart$/)
      .scrollIntoView()
      .click({ force: true });
  }

  removeFromCart(name) {
    this.productCard(name)
      .find('button')
      .contains(/^Remove$/)
      .scrollIntoView()
      .click({ force: true });
  }

  getPrice(name) {
    return this.productCard(name).find('.inventory_item_price').invoke('text').then(t => t.trim());
  }

  goToCart() {
    cy.get('.shopping_cart_link').should('be.visible').click();
    cy.url().should('include', '/cart.html');
  }
}
