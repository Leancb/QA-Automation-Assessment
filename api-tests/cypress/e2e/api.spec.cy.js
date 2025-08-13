const authHeaders = () => {
  const key = Cypress.env('REQRES_API_KEY');
  return key ? { 'x-api-key': key, 'Authorization': `Bearer ${key}` } : {};
};

describe('API Tests - ReqRes', () => {
  it('GET /api/users?page=2 - deve retornar lista de usuários', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      headers: authHeaders()
    }).its('status').should('eq', 200);
  });

  it('POST /api/users - deve criar um usuário', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: authHeaders(),
      body: { name: 'DeBrum', job: 'QA' }
    }).its('status').should('be.oneOf', [200, 201]);
  });

  it('PUT /api/users/2 - deve atualizar um usuário', () => {
    cy.request({
      method: 'PUT',
      url: 'https://reqres.in/api/users/2',
      headers: authHeaders(),
      body: { name: 'Leandro', job: 'Tester' }
    }).its('status').should('be.oneOf', [200, 204]);
  });

  it('DELETE /api/users/2 - deve deletar um usuário', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: authHeaders()
    }).its('status').should('be.oneOf', [200, 204]);
  });

  it('NEGATIVO - GET /api/unknown/999 - deve retornar 404', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown/999',
      headers: authHeaders(),
      failOnStatusCode: false
    }).its('status').should('eq', 404);
  });
});
