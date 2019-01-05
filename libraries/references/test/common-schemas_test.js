const assert = require('assert');
const {getCommonSchemas} = require('../src/common-schemas');

describe('common-schemas_test.js', () => {
  test('loads common schemas', () => {
    const schemas = getCommonSchemas();
    assert(schemas.some(
      ({content, filename}) => content.$id === '/schemas/common/api-reference-v0.json#'));
    assert(schemas.some(
      ({content, filename}) => filename === 'schemas/metadata-metaschema.yml'));
  });
});
