// test/pageobjects/login.po.js

// Seletores adicionais e helper para robustez sem mudar o fluxo
// Fallbacks estáveis para a aba Home
const HOME_FALLBACK_SELECTORS = [
  // Acessibilidade (pt/en)
  '~Início',
  '//*[@content-desc="Home"]',
  '//*[@content-desc="Início"]',
  'android=new UiSelector().descriptionContains("Home")',
  'android=new UiSelector().descriptionContains("Início")',

  // resource-id comuns em bottom nav
  'android=new UiSelector().resourceIdMatches(".*:id/(navigation_home|nav_home|menu_home|tab_home|home)$")',

  // Texto visível
  '//*[@text="Home"]',
  '//*[@text="Início"]',
  'android=new UiSelector().textContains("Home")',
  'android=new UiSelector().textContains("Início")',
];

// Tenta vários seletores até achar um exibido
async function findOneDisplayed(selectors, timeoutMs = 12000) {
  const end = Date.now() + timeoutMs;
  let lastErr;
  while (Date.now() < end) {
    for (const sel of selectors) {
      try {
        const el = await $(sel);
        if (await el.isExisting() && await el.isDisplayed()) return el;
      } catch (e) { lastErr = e; }
    }
    await driver.pause(300);
  }
  throw new Error(`Botão Home não encontrado. Tentativas: ${selectors.join(' | ')}. Último erro: ${lastErr || 'n/a'}`);
}

class LoginPage {
  // ---- Navegação / campos
  get tabLogin()      { return $('~Login'); }
  get inputEmail()    { return $('~input-email'); }
  get inputPassword() { return $('~input-password'); }
  get btnLogin()      { return $('//android.widget.TextView[@text="LOGIN"]'); }

  // ---- Alerta (Android AlertDialog padrão)
  get msgTitle() { return $('//android.widget.TextView[@resource-id="android:id/alertTitle"]'); } // "Success"
  get msgBody()  { return $('//android.widget.TextView[@resource-id="android:id/message"]'); }    // "You are logged in!"
  get btnOk()    { return $('id:android:id/button1'); } // OK

  // ---- Home (pedido)
  get homeIconGlyph() { return $('//android.widget.TextView[@text="󰚡"]'); } // mantém exatamente como você pediu
  get homeTabByAcc()  { return $('~Home'); }                                 // fallback original

  async openTab() {
    await this.tabLogin.waitForExist({ timeout: 15000 });
    await this.tabLogin.click();
  }

  /**
   * Faz login, valida o diálogo de sucesso e fecha.
   */
  async doLogin(email, password) {
    await this.inputEmail.waitForDisplayed({ timeout: 15000 });
    await this.inputEmail.setValue(email);

    await this.inputPassword.waitForDisplayed({ timeout: 15000 });
    await this.inputPassword.setValue(password);

    await this.btnLogin.click();
    await this.btnLogin.waitForDisplayed({ reverse: true, timeout: 10000 });

    // Espera alerta visível
    await this.msgTitle.waitForDisplayed({ timeout: 15000 });
    await expect(this.msgTitle).toHaveText('Success');

    await this.btnOk.waitForEnabled({ timeout: 5000 });
    await this.btnOk.click();

    await this.msgTitle.waitForExist({ reverse: true, timeout: 10000 });
    await this.msgBody.waitForExist({ reverse: true, timeout: 10000 });
    await expect(this.msgTitle).not.toBeExisting();
    await expect(this.msgBody).not.toBeExisting();
  }

  /**
   * Vai para a Home clicando no ícone solicitado.
   * Mantém o fluxo: primeiro tenta o glyph, depois ~Home; se não achar,
   * usa fallbacks estáveis (id/desc/texto).
   */
  async goHome() {
    // 1) Seu seletor original (glyph)
    try {
      if (await this.homeIconGlyph.isExisting()) {
        await this.homeIconGlyph.waitForDisplayed({ timeout: 10000 });
        await this.homeIconGlyph.click();
        return;
      }
    } catch (_) {}

    // 2) Seu fallback original (~Home)
    try {
      if (await this.homeTabByAcc.isExisting()) {
        await this.homeTabByAcc.waitForDisplayed({ timeout: 10000 });
        await this.homeTabByAcc.click();
        return;
      }
    } catch (_) {}

    // 3) Fallbacks adicionais (não mudam o fluxo, só evitam quebra)
    const el = await findOneDisplayed(HOME_FALLBACK_SELECTORS, 15000);
    await el.click();
  }
}

module.exports = new LoginPage();
