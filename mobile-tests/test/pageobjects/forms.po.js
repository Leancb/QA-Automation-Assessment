// test/pageobjects/forms.po.js
const assert = require('assert');

class FormsScreen {
  // ===== Navegação =====
  get menuForms() { return $('~Forms'); }

  async openForms() {
    await this.menuForms.waitForDisplayed({ timeout: 15000 });
    await this.menuForms.click();
    await this.inputField.waitForDisplayed({ timeout: 15000 });
  }

  // ===== Input =====
  get inputField() { return $('~text-input'); } // accessibility id da sua tela
  get inputFieldById() { // fallback pelo resource-id
    return $('//android.widget.EditText[@resource-id="RNE__Input__text-input"]');
  }
  get typedLabel() { return $('//android.widget.TextView[@text="You have typed:"]'); }
  get typedValue() {
    return $('//android.widget.TextView[@text="You have typed:"]/following-sibling::android.widget.TextView[1]');
  }

  async typeInInput(text) {
    let el = this.inputField;
    if (!(await el.isExisting().catch(() => false))) el = this.inputFieldById;

    await el.waitForDisplayed({ timeout: 15000 });
    await el.click();
    await el.clearValue().catch(() => {});
    await el.setValue(text);
    await driver.hideKeyboard().catch(() => {});
  }

  async assertTypedEquals(expected) {
    await this.typedValue.waitForDisplayed({ timeout: 8000 });
    const got = (await this.typedValue.getText()).trim();
    assert.strictEqual(got, expected, `Esperava "${expected}" em "You have typed:", mas veio "${got}".`);
  }

  // ===== Switch =====
  get switchCtrl() { return $('android=new UiSelector().className("android.widget.Switch")'); }
  get switchText() { return $('android=new UiSelector().textStartsWith("Click to turn the switch")'); }
  async toggleSwitch() {
    await this.switchCtrl.waitForDisplayed({ timeout: 15000 });
    await this.switchCtrl.click();
  }

  // ===== Dropdown =====
  get dropdownSpinner() {
    return $('//android.widget.TextView[@text="Dropdown:"]/following-sibling::*[1]');
  }
  get dropdownList() {
    return $('(//android.widget.ListView | //androidx.recyclerview.widget.RecyclerView)[1]');
  }
  async openDropdown() {
    await this.dropdownSpinner.waitForDisplayed({ timeout: 15000 });
    await this.dropdownSpinner.click();
    await this.dropdownList.waitForDisplayed({ timeout: 15000 });
  }
  optionByTextInsideList(txt) { return this.dropdownList.$(`.//*[@text="${txt}"]`); }
  async selectDropdownByText(text) {
    if (!(await this.dropdownList.isDisplayed().catch(() => false))) await this.openDropdown();
    const item = this.optionByTextInsideList(text);
    await item.waitForDisplayed({ timeout: 10000 });
    await item.click();
    await this.dropdownList.waitForExist({ reverse: true, timeout: 5000 });
    await browser.pause(150);
  }
  async assertDropdownSelection(expectedText) {
    await this.dropdownList.waitForExist({ reverse: true, timeout: 2000 }).catch(() => {});
    const selectedEl = await $(`//*[@text="${expectedText}"]`);
    await selectedEl.waitForDisplayed({ timeout: 5000 });
    const visible = await selectedEl.isDisplayed();
    assert.ok(visible, `Esperava ver "${expectedText}" visível após fechar o dropdown.`);
  }

  // ===== Diálogo =====
  get inactiveBtn() { return $('android=new UiSelector().text("Inactive")'); }
  get activeBtn()   { return $('android=new UiSelector().text("Active")'); }
  get dlgOk()         { return $('android=new UiSelector().textMatches("(?i)^OK$")'); }
  get dlgCancel()     { return $('android=new UiSelector().textMatches("(?i)^Cancel$")'); }
  get dlgAskMeLater() { return $('android=new UiSelector().textMatches("(?i)^Ask me later$")'); }

  // ===== Home (último passo) =====
  get homeIconGlyph() { return $('//android.widget.TextView[@text="󰚡"]'); } // solicitado
  get homeTabByAcc()  { return $('~Home'); } // fallback

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

module.exports = new FormsScreen();

