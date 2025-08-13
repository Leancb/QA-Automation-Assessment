// test/pageobjects/login.po.js
import Menu from './menu.po.js';

class LoginPage {
  // --- Campos ---
  get usernameField() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
  }
  get passwordField() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
  }

  // --- Botão Login (vários seletores / fallbacks) ---
  async _locateLoginButton() {
    const tries = [
      () => $('id=com.saucelabs.mydemoapp.android:id/loginBtn'),
      () => $('android=new UiSelector().resourceIdMatches(".*:id/(loginBtn|login_button|btnLogin)")'),
      () => $('android=new UiSelector().className("android.widget.Button").textMatches("(?i)^(log\\s*in|login)$")'),
      () => $('android=new UiSelector().textMatches("(?i)^(log\\s*in|login)$")'),
    ];
    for (const get of tries) {
      const el = await get();
      if (await el.isExisting().catch(() => false)) return el;
    }
    // Último recurso: scroll até o texto "Login"
    return $(
      'android=new UiScrollable(new UiSelector().scrollable(true))' +
      '.scrollIntoView(new UiSelector().textMatches("(?i)^(log\\s*in|login)$"))'
    );
  }

  // --- Diálogo de Logout ---
  get logoutDialogAnyPart() {
    // Qualquer parte comum do AlertDialog
    return $('android=new UiSelector().resourceIdMatches(".*:id/(parentPanel|contentPanel|alertTitle)")');
  }
  get logoutConfirmBtn() {
    // Botão com texto LOGOUT / LOG OUT
    return $('android=new UiSelector().className("android.widget.Button").textMatches("(?i)^(logout|log\\s*out)$")');
  }
  get logoutCancelBtn() {
    return $('android=new UiSelector().className("android.widget.Button").textMatches("(?i)^cancel$")');
  }

  async navigate() {
    await Menu.select('Log In');
  }

  async _hideKeyboardSafely() {
    try { await driver.hideKeyboard(); } catch {}
  }

  async login(username, password) {
    // Garante que estamos na tela de login
    const maybeLoginBtn = await this._locateLoginButton();
    if (!(await maybeLoginBtn.isExisting().catch(() => false))) {
      await this.navigate();
    }

    // Preenche
    await this.usernameField.waitForExist({ timeout: 7000 });
    await this.usernameField.clearValue();
    await this.usernameField.setValue(username);

    await this.passwordField.waitForExist({ timeout: 7000 });
    await this.passwordField.clearValue();
    await this.passwordField.setValue(password);

    // Esconde o teclado para não bloquear o clique
    await this._hideKeyboardSafely();

    // Clica em Login
    const btn = await this._locateLoginButton();
    await btn.waitForDisplayed({ timeout: 7000 });
    await btn.waitForEnabled({ timeout: 7000 });
    await btn.click();
  }

  async assertLoggedIn() {
    await driver.pause(300);
    await Menu.open();
    const ok = await Menu.exists('Log Out', 5000);
    if (!ok) throw new Error('Esperado ver "Log Out" no menu após login, mas não apareceu.');
  }

  // --- Fluxo de logout com confirmação ---
  async logout() {
    await Menu.select('Log Out'); // abre o modal

    // Espera o diálogo
    await this.logoutDialogAnyPart.waitForExist({ timeout: 5000 }).catch(() => {});

    // Clica no botão "LOGOUT" (com fallbacks)
    if (await this.logoutConfirmBtn.isExisting()) {
      await this.logoutConfirmBtn.click();
    } else if (await $('id=android:id/button1').isExisting()) {
      // positive button padrão de AlertDialog
      await $('id=android:id/button1').click();
    } else {
      // fallback: segundo botão geralmente é o positivo
      const positive = await $('android=new UiSelector().className("android.widget.Button").instance(1)');
      await positive.click();
    }
  }

  // Opcional: para testar o CANCEL
  async cancelLogout() {
    await Menu.select('Log Out');
    await this.logoutDialogAnyPart.waitForExist({ timeout: 5000 }).catch(() => {});
    if (await this.logoutCancelBtn.isExisting()) {
      await this.logoutCancelBtn.click();
    } else if (await $('id=android:id/button2').isExisting()) {
      await $('id=android:id/button2').click();
    } else {
      const negative = await $('android=new UiSelector().className("android.widget.Button").instance(0)');
      await negative.click();
    }
  }

  async assertLoggedOut() {
    await driver.pause(300);
    await Menu.open();
    const ok = await Menu.exists('Log In', 5000);
    if (!ok) throw new Error('Esperado ver "Log In" no menu após logout, mas não apareceu.');
  }
}

const loginPage = new LoginPage();
export default loginPage;
