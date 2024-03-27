// Define the User interface
interface User {
    name: string;
    age: number;
    occupation: string;
}

// Array of users
const users: User[] = [
    { name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];

// Function to log a user's information
function logPerson(user: User) {
    console.log(` - ${user.name}, ${user.age}`);
}

console.log('Users:');
users.forEach(logPerson);

// Test case for logging users
function testLogPerson() {
    console.log('\nTest Case: Logging Users');
    console.log('Expected Output:');
    console.log('Users:');
    console.log(' - Max Mustermann, 25');
    console.log(' - Kate Müller, 23');
    console.log('Actual Output:');
    console.log('Users:');
    users.forEach(logPerson);
}

// Run the test case
testLogPerson();
