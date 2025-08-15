// wdio.conf.ts
import type { Options } from '@wdio/types'
import path from 'path'
import allure from '@wdio/allure-reporter'

export const config: Options.Testrunner = {
  runner: 'local',

  //
  // Especs (seus testes .js)
  //
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,

  //
  // ► USANDO APPIUM EXTERNO (recomendado no seu setup atual)
  //    Deixe o Appium rodando em: http://127.0.0.1:4725/
  //
  hostname: '127.0.0.1',
  port: 4725,
  path: '/',
  services: [['appium', {
     args: {
       address: '127.0.0.1',
       port: 4725,
       basePath: '/',
       relaxedSecurity: true,
       logLevel: 'info',
       allowCors: true,
       useDrivers: 'uiautomator2',
     }
   }]],

  //
  // Capabilities Android (UiAutomator2)
  //
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.DEVICE_NAME || 'Android Emulator',
    // Se quiser amarrar no emulador específico:
    // 'appium:udid': process.env.UDID || 'emulator-5554',

     'appium:app': path.join(__dirname, 'app', 'demo.apk'),
    'appium:noReset': true,
    'appium:newCommandTimeout': 240,

    // timeouts mais folgados p/ boot/conexão
    'appium:adbExecTimeout': 120000,
    'appium:uiautomator2ServerInstallTimeout': 120000,
    'appium:uiautomator2ServerLaunchTimeout': 120000
  }],

  logLevel: 'info',

  //
  // Mocha
  //
  framework: 'mocha',
  mochaOpts: {
    timeout: 120000
  },

  //
  // Reporters (Spec + Allure)
  //
  reporters: [
    'spec',
    ['allure', {
      outputDir: path.resolve(process.cwd(), 'reports', 'allure', 'raw'),
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }] as any
  ],

  //
  // Metadados no Allure
  //
  before: function (capabilities, specs) {
    const caps = capabilities as any
    const deviceName = caps['appium:deviceName'] || caps.deviceName || ''
    const platformVer = caps['appium:platformVersion'] || caps.platformVersion || ''
    const automation = caps['appium:automationName'] || caps.automationName || ''
    try {
      allure.addEnvironment('Device', String(deviceName))
      allure.addEnvironment('Platform', `${caps.platformName || ''} ${platformVer}`)
      allure.addEnvironment('Automation', String(automation))
    } catch {}
  },

  //
  // Screenshot + stack em caso de falha
  //
  afterTest: async function (test, _context, { error, passed }) {
    if (!passed) {
      await browser.takeScreenshot()
      if (error) {
        try {
          allure.addAttachment('Error stack', String(error.stack || error), 'text/plain')
        } catch {}
      }
    }
  }
}

/*
 * ► Alternativa: rodar Appium pelo service do WDIO (NÃO use junto com o Appium externo)
 *
 * - Comente hostname/port/path acima e troque services para:
 *
 * services: [
 *   ['appium', {
 *     args: { address: '127.0.0.1', port: 4723, basePath: '/', relaxedSecurity: true, logLevel: 'warn' }
 *   }]
 * ],
 */
