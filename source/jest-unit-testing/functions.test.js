const functions = require('../functions.js');

test('adds 1 + 2 to equal 3', () => {
  expect(functions.functionAdd.add(1, 2)).toBe(3);
});

test('subtracts 3 - 2 to equal 1', () => {
  expect(functions.functionSub.subtract(3, 2)).toBe(1);
});

