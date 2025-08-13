class Drawer {
  get btnHamburger() {
    return $('android=new UiSelector().descriptionContains("menu")');
  }
  get list() {
    return $('android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/menuRV")');
  }
  itemByText(text) {
    return $(
      'android=new UiScrollable(new UiSelector().' +
      'resourceId("com.saucelabs.mydemoapp.android:id/menuRV")).' +
      'getChildByText(new UiSelector().' +
      'resourceId("com.saucelabs.mydemoapp.android:id/itemTV"), "' + text + '")'
    );
  }
  get loginItem()  { return $('~Login Menu Item'); }
  get logoutItem() { return $('~Logout Menu Item'); }
}
module.exports = new Drawer();
