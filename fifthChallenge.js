"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterUsers = exports.logPerson = exports.isUser = exports.isAdmin = exports.persons = void 0;
exports.persons = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    {
        type: 'admin',
        name: 'Jane Doe',
        age: 32,
        role: 'Administrator'
    },
    {
        type: 'user',
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    },
    {
        type: 'admin',
        name: 'Bruce Willis',
        age: 64,
        role: 'World saver'
    },
    {
        type: 'user',
        name: 'Wilson',
        age: 23,
        occupation: 'Ball'
    },
    {
        type: 'admin',
        name: 'Agent Smith',
        age: 23,
        role: 'Administrator'
    }
];
var isAdmin = function (person) { return person.type === 'admin'; };
exports.isAdmin = isAdmin;
var isUser = function (person) { return person.type === 'user'; };
exports.isUser = isUser;
function logPerson(person) {
    var additionalInformation = '';
    if ((0, exports.isAdmin)(person)) {
        additionalInformation = person.role;
    }
    if ((0, exports.isUser)(person)) {
        additionalInformation = person.occupation;
    }
    console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(additionalInformation));
}
exports.logPerson = logPerson;
function filterUsers(persons, criteria) {
    return persons.filter(exports.isUser).filter(function (user) {
        var criteriaKeys = Object.keys(criteria);
        return criteriaKeys.every(function (fieldName) {
            if (fieldName === 'age') {
                // Check for undefined to avoid comparing if criteria[fieldName] is not provided
                return criteria[fieldName] === undefined || user[fieldName] === criteria[fieldName];
            }
            // For other fields, simply compare
            return user[fieldName] === criteria[fieldName];
        });
    });
}
exports.filterUsers = filterUsers;
// Test Case
console.log('Test Case: Users with age 23 and occupation "Astronaut":');
filterUsers(exports.persons, {
    age: 23,
    occupation: 'Astronaut'
}).forEach(logPerson);
console.log('\nUsers of age 23:');
filterUsers(exports.persons, {
    age: 23
}).forEach(logPerson);
