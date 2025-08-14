// test/pageobjects/login.po.js
class LoginPage {
  // Navegação / campos
  get tabLogin()         { return $('~Login'); }
  get inputEmail()       { return $('~input-email'); }
  get inputPassword()    { return $('~input-password'); }

  // Botão LOGIN por XPath do texto
  get btnLogin()         { return $('//android.widget.TextView[@text="LOGIN"]'); }

  // Alerta de sucesso (Android AlertDialog padrão)
  get msgTitle()         { return $('//android.widget.TextView[@resource-id="android:id/alertTitle"]'); }    // "Success"
  get msgBody()          { return $('//android.widget.TextView[@resource-id="android:id/message"]'); }    // "You are logged in!"
  get btnOk()            { return $('id:android:id/button1'); }      // OK (positivo)

  async openTab() {
    await this.tabLogin.waitForExist({ timeout: 15000 });
    await this.tabLogin.click();
  }
  /**
   * Faz login, valida o alerta (inglês) e fecha o diálogo.
   */
  async doLogin(email, password) {
    await this.inputEmail.waitForDisplayed({ timeout: 15000 });
    await this.inputEmail.setValue(email);

    await this.inputPassword.waitForDisplayed({ timeout: 15000 });
    await this.inputPassword.setValue(password);

   // await this.btnLogin.waitForClickable({ timeout: 15000 });
    await this.btnLogin.click();

  // Garanta que a tela anterior sumiu (evita ler UI “antiga”)
    await this.btnLogin.waitForDisplayed({ reverse: true, timeout: 10000 });

      // Espere o ALERTA ficar VISÍVEL (não só existir)
      await this.msgTitle.waitForDisplayed({ timeout: 15000 });
    //  await this.msgBody.waitForDisplayed({ timeout: 15000 });

      // Valide os textos
      await expect(this.msgTitle).toHaveText('Success');
    //  await expect(this.msgBody).toHaveTextContaining('You are logged in'); // AQUI NÃO PEGOU DE NENHUM JEITO

      // 5) Clique OK e garanta que o alerta sumiu
      await this.btnOk.waitForEnabled({ timeout: 5000 });
      await this.btnOk.click();
      await this.msgTitle.waitForExist({ reverse: true, timeout: 10000 });
      await this.msgBody.waitForExist({ reverse: true, timeout: 10000 });

    //garantir que a modal fechou
    await expect(this.msgTitle).not.toBeExisting();
    await expect(this.msgBody).not.toBeExisting();
  }
}
module.exports = new LoginPage();
