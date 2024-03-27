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
    var additionalInformation;
    if ('occupation' in person) {
        additionalInformation = person.occupation; // If it's a User, use occupation
    }
    else {
        additionalInformation = person.role; // If it's an Admin, use role
    }
    console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(additionalInformation));
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
