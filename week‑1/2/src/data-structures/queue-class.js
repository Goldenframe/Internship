export class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items = [...this.items, item];
        return this.items;
    }

    // enqueue(item) {
    //     this.items.push(item);
    //     return this.items.length;
    // }

    dequeue() {

        if (this.isEmpty()) return undefined;
        const firstItem = this.items[0];
        this.items = this.items.slice(1);
        return firstItem;
    }

    // dequeue() {
    //     return this.items.shift();
    // }

    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}
