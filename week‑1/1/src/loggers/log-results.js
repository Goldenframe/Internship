import { measureTime } from '../utils/index.js';
import { bubbleSort, quickSort } from '../algorithms/index.js';
import { arrays } from '../data.js';

export function logResults() {
    const results = {
        array1: {
            length: arrays.array1.length,
            bubbleSortTime: measureTime(bubbleSort, arrays.array1),
            qSortTime: measureTime(quickSort, arrays.array1),
        },
        array2: {
            length: arrays.array2.length,
            bubbleSortTime: measureTime(bubbleSort, arrays.array2),
            qSortTime: measureTime(quickSort, arrays.array2),
        },
        array3: {
            length: arrays.array3.length,
            bubbleSortTime: measureTime(bubbleSort, arrays.array3),
            qSortTime: measureTime(quickSort, arrays.array3),
        }
    };
    console.table(results);
}
