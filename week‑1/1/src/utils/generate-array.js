export function generateArray(arr, length) {

    for (let i = 0; i < length; i++) {
        arr.push(Math.round(Math.random() * 100));
    }
    
    return arr;
}
