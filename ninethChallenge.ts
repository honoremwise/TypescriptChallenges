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

type Person = User | Admin;

const admins: Admin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

const users: User[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];

export type ApiResponse<T> = (
    {
        status: 'success';
        data: T;
    } |
    {
        status: 'error';
        error: string;
    }
);

export function requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
    callback({
        status: 'success',
        data: admins
    });
}

export function requestUsers(callback: (response: ApiResponse<User[]>) => void) {
    callback({
        status: 'success',
        data: users
    });
}

export function requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
    callback({
        status: 'success',
        data: Date.now()
    });
}

export function requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) {
    callback({
        status: 'error',
        error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
    });
}

function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

function startTheApp(callback: (error: Error | null) => void) {
    requestAdmins((adminsResponse) => {
        console.log('Admins:');
        if (adminsResponse.status === 'success') {
            adminsResponse.data.forEach(logPerson);
        } else {
            return callback(new Error(adminsResponse.error));
        }

        console.log();

        requestUsers((usersResponse) => {
            console.log('Users:');
            if (usersResponse.status === 'success') {
                usersResponse.data.forEach(logPerson);
            } else {
                return callback(new Error(usersResponse.error));
            }

            console.log();

            requestCurrentServerTime((serverTimeResponse) => {
                console.log('Server time:');
                if (serverTimeResponse.status === 'success') {
                    console.log(`   ${new Date(serverTimeResponse.data).toLocaleString()}`);
                } else {
                    return callback(new Error(serverTimeResponse.error));
                }

                console.log();

                requestCoffeeMachineQueueLength((coffeeMachineQueueLengthResponse) => {
                    console.log('Coffee machine queue length:');
                    if (coffeeMachineQueueLengthResponse.status === 'success') {
                        console.log(`   ${coffeeMachineQueueLengthResponse.data}`);
                    } else {
                        return callback(new Error(coffeeMachineQueueLengthResponse.error));
                    }

                    callback(null);
                });
            });
        });
    });
}

startTheApp((e: Error | null) => {
    console.log();
    if (e) {
        console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`)
    } else {
        console.log('Success!');
    }
});

// Test case
function testApiResponseTypes() {
    console.log('\nTest Case: ApiResponse Types');
    const testAdminsResponse: ApiResponse<Admin[]> = {
        status: 'success',
        data: admins
    };
    console.assert(testAdminsResponse.status === 'success', 'AdminsApiResponse: Status is success');
    console.assert(testAdminsResponse.data.length === 2, 'AdminsApiResponse: Data length is correct');
    console.assert(testAdminsResponse.data[0].type === 'admin', 'AdminsApiResponse: First item is Admin type');

    const testUsersResponse: ApiResponse<User[]> = {
        status: 'success',
        data: users
    };
    console.assert(testUsersResponse.status === 'success', 'UsersApiResponse: Status is success');
    console.assert(testUsersResponse.data.length === 2, 'UsersApiResponse: Data length is correct');
    console.assert(testUsersResponse.data[0].type === 'user', 'UsersApiResponse: First item is User type');

    const testServerTimeResponse: ApiResponse<number> = {
        status: 'success',
        data: Date.now()
    };
    console.assert(testServerTimeResponse.status === 'success', 'ServerTimeApiResponse: Status is success');
    console.assert(typeof testServerTimeResponse.data === 'number', 'ServerTimeApiResponse: Data type is number');

    const testCoffeeMachineQueueLengthResponse: ApiResponse<number> = {
        status: 'error',
        error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
    };
    console.assert(testCoffeeMachineQueueLengthResponse.status === 'error', 'CoffeeMachineQueueLengthApiResponse: Status is error');
    console.assert(testCoffeeMachineQueueLengthResponse.error === 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.', 'CoffeeMachineQueueLengthApiResponse: Error message is correct');
}

// Run the test cases
testApiResponseTypes();
