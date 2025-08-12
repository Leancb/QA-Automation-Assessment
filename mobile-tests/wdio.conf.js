export const config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [{
    'appium:platformName': 'Fake',
    'appium:automationName': 'Fake',
    'appium:app': 'path/to/fake-app', // ignorado pelo driver fake
    'appium:deviceName': 'FakeDevice'
  }],
  logLevel: 'info',
  framework: 'mocha',
  reporters: [
    'spec',
    ['junit', { outputDir: './reports', outputFileFormat: (opts) => `results-${opts.cid}.xml` }]
  ],
  mochaOpts: { ui: 'bdd', timeout: 60000 },
  services: [],
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
}
