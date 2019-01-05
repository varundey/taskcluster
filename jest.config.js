const pkg = require('./package.json');

module.exports = {
  projects: pkg.workspaces.map(l => `<rootDir>/${l}`).concat('<rootDir>'),
  setupTestFrameworkScriptFile: "jest-expect-message",
  testEnvironment: "node",
  testMatch: [
    "**/test/*_test.js",
  ],
  watchman: false,
};
