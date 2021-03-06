const semver = require('../../lib/versioning/semver');

describe('semver.isValid(input)', () => {
  it('should return null for irregular versions', () => {
    expect(Boolean(semver.isValid('17.04.0'))).toBe(false);
  });
  it('should support simple semver', () => {
    expect(Boolean(semver.isValid('1.2.3'))).toBe(true);
  });
  it('should support semver with dash', () => {
    expect(Boolean(semver.isValid('1.2.3-foo'))).toBe(true);
  });
  it('should reject semver without dash', () => {
    expect(Boolean(semver.isValid('1.2.3foo'))).toBe(false);
  });
  it('should reject ranges', () => {
    expect(Boolean(semver.isValid('~1.2.3'))).toBe(false);
    expect(Boolean(semver.isValid('^1.2.3'))).toBe(false);
    expect(Boolean(semver.isValid('>1.2.3'))).toBe(false);
  });
  it('should reject github repositories', () => {
    expect(Boolean(semver.isValid('renovatebot/renovate'))).toBe(false);
    expect(Boolean(semver.isValid('renovatebot/renovate#master'))).toBe(false);
    expect(
      Boolean(semver.isValid('https://github.com/renovatebot/renovate.git'))
    ).toBe(false);
  });
});
describe('semver.isSingleVersion()', () => {
  it('returns true if naked version', () => {
    expect(Boolean(semver.isSingleVersion('1.2.3'))).toBe(true);
    expect(Boolean(semver.isSingleVersion('1.2.3-alpha.1'))).toBe(true);
  });
  it('returns false if equals', () => {
    expect(Boolean(semver.isSingleVersion('=1.2.3'))).toBe(false);
    expect(Boolean(semver.isSingleVersion('= 1.2.3'))).toBe(false);
  });
  it('returns false when not version', () => {
    expect(Boolean(semver.isSingleVersion('1.x'))).toBe(false);
  });
});
describe('semver.getNewValue()', () => {
  it('uses toVersion', () => {
    expect(semver.getNewValue('=1.0.0', 'bump', '1.0.0', '1.1.0')).toEqual(
      '1.1.0'
    );
  });
});
