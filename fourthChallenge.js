"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPerson = exports.isUser = exports.isAdmin = exports.persons = void 0;
exports.persons = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];
function isAdmin(person) {
    return person.type === 'admin';
}
exports.isAdmin = isAdmin;
function isUser(person) {
    return person.type === 'user';
}
exports.isUser = isUser;
function logPerson(person) {
    var additionalInformation = '';
    if (isAdmin(person)) {
        additionalInformation = person.role; // Type assertion here
    }
    if (isUser(person)) {
        additionalInformation = person.occupation; // Type assertion here
    }
    console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(additionalInformation));
}
exports.logPerson = logPerson;
console.log('Admins:');
exports.persons.filter(isAdmin).forEach(logPerson);
console.log();
console.log('Users:');
exports.persons.filter(isUser).forEach(logPerson);
// Test cases
console.log('\nTest cases:');
// Test isAdmin function
console.log("Is Jane Doe an admin? ".concat(isAdmin(exports.persons[1]))); // Should print true
// Test isUser function
console.log("Is Max Mustermann a user? ".concat(isUser(exports.persons[0]))); // Should print true
// Test logPerson function
console.log('\nTesting logPerson function:');
console.log('Logging Jane Doe:');
logPerson(exports.persons[1]); // Should log Jane Doe's details
console.log('Logging Max Mustermann:');
logPerson(exports.persons[0]); // Should log Max Mustermann's details
