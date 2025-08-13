// mobile-tests/wdio.conf.cjs
const path = require('path');
const appPath = path.resolve(__dirname, 'app/demo.apk');

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  framework: 'mocha',
  mochaOpts: { timeout: 120000 },
  connectionRetryTimeout: 120000,
  waitforTimeout: 15000,
  // Conexão com o Appium (que o Actions vai subir)
  hostname: '127.0.0.1',
  port: 4723,
  path: '/', // Appium 2 usa '/' por padrão

  // NÃO use o service 'appium' aqui, pois o server subirá pelo workflow
  // services: [],

  capabilities: [{
    'appium:platformName': 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',
    'appium:platformVersion': '11', // Emulador API 30 (Android 11)
    'appium:app': appPath, // <-- AJUSTE AQUI SE NECESSÁRIO
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 120,
    'appium:appWaitActivity': '*',
    'appium:appWaitDuration': 20000
  }],
  maxInstances: 1,// deixe 1 para simplificar na primeira execução
};
