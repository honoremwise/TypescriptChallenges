interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

export function isAdmin(person: Person): person is Admin {
    return person.type === 'admin';
}

export function isUser(person: Person): person is User {
    return person.type === 'user';
}

export function logPerson(person: Person) {
    let additionalInformation: string = '';
    if (isAdmin(person)) {
        additionalInformation = (person as Admin).role; // Type assertion here
    }
    if (isUser(person)) {
        additionalInformation = (person as User).occupation; // Type assertion here
    }
    console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);

// Test cases
console.log('\nTest cases:');

// Test isAdmin function
console.log(`Is Jane Doe an admin? ${isAdmin(persons[1])}`); // Should print true

// Test isUser function
console.log(`Is Max Mustermann a user? ${isUser(persons[0])}`); // Should print true

// Test logPerson function
console.log('\nTesting logPerson function:');
console.log('Logging Jane Doe:');
logPerson(persons[1]); // Should log Jane Doe's details
console.log('Logging Max Mustermann:');
logPerson(persons[0]); // Should log Max Mustermann's details
