// mobile-tests/wdio.android.cjs
const path = require('path');

exports.config = {
  runner: 'local',
  specs: ['./test/specs/android/**/*.js'],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',       // nome genérico; funciona com AVD
    'appium:app': path.join(process.cwd(), 'app-under-test.apk'),
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 120,
    'appium:appWaitActivity': '*',                 // ajuda a abrir apps com splash
    // Se rodar 2 emuladores ao mesmo tempo, informe o UDID do que quer usar:
    // 'appium:udid': 'emulator-5554',
  }],
  logLevel: 'info',
  framework: 'mocha',
  reporters: [
    'spec',
    ['junit', { outputDir: './reports', outputFileFormat: o => `android-${o.cid}.xml` }]
  ],
  mochaOpts: { ui: 'bdd', timeout: 180000 },
  hostname: '127.0.0.1',
  port: 4723,
  path: '/', // Appium 2
};
