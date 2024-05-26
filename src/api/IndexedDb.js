export const openDb = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('modash', 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('logs')) {
                db.createObjectStore('logs', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('user')) {
                db.createObjectStore('user', { keyPath: 'id' });
            }
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
};

export const addUserAccount = (db, userData) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['user'], 'readwrite');
        const objectStore = transaction.objectStore('user');
        const request = objectStore.add(userData);

        request.onsuccess = function () {
            resolve();
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
};

/**
 * Checks the user credentials by retrieving all users from the 'user' object store in the given database.
 *
 * @param {IDBDatabase} db - The IndexedDB database object.
 * @param {string} username - The username to check.
 * @param {string} password - The password to check.
 * @return {Promise<boolean>} A Promise that resolves with true if a user with the given username and password is found, otherwise false.
 */
export const checkUserCredentials = (db, username, password) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['user'], 'readonly');
        const objectStore = transaction.objectStore('user');
        const request = objectStore.getAll();

        request.onsuccess = function (event) {
            const users = event.target.result;
            const user = users.find(user => user.username === username && user.password === password);
            resolve(!!user); // Resolve with true if user is found, otherwise false
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
};


export const addLog = (db, log) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['logs'], 'readwrite');
        const objectStore = transaction.objectStore('logs');
        const request = objectStore.add(log);

        request.onsuccess = function () {
            resolve();
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
};

export const getLogs = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['logs'], 'readonly');
        const objectStore = transaction.objectStore('logs');
        const request = objectStore.getAll();

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
};

export const getLogById = (db, id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['logs'], 'readonly');
        const objectStore = transaction.objectStore('logs');
        const request = objectStore.get(id);

        request.onsuccess = function (event) {
            const log = event.target.result;
            if (log) {
                resolve(log);
            } else {
                reject(new Error(`Log with ID ${id} not found`));
            }
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
};
