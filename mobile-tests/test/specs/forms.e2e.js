// test/specs/forms.e2e.js
import Forms from '../pageobjects/forms.po.js';
import Menu from '../pageobjects/menu.po.js';
import Login from '../pageobjects/login.po.js';

describe('Formulários - validações no Login', () => {
  before(async () => {
    // Garante que estamos na tela inicial (Catalog)
    // e abre o formulário de login para começar os testes.
    await Forms.openLoginForm();
  });

  it('mostra mensagens "required" ao submeter vazio', async () => {
    await Forms.submitEmpty();
    await Forms.assertRequiredErrors();
  });

  it('mostra mensagem de credenciais inválidas', async () => {
    await Forms.submitInvalid('foo@example.com', '123456');
    await Forms.assertInvalidCredsError();
  });

  it('aceita credenciais válidas e mostra "Log Out" no menu', async () => {
    await Forms.submitValid('bod@example.com', '10203040');
    await Login.assertLoggedIn();
  });

  it('efetua logout confirmando o modal', async () => {
    await Login.logout();
    await Login.assertLoggedOut();
  });
});
