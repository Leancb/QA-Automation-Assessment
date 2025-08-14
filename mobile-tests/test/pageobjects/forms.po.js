// test/pageobjects/forms.po.js
const assert = require('assert');

class FormsScreen {
  // ===== Navegação =====
  get menuForms() { return $('~Forms'); }

  async openForms() {
    await this.menuForms.waitForDisplayed({ timeout: 10000 });
    await this.menuForms.click();
    await this.inputField.waitForDisplayed({ timeout: 10000 });
  }

  // ===== Input (XPath que você informou) =====
  get inputField() {
    return $('//android.widget.EditText[@resource-id="text_input"]');
  }
  get typedLabel() {
    return $('//android.widget.TextView[@text="You have typed:"]');
  }
  get typedValue() {
    return $('//android.widget.TextView[@text="You have typed:"]/following-sibling::android.widget.TextView[1]');
  }
  async typeInInput(text) {
    await this.inputField.waitForDisplayed({ timeout: 10000 });
    await this.inputField.clearValue();
    await this.inputField.addValue(text);
  }

  // ===== Switch =====
  get switchCtrl()  { return $('android=new UiSelector().className("android.widget.Switch")'); }
  get switchText()  { return $('android=new UiSelector().textStartsWith("Click to turn the switch")'); }
  async toggleSwitch() {
    await this.switchCtrl.waitForDisplayed({ timeout: 10000 });
    await this.switchCtrl.click();
  }

  // ===== Dropdown (Spinner) =====
  // Elemento clicável ao lado do label "Dropdown:"
  get dropdownSpinner() {
    return $('//android.widget.TextView[@text="Dropdown:"]/following-sibling::*[1]');
  }

  // Contêiner do overlay da lista (cobro ListView e RecyclerView)
  get dropdownList() {
    return $('(//android.widget.ListView | //androidx.recyclerview.widget.RecyclerView)[1]');
  }

  async openDropdown() {
    await this.dropdownSpinner.waitForDisplayed({ timeout: 10000 });
    await this.dropdownSpinner.click();
    await this.dropdownList.waitForDisplayed({ timeout: 10000 });
  }

  /**
   * Item da lista por texto, escopado ao overlay do dropdown.
   * Assim não confundimos com o mesmo texto que aparece no spinner fechado.
   */
  optionByTextInsideList(txt) {
    return this.dropdownList.$(`.//*[@text="${txt}"]`);
  }

  /**
   * Seleciona um item por texto e aguarda o overlay sumir.
   */
  async selectDropdownByText(text) {
    // Garante que a lista está aberta
    if (!(await this.dropdownList.isDisplayed().catch(() => false))) {
      await this.openDropdown();
    }

    const item = this.optionByTextInsideList(text);
    await item.waitForDisplayed({ timeout: 10000 });
    await item.click();

    // ✅ Espera o OVERLAY da lista fechar
    await this.dropdownList.waitForExist({ reverse: true, timeout: 5000 });

    // Pequeno respiro para UI atualizar
    await browser.pause(150);
  }

  /**
   * Valida que o texto selecionado está visível na tela com o dropdown fechado.
   * Observação: em muitos temas o spinner não atualiza "text"/"content-desc" do contêiner;
   * o valor aparece como um TextView renderizado na mesma área.
   */
  async assertDropdownSelection(expectedText) {
    // Garante que a lista não está aberta
    await this.dropdownList.waitForExist({ reverse: true, timeout: 2000 }).catch(() => {});
    // Procura um TextView com o texto selecionado em qualquer lugar da tela
    const selectedEl = await $(`//*[@text="${expectedText}"]`);
    await selectedEl.waitForDisplayed({ timeout: 5000 });
    const visible = await selectedEl.isDisplayed();
    assert.ok(visible, `Esperava ver o texto selecionado "${expectedText}" visível após fechar o dropdown.`);
  }

  // ===== Diálogo (Active / Inactive) =====
  get inactiveBtn() { return $('android=new UiSelector().text("Inactive")'); }
  get activeBtn()   { return $('android=new UiSelector().text("Active")'); }

  get dlgOk()         { return $('android=new UiSelector().textMatches("(?i)^OK$")'); }
  get dlgCancel()     { return $('android=new UiSelector().textMatches("(?i)^Cancel$")'); }
  get dlgAskMeLater() { return $('android=new UiSelector().textMatches("(?i)^Ask me later$")'); }
}

module.exports = new FormsScreen();
