const filterOdd = (arr) => arr.filter((n) => n % 2 !== 0);
const doubleNumbers = (arr) => arr.map((n) => n * 2);
const calculateSum = (arr) => arr.reduce((sum, n) => sum + n, 0);
const findMax = (arr) => arr.reduce((max, n) => (n > max ? n : max), arr[0]);

const processData = (arr, callback) => callback(arr);

const numbers = [10, 21, 34, 47, 55, 62, 73];

console.log(processData(numbers, filterOdd));
console.log(processData(numbers, doubleNumbers));
console.log(processData(numbers, calculateSum));
console.log(processData(numbers, findMax));
