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

type PowerUser = Omit<User & Admin, 'type'> & { type: 'powerUser' };

export type Person = User | Admin | PowerUser;

export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    {
        type: 'powerUser',
        name: 'Nikki Stone',
        age: 45,
        role: 'Moderator',
        occupation: 'Cat groomer'
    } as PowerUser // Explicitly type the object as PowerUser
];

function isAdmin(person: Person): person is Admin {
    return person.type === 'admin';
}

function isUser(person: Person): person is User {
    return person.type === 'user';
}

function isPowerUser(person: Person): person is PowerUser {
    return person.type === 'powerUser';
}

export function logPerson(person: Person) {
    let additionalInformation: string = '';

    if (isAdmin(person)) {
        additionalInformation = person.role;
    } else if (isUser(person)) {
        additionalInformation = person.occupation;
    } else if (isPowerUser(person)) {
        additionalInformation = `${person.role}, ${person.occupation}`;
    }

    console.log(`${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);

console.log();

console.log('Power users:');
persons.filter(isPowerUser).forEach(logPerson);

// Test cases
function testPersonTypes() {
    console.log('\nTest Case: Person Types');
    persons.forEach(person => {
        if (isAdmin(person)) {
            console.assert(person.role !== undefined, 'Admin has role');
            console.assert(person.occupation === undefined, 'Admin does not have occupation');
        }
        if (isUser(person)) {
            console.assert(person.occupation !== undefined, 'User has occupation');
            console.assert(person.role === undefined, 'User does not have role');
        }
        if (isPowerUser(person)) {
            console.assert(person.role !== undefined, 'PowerUser has role');
            console.assert(person.occupation !== undefined, 'PowerUser has occupation');
        }
    });
}

// Run the test cases
testPersonTypes();
