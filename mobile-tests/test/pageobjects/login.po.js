// test/pageobjects/login.po.js
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
  get homeIconGlyph() { return $('//android.widget.TextView[@text="󰚡"]'); } // exatamente como solicitado
  get homeTabByAcc()  { return $('~Home'); }                                 // fallback

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
   */
  async goHome() {
    const hasGlyph = await this.homeIconGlyph.isExisting().catch(() => false);
    if (hasGlyph) {
      await this.homeIconGlyph.waitForDisplayed({ timeout: 10000 });
      await this.homeIconGlyph.click();
      return;
    }
    const hasAcc = await this.homeTabByAcc.isExisting().catch(() => false);
    if (hasAcc) {
      await this.homeTabByAcc.waitForDisplayed({ timeout: 10000 });
      await this.homeTabByAcc.click();
      return;
    }
    throw new Error('Botão Home não encontrado por //android.widget.TextView[@text="󰚡"] nem por ~Home');
  }
}

module.exports = new LoginPage();
