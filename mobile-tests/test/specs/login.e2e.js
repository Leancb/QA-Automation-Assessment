import Login from '../pageobjects/login.po.js';

describe('MyDemoApp - Login', () => {
  it('abre menu → Log In → autentica e valida', async () => {
    await Login.navigate();
    await Login.login('bob@example.com', '10203040'); // credenciais válidas do app
    await Login.assertLoggedIn();

    await Login.logout();
    await Login.assertLoggedOut();
  });
});
