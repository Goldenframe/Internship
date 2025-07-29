export class HashTable {
    constructor() {
        this.table = {};
    }

    hash(key) {
        const keyStr = String(key);
        let hash = 0;
        for (let i = 0; i < keyStr.length; i++) {
            const chr = keyStr.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return 'h_' + Math.abs(hash);
    }

    set(key, value) {
        const hashedKey = this.hash(key);
        this.table = { ...this.table, [hashedKey]: value };
        return value;
    }

    get(key) {
        const hashedKey = this.hash(key);
        return this.table[hashedKey];
    }

    delete(key) {
        const hashedKey = this.hash(key);
        if (!(hashedKey in this.table)) return undefined;

        const newTable = {};
        for (const k in this.table) {
            if (k !== hashedKey) {
                newTable[k] = this.table[k];
            }
        }
        this.table = newTable;
        return { ...newTable };
    }
}