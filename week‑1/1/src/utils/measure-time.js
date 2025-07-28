export function measureTime(sortFunction, arr) {
    const arrCopy = [...arr];
    const start = performance.now();
    sortFunction(arrCopy);
    const end = performance.now();
    return end - start;
}
