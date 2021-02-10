// const functions = require('./functions');

const functions = {
    add: (num1,num2) => num1 +num2
  };
  
  test('adds 1 + 2 to equal 3', () => {
    expect(functions.add(1, 2)).toBe(3);
  });
  //testing github actions