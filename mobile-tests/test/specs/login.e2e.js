import { strict as assert } from 'assert';

describe('Mobile - Login Flow (Fake)', () => {
  it('deve encontrar o botão de login (via XPath)', async () => {
    // Procura por QUALQUER nó com atributo name="login_button"
    const btn = await $('//*[@name="login_button"]');
    await btn.waitForExist({ timeout: 5000 });
    const exists = await btn.isExisting();
    assert.equal(exists, true, 'O botão de login deve existir');
    // opcional: clique
    await btn.click();
  });
});
