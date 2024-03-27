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

export function promisify<T>(func: (...args: any[]) => void): () => Promise<T> {
    return () => {
        return new Promise<T>((resolve, reject) => {
            func((response: ApiResponse<T>) => {
                if (response.status === 'success') {
                    resolve(response.data);
                } else {
                    reject(new Error(response.error));
                }
            });
        });
    };
}

export function promisifyAll<T>(obj: Record<string, (...args: any[]) => void>): Record<string, () => Promise<T>> {
    const promisifiedObj: Record<string, () => Promise<T>> = {};
    for (const key in obj) {
        if (typeof obj[key] === 'function') {
            promisifiedObj[key] = promisify(obj[key]);
        }
    }
    return promisifiedObj;
}

const oldApi = {
    requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
        callback({
            status: 'success',
            data: admins
        });
    },
    requestUsers(callback: (response: ApiResponse<User[]>) => void) {
        callback({
            status: 'success',
            data: users
        });
    },
    requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'success',
            data: Date.now()
        });
    },
    requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'error',
            error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
        });
    }
};

const api = {
    requestAdmins: promisify<Admin[]>(oldApi.requestAdmins),
    requestUsers: promisify<User[]>(oldApi.requestUsers),
    requestCurrentServerTime: promisify<number>(oldApi.requestCurrentServerTime),
    requestCoffeeMachineQueueLength: promisify<number>(oldApi.requestCoffeeMachineQueueLength)
};

function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

async function startTheApp() {
    console.log('Admins:');
    (await api.requestAdmins()).forEach(logPerson);
    console.log();

    console.log('Users:');
    (await api.requestUsers()).forEach(logPerson);
    console.log();

    console.log('Server time:');
    console.log(`   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`);
    console.log();

    console.log('Coffee machine queue length:');
    try {
        console.log(`   ${await api.requestCoffeeMachineQueueLength()}`);
    } catch (error) {
        console.log(`   Error: "${(error as Error).message}", but it's fine, sometimes errors are inevitable.`);
    }
}

startTheApp().then(
    () => {
        console.log('Success!');
    },
    (e: Error) => {
        console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`);
    }
);

// Test cases
async function test() {
    try {
        console.log("Testing API functions...");
        console.log("Requesting admins:");
        const adminData = await api.requestAdmins();
        console.log(adminData);

        console.log("Requesting users:");
        const userData = await api.requestUsers();
        console.log(userData);

        console.log("Requesting server time:");
        const serverTime = await api.requestCurrentServerTime();
        console.log(serverTime);

        console.log("Requesting coffee machine queue length:");
        const coffeeMachineQueueLength = await api.requestCoffeeMachineQueueLength();
        console.log(coffeeMachineQueueLength);
    } catch (error) {
        console.error("Test failed:", error);
    }
}

test();
