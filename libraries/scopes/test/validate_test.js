const assert = require('assert');
const utils = require('../src');

describe('validate', () => {
  test('Normal-looking scopes are OK', () => {
    assert(utils.validScope('auth:credentials'));
  });

  test('Star scopes are OK', () => {
    assert(utils.validScope('queue:*'));
  });

  test('Scopes with spaces are OK', () => {
    assert(utils.validScope('secrets:garbage:foo bar'));
  });

  test('Scopes with newlines are not OK', () => {
    assert(!utils.validScope('some:garbage\nauth:credentials'));
  });

  test('Scopes with nulls are not OK', () => {
    assert(!utils.validScope('some:garbage\0auth:credentials'));
  });

  test('Scopes with unicode characters are not OK', () => {
    assert(!utils.validScope('halt:\u{1f6c7}'));
  });

  test('Empty scopes are allowed', () => {
    assert(utils.validScope(''));
  });
});
