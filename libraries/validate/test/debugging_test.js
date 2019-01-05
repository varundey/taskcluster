describe('Debugging Tests', () => {
  let assert = require('assert');
  let SchemaSet = require('../');
  let rimraf = require('rimraf');
  let fs = require('fs');
  let libUrls = require('taskcluster-lib-urls');

  test('writeFile writes files', async () => {
    try {
      const schemaset = new SchemaSet({
        folder: 'test/publish-schemas',
        serviceName: 'whatever',
        constants: {'my-constant': 42},
        writeFile: true,
      });

      await schemaset.validator(libUrls.testRootUrl());
      assert(fs.existsSync('rendered_schemas/v1/yml-test-schema.json'));
    } finally {
      rimraf.sync('rendered_schemas');
    }
  });
});
