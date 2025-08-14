process.env.NODE_OPTIONS = "";
process.env.MOCHA_OPTIONS = "";
process.env.MOCHA_FILE = "";
process.env.npm_config_node_options = "";
process.execArgv.length = 0;

const { run } = require("@wdio/cli");

(async () => {
  try {
    const code = await run(); // usa: run wdio.conf.cjs --spec ...
  process.exit(code);
  } catch (err) {
    console.error("[runner] WDIO CLI error:", err);
    process.exit(1);
  }
})();
