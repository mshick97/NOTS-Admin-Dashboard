const testFunction = require('../functionTest');

describe('testing basic addition function', () => {
  it('should be num + 1', () => {
    expect(testFunction(2)).toBe(3);
  });
});
