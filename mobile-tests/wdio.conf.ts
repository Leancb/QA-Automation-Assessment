// wdio.conf.ts
import type { Options } from '@wdio/types'
import path from 'path'
import allure from '@wdio/allure-reporter'

export const config: Options.Testrunner = {
  runner: 'local',

  // Seus specs .js
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,

  // Appium via service (porta 4725)
  hostname: '127.0.0.1',
  port: 4725,
  path: '/',
  services: [[
    'appium',
    {
      args: {
        address: '127.0.0.1',
        port: 4725,
        basePath: '/',
        relaxedSecurity: true,
        logLevel: 'info',
        allowCors: true,
        useDrivers: 'uiautomator2',
      }
    }
  ]],

  logLevel: 'info',

  framework: 'mocha',
  mochaOpts: { timeout: 240000 },

  // Spec + Allure
  reporters: [
    'spec',
    ['allure', {
      outputDir: path.resolve(process.cwd(), 'reports', 'allure', 'raw'),
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }] as any
  ],

  // Capabilities Android (UiAutomator2)
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.DEVICE_NAME || 'Android Emulator',
    // 'appium:udid': process.env.UDID || 'emulator-5554',
    // 'appium:avd': 'Pixel_5_API_30',

    // APK local (mantém o que já funciona)
    'appium:app': path.join(__dirname, 'app', 'demo.apk'),

    'appium:noReset': true,
    'appium:newCommandTimeout': 240,

    // Estabilidade no CI (não muda fluxo)
    'appium:ignoreHiddenApiPolicyError': true,
    'appium:disableWindowAnimation': true,

    // Timeouts folgados
    'appium:adbExecTimeout': 120000,
    'appium:uiautomator2ServerInstallTimeout': 120000,
    'appium:uiautomator2ServerLaunchTimeout': 120000,
  }],

  // Metadados no Allure
  before: function (capabilities, _specs) {
    const caps = capabilities as any
    try {
      const deviceName = caps['appium:deviceName'] || caps.deviceName || ''
      const platformVer = caps['appium:platformVersion'] || caps.platformVersion || ''
      const automation = caps['appium:automationName'] || caps.automationName || ''
      allure.addEnvironment('Device', String(deviceName))
      allure.addEnvironment('Platform', `${caps.platformName || ''} ${platformVer}`)
      allure.addEnvironment('Automation', String(automation))
    } catch {}
  },

  // Em falha: screenshot + XML da tela
  afterTest: async function (_test, _context, { error, passed }) {
    if (!passed) {
      try { await browser.takeScreenshot() } catch {}
      try {
        const xml = await browser.getPageSource()
        allure.addAttachment('UI hierarchy (XML)', xml, 'text/xml')
      } catch {}
      if (error) {
        try { allure.addAttachment('Error stack', String(error.stack || error), 'text/plain') } catch {}
      }
    }
  }
}
