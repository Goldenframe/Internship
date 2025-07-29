
export class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items = [...this.items, item];
        return this.items;
    }

    // push(item) {
    //     return this.items.push(item);
    // }

    pop() {
        if (this.isEmpty()) return undefined;

        const lastItem = this.items[this.items.length - 1];
        this.items = this.items.slice(0, -1);
        return lastItem;
    }

    // pop() {
    //     return this.items.pop();
    // }


    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.items.length - 1]
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
