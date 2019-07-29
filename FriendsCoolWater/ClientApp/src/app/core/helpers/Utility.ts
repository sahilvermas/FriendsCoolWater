export class Utility {

    getLocalStorage(key: string) {
        return localStorage.getItem(key);
    }

    setLocalStorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }
}