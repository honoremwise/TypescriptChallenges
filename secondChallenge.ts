interface User {
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
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

export function logPerson(person: Person) {
    console.log(` - ${person.name}, ${person.age}`);
}

// Test cases
const testCases: Person[] = [
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
function testLogPerson(person: Person) {
    console.log(`Testing logPerson function with: ${person.name}`);
    logPerson(person);
}

// Iterate through test cases and apply the testLogPerson function
testCases.forEach(testLogPerson);

// Ensure that the persons array contains all the test cases
console.log('Persons array:');
console.log(persons);
