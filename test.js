// Write a function (functionLocker) that takes in two functions as input and
// returns a new function.
// The first input function will be a predicate function that takes a number as
// input and returns true if the number passes a certain test; false otherwise.
// The second input function is a secret function that takes an unknown number of
// parameters.
// The returned function takes a number as its first parameter. If the number
// passes the predicate function, the secret function runs with any additional
// parameters passed into it. If the predicate fails, return undefined;
//
// ex.
// function isEven(num) { return num % 2 === 0; }
// function addStrings(a, b, c) { return a + '--' + b + '--' + c; }
//
// const lockedFunc = functionLocker(isEven, addStrings);
//
// lockedFunc(4, 'I', 'love', 'Codesmith') --> 'I--love--Codesmith'
// lockedFunc(3, 'I', 'love', 'Codesmith') -->  undefined

function functionLocker(predicateFunc, secretFunc) {
  const returnFunc = (num, ...args) => {
    if (predicateFunc(num))
      return secretFunc(...args);
    else return undefined;
  };
  return returnFunc;
}
const isEven = num => num % 2 === 0;
const addStrings = (a, b, c) => a + '--' + b + '--' + c;

const lockedFunc = functionLocker(isEven, addStrings);
// expect 'I--love--Codesmith':
console.log(lockedFunc(4, 'I', 'love', 'Codesmith'));
// expect 'undefined':
console.log(lockedFunc(3, 'I', 'love', 'Codesmith'));


// Write a function (keywordCount) that takes as input an object of key-value
// pairs and a string. The object can have as values numbers, booleans, strings,
// or nested objects. There will be NO arrays or other object types in
// the object. Your function should return the number of times the keyword
// appears in the object. (Note: the keyword will never be an object key - only
// a value)
//
// ex.
// const myObj = { a: 'hi', b: 'yo', c: { d: 'ciao', e: 'hi' } };
// keywordCount(myObj, 'hi') --> 2
// keywordCount(myObj, 'bye') --> 0

function keywordCount(obj, keyword) {
  let vals = Object.values(obj);
  let count = 0;

  const traverse = () => {
    vals.forEach(el => {
      if (el === keyword) ++count;
      if (typeof el === 'object') {
        vals = Object.values(el);
        traverse();
      }
    });
  };

  traverse();
  return count;
}

const myObj = { a: 'hi', b: 'yo', c: { d: 'ciao', e: 'hi' } };
console.log(keywordCount(myObj, 'hi')); // 2
console.log(keywordCount(myObj, 'bye')); // 0

// Write a function (closestToTarget) that takes as input an array of numbers, a
// callback function, and a target number. closestToTarget will pass each number
// in the array to the callback and return the number in the original array
// whose callback value is closest to the target number. (If more than one are
// the closest, return the first one.)
//
// ex.
// function flipEvens(num) { return (num % 2 === 0) ? -num : num; }
// const myArr = [3, -2, 6, 0];
//
// closestToTarget(myArr, flipEvens, 5) --> 3 (myArr[0])
// closestToTarget(myArr, flipEvens, -5) --> 6 (myArr[2])

function closestToTarget(arr, callback, target) {
  let diff = Infinity;
  let minIdx;
  arr.forEach((el, idx) => {
    const output = callback(el);
    if (Math.abs(target - output) < diff) {
      diff = Math.abs(target - output);
      minIdx = idx;
    }
  });
  return arr[minIdx];
}

const flipEvens = num => (num % 2 === 0) ? -num : num;
const myArr = [3, -2, 6, 0];
console.log(closestToTarget(myArr, flipEvens, 5)); // 3
console.log(closestToTarget(myArr, flipEvens, -5)); // 6


// -------------------------------------------------------------------


function Stack() { // last in, first out
  this.contents = {};
  this.length = 0;
}

Stack.prototype.push = function (value) {
  this.contents[++this.length] = value;
};

Stack.prototype.pop = function () {
  const deleted = this.contents[this.length];
  delete this.contents[this.length--];
  return deleted;
};

Stack.prototype.forEach = function (callback) {
  while (this.length) { // loop through and pop values off and feed them into callback until there is no more nodes left
    const popped = this.pop();
    callback(popped);
  }
  if (this.length !== 0 || this.contents[this.length]) throw new Error('invalid forEach function');
};

const stack = new Stack;
const out = [];
const isEven = num => {
  if (num % 2 === 0) out.push(num);
};

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
console.log(stack);
console.log(stack.pop());
console.log(stack);
stack.forEach(isEven);
console.log(stack);
console.log(out);

function Queue() { // last in, last out & first in, first out
  this.stack1 = new Stack;
  this.stack2 = new Stack;
}

Queue.prototype.enqueue = function (value) {
  this.stack1.push(value);
};

Queue.prototype.dequeue = function () {
  while (this.stack1.length) {
    this.stack2.push(this.stack1.pop());
  }
  return this.stack2.pop();
};

const queue = new Queue;
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
console.log(queue);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue);

module.exports = { Stack, Queue };


