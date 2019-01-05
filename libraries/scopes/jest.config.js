const pkg = require('./package.json');

module.exports = {
  setupTestFrameworkScriptFile: "jest-expect-message",
  testEnvironment: "node",
  testMatch: [
    "**/test/*_test.js",
  ],
  watchman: false,
};
