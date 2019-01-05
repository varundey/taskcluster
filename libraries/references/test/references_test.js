const assert = require('assert');
const fs = require('fs');
const {getCommonSchemas} = require('../src/common-schemas');
const libUrls = require('taskcluster-lib-urls');
const {makeSerializable} = require('../src/serializable');
const mockFs = require('mock-fs');
const References = require('..');

describe('references_test.js', () => {
  const rootUrl = libUrls.testRootUrl();

  afterEach(() => {
    mockFs.restore();
  });

  const references = new References({
    schemas: getCommonSchemas(),
    references: [],
  });

  test('getSchema', () => {
    assert.equal(
      references.getSchema('/schemas/common/manifest-v3.json#').$id,
      '/schemas/common/manifest-v3.json#');
  });

  test('fromService', () => {
    // mock APIBuilder from taskcluster-lib-api
    const builder = {
      reference() {
        return {api: true};
      },
    };

    // mock Exchanges from taskcluster-lib-pulse
    const exchanges = {
      reference() {
        return {exchanges: true};
      },
    };

    // mock SchemaSet from taskcluster-lib-validate
    const schemaset = {
      abstractSchemas() {
        return {
          'somefile.json': {
            $id: 'somefile.json#',
          },
        };
      },
    };

    const references = References.fromService({builder, exchanges, schemaset});
    assert(references.references.some(r => r.content.api));
    assert(references.references.some(r => r.content.exchanges));
    assert(references.schemas.some(s => s.content.$id === 'somefile.json#'));
  });

  test('makeSerializable', () => {
    assert.deepEqual(
      references.makeSerializable(),
      makeSerializable({references}));
  });

  test('writes uri-structured', () => {
    mockFs({});
    const references = new References({
      references: [],
      schemas: getCommonSchemas().concat([{
        filename: 'foo.json',
        content: {
          $schema: '/schemas/common/metadata-metaschema.json#',
          $id: '/schemas/test/sch.json#',
          metadata: {name: 'api', version: 1},
          type: 'string',
        },
      }]),
    });

    references.writeUriStructured({directory: '/refdata'});
    assert.deepEqual(JSON.parse(fs.readFileSync('/refdata/schemas/test/sch.json')), {
      $id: '/schemas/test/sch.json#',
      $schema: '/schemas/common/metadata-metaschema.json#',
      metadata: {name: 'api', version: 1},
      type: 'string',
    });
  });

  test('empty references pass validation', () => {
    const references = new References({references: [], schemas: []});
    references.validate();
  });

  test('bogus references fail validation', () => {
    const references = new References({references: [], schemas: [
      {filename: 'bogus.json', content: {}},
    ]});
    assert.throws(
      () => references.validate(),
      'no $id');
  });
});
