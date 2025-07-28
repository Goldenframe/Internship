import { generateArray } from '../utils/index.js';
import { bubbleSort, quickSort } from '../algorithms/index.js';

export const arrays = {
    array1: [],
    array2: [],
    array3: []
};

export function logArrays() {

    generateArray(arrays.array1, 10);
    generateArray(arrays.array2, 100);
    generateArray(arrays.array3, 1000);



    const copy1 = [...arrays.array1];
    const copy2 = [...arrays.array1];

    console.log(arrays.array1);
    console.log(bubbleSort(copy1));
    console.log(quickSort(copy2));

} 
