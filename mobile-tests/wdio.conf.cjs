// mobile-tests/wdio.conf.cjs
const path = require('path');

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [{
    'appium:platformName': 'Fake',
    'appium:automationName': 'Fake',
    'appium:app': path.join(process.cwd(), 'fake-app.xml'), // << AQUI
    'appium:deviceName': 'FakeDevice'
  }],
  logLevel: 'info',
  framework: 'mocha',
  reporters: [
    'spec',
    ['junit', { outputDir: './reports', outputFileFormat: (o) => `results-${o.cid}.xml` }]
  ],
  mochaOpts: { ui: 'bdd', timeout: 60000 },
  services: [],
  hostname: '127.0.0.1',
  port: 4723,
  path: '/', // Appium 2
};
