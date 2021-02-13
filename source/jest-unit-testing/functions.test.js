// const functions = require('./functions');
// import functions from '../functions'

const functions = {
  add: (num1,num2) => num1 +num2,
  subtract: (num1,num2) => num1 - num2
};
  
  test('adds 1 + 2 to equal 3', () => {
    expect(functions.add(1, 2)).toBe(3);
  });

//hello
  test('subtracts 3 - 2 to equal 1', () => {
    expect(functions.subtract(3, 2)).toBe(1);
  });
