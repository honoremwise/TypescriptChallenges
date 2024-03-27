// Define the User interface
function User(name, age, occupation) {
    this.name = name;
    this.age = age;
    this.occupation = occupation;
}

// Array of users
const users = [
    new User('Max Mustermann', 25, 'Chimney sweep'),
    new User('Kate Müller', 23, 'Astronaut')
];

// Function to log a user's information
function logPerson(user) {
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
