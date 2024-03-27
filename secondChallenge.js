"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPerson = exports.persons = void 0;
exports.persons = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Jane Doe',
        age: 32,
        role: 'Administrator'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    },
    {
        name: 'Bruce Willis',
        age: 64,
        role: 'World saver'
    }
];
function logPerson(person) {
    console.log(" - ".concat(person.name, ", ").concat(person.age));
}
exports.logPerson = logPerson;
// Test cases
var testCases = [
    {
        name: 'John Smith',
        age: 40,
        occupation: 'Engineer'
    },
    {
        name: 'Alice Johnson',
        age: 28,
        role: 'Administrator'
    },
    {
        name: 'Michael Brown',
        age: 35,
        occupation: 'Doctor'
    },
    {
        name: 'Emma Davis',
        age: 50,
        role: 'Manager'
    }
];
// Test case function to validate logPerson function
function testLogPerson(person) {
    console.log("Testing logPerson function with: ".concat(person.name));
    logPerson(person);
}
// Iterate through test cases and apply the testLogPerson function
testCases.forEach(testLogPerson);
// Ensure that the persons array contains all the test cases
console.log('Persons array:');
console.log(exports.persons);
