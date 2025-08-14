// wdio.conf.cjs
const path = require('path');

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,

  // Conexão com o Appium que já está rodando
  hostname: '127.0.0.1',
  port: 4725,
  path: '/',

  logLevel: 'info',
  framework: 'mocha',
  mochaOpts: { timeout: 240000 },
  reporters: ['spec'],

  services: [],

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',
    // Se quiser forçar um AVD específico:
    // 'appium:avd': 'Pixel_5_API_30',

    // Aponte para o APK local:
    'appium:app': path.resolve(__dirname, 'apps/demo.apk'),

    'appium:noReset': true,
    'appium:newCommandTimeout': 240,
    'appium:enforceXPath1': true,

    // Se você estiver usando ADB em porta custom (ex.: 5038), descomente:
    // 'appium:adbPort': 5038,
  }],
};
