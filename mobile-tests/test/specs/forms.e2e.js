// test/specs/forms.e2e.js
// Uso assert nativo para evitar o conflito do expect do WDIO no seu ambiente.
const assert = require('assert');
const FormsScreen = require('../pageobjects/forms.po');

describe('Forms - cenários', () => {
  before(async () => {
    await FormsScreen.openForms();
  });

  it('deve alternar o Switch e atualizar o texto', async () => {
    const beforeText = await FormsScreen.switchText.getText();
    await FormsScreen.toggleSwitch();
    const afterText = await FormsScreen.switchText.getText();

    if (beforeText.endsWith('ON')) {
      assert.strictEqual(afterText, 'Click to turn the switch OFF');
    } else {
      assert.strictEqual(afterText, 'Click to turn the switch ON');
    }
  });

  it('deve selecionar um item no Dropdown', async () => {
    const alvo = 'webdriver.io is awesome';

    await FormsScreen.openDropdown();
    await FormsScreen.selectDropdownByText(alvo);

    // ✅ Em vez de ler do contêiner "Dropdown", validamos que o texto escolhido está visível
    await FormsScreen.assertDropdownSelection(alvo);
  });

  it('botão Inactive deve estar desabilitado e Active deve abrir diálogo', async () => {
    await FormsScreen.inactiveBtn.waitForDisplayed({ timeout: 10000 });
    const clickable = await FormsScreen.inactiveBtn.getAttribute('clickable');
    assert.strictEqual(String(clickable), 'false');

    await FormsScreen.activeBtn.click();

    // espera qualquer botão do diálogo e fecha
    let clicked = false;
    for (const btn of [FormsScreen.dlgOk, FormsScreen.dlgCancel, FormsScreen.dlgAskMeLater]) {
      const visible = await btn.waitForDisplayed({ timeout: 3000 }).then(() => true).catch(() => false);
      if (visible) {
        await btn.click();
        clicked = true;
        break;
      }
    }
    assert.ok(clicked, 'Nenhum botão do diálogo ficou visível para clique.');
  });
});
