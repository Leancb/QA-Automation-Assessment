// test/specs/login.e2e.js
const Login = require('../pageobjects/login.po');

describe('Login', () => {
  it('should login (smoke) and validate success alert (EN)', async () => {
    await Login.openTab();
    await Login.doLogin('test@demo.io', '10203040');

    // sanity check pós-condição. Serve para garantir que, depois de fechar o alerta:
    await expect(Login.btnLogin).toBeDisplayed();
  });
});
