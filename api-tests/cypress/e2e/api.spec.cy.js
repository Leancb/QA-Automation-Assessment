/// <reference types="cypress" />

describe('API Tests - ReqRes', () => {
  it('GET /api/users?page=2 - deve retornar lista de usuários', () => {
    cy.request('GET', '/api/users?page=2').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.headers).to.have.property('content-type');
      expect(res.body).to.have.property('data').and.to.be.an('array');
    });
  });

  it('POST /api/users - deve criar um usuário', () => {
    cy.request('POST', '/api/users', { name: 'DeBrum', job: 'QA' }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('name', 'DeBrum');
      expect(res.body).to.have.property('job', 'QA');
      expect(res.body).to.have.property('id');
    });
  });

  it('PUT /api/users/2 - deve atualizar um usuário', () => {
    cy.request('PUT', '/api/users/2', { name: 'Leandro', job: 'Tester' }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('name', 'Leandro');
      expect(res.body).to.have.property('job', 'Tester');
    });
  });

  it('DELETE /api/users/2 - deve deletar um usuário', () => {
    cy.request('DELETE', '/api/users/2').then((res) => {
      expect(res.status).to.eq(204);
      expect(res.body).to.be.empty;
    });
  });

  it('NEGATIVO - GET /api/unknown/999 - deve retornar 404', () => {
    cy.request({ url: '/api/unknown/999', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });
});
