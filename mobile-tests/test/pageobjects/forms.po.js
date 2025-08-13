// test/pageobjects/forms.po.js
import Menu from './menu.po.js';
import Login from './login.po.js';

/**
 * Page Object focado em cenários de "formulários".
 * Aqui usamos o formulário de Login (que é um form real do app)
 * para validar mensagens de required, credenciais inválidas etc.
 */
class FormsPage {
  // ---- Seletores reutilizados ----
  get usernameField() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
  }
  get passwordField() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
  }

  get loginBtnById() {
    return $('android=new UiSelector().resourceIdMatches(".*:id/(loginBtn|login_button|btnLogin)")');
  }
  get loginBtnByText() {
    return $('android=new UiSelector().className("android.widget.Button").textMatches("(?i)^(log\\s*in|login)$")');
  }
  async loginButton() {
    if (await this.loginBtnById.isExisting().catch(() => false)) return this.loginBtnById;
    return this.loginBtnByText;
  }

  // Mensagens de validação
  get usernameRequiredMsg() {
    return $('android=new UiSelector().textMatches("(?i)Username\\s+is\\s+required")');
  }
  get passwordRequiredMsg() {
    return $('android=new UiSelector().textMatches("(?i)Enter\\s+is\\s+Password")');
  }
  get invalidCredsMsg() {
    return $('android=new UiSelector().textMatches("(?i)provided\\s+credentials\\s+do\\s+not\\s+match")');
  }

  // ---- Ações ----
  async openLoginForm() {
    await Menu.select('Log In');
    await this.usernameField.waitForExist({ timeout: 7000 });
  }

  async submitEmpty() {
    // Garante campos vazios
    await this.usernameField.clearValue().catch(() => {});
    await this.passwordField.clearValue().catch(() => {});
    try { await driver.hideKeyboard(); } catch {}
    const btn = await this.loginButton();
    await btn.waitForDisplayed({ timeout: 7000 });
    await btn.click();
  }

  async submitInvalid(username = 'someone@example.com', password = 'wrongpass') {
    await this.usernameField.waitForExist({ timeout: 7000 });
    await this.usernameField.clearValue();
    await this.usernameField.setValue(username);

    await this.passwordField.waitForExist({ timeout: 7000 });
    await this.passwordField.clearValue();
    await this.passwordField.setValue(password);

    try { await driver.hideKeyboard(); } catch {}
    const btn = await this.loginButton();
    await btn.click();
  }

  async submitValid(username, password) {
    // Reaproveita o fluxo robusto do Login PO
    await Login.login(username, password);
  }

  // ---- Asserções ----
  async assertRequiredErrors() {
    await this.usernameRequiredMsg.waitForExist({ timeout: 5000 });
    await this.passwordRequiredMsg.waitForExist({ timeout: 5000 });
  }

  async assertInvalidCredsError() {
    await this.invalidCredsMsg.waitForExist({ timeout: 5000 });
  }
}

const Forms = new FormsPage();
export default Forms;
