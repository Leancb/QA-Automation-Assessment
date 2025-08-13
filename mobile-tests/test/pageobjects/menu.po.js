// Page Object do menu lateral (hamburger)
class Menu {
  get hamburger() {
    return $('~open menu');
  }

  get menuList() {
    return $('id=com.saucelabs.mydemoapp.android:id/menuRV');
  }

  async open() {
    if (await this.menuList.isDisplayed().catch(() => false)) return;

    if (await this.hamburger.isExisting().catch(() => false)) {
      await this.hamburger.click();
    } else {
      const alt = await $('android=new UiSelector().descriptionContains("menu")');
      await alt.waitForExist({ timeout: 5000 });
      await alt.click();
    }
    await this.menuList.waitForDisplayed({ timeout: 5000 });
  }

  async select(label) {
    await this.open();

    const quick = await $$(`android=new UiSelector().text("${label}")`);
    if (quick.length) {
      await quick[0].click();
      return;
    }

    const el = await $(
      `android=new UiScrollable(new UiSelector().scrollable(true))`
      + `.scrollIntoView(new UiSelector().text("${label}"))`
    );
    await el.waitForExist({ timeout: 5000 });
    await el.click();
  }

  async exists(label, timeout = 2000) {
    await this.open();
    const el = await $(`android=new UiSelector().text("${label}")`);
    try {
      await el.waitForExist({ timeout });
      return true;
    } catch {
      return false;
    }
  }
}

const menu = new Menu();
export default menu;
