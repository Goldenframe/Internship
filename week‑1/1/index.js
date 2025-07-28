const array1 = [];
const array2 = [];
const array3 = [];

function generateArray(arr, length) {

    for (let i = 0; i < length; i++) {
        arr.push(Math.round(Math.random() * 100));
    }
    
    return arr;
}

generateArray(array1, 10);
generateArray(array2, 100);
generateArray(array3, 1000);

function measureTime(sortFunction, arr) {
    const arrCopy = [...arr]; 
    const start = performance.now();
    sortFunction(arrCopy);
    const end = performance.now();
    return end - start;
}

function bubbleSort(arr) {
    const arrCopy = [...arr]; 
    for (let i = 0; i < arrCopy.length - 1; i++) {
        for (let j = 0; j < arrCopy.length - 1 - i; j++) {
            if (arrCopy[j] >= arrCopy[j + 1]) {
                let temp = arrCopy[j];
                arrCopy[j] = arrCopy[j + 1];
                arrCopy[j + 1] = temp;
            }
        }
    }
    return arrCopy;
}

function qSort(arr, start = 0, end = arr.length - 1) {
    const arrCopy = [...arr]; 
    if (start >= end) return arrCopy; 

    const pivot = arrCopy[Math.floor((start + end) / 2)]; 
    let left = start;
    let right = end;

    while (left <= right) {
        while (arrCopy[left] < pivot) left++;
        while (arrCopy[right] > pivot) right--;

        if (left <= right) {
            let temp = arrCopy[left];
            arrCopy[left] = arrCopy[right];
            arrCopy[right] = temp;
            left++;
            right--;
        }
    }

    if (start < right) qSort(arrCopy, start, right);
    if (left < end) qSort(arrCopy, left, end);
    return arrCopy;
}

const results = {
    array1: {
        length: array1.length,
        bubbleSortTime: measureTime(bubbleSort, array1),
        qSortTime: measureTime(qSort, array1),
    },
    array2: {
        length: array2.length,
        bubbleSortTime: measureTime(bubbleSort, array2),
        qSortTime: measureTime(qSort, array2),
    },
    array3: {
        length: array3.length,
        bubbleSortTime: measureTime(bubbleSort, array3),
        qSortTime: measureTime(qSort, array3),
    }
};
console.table(results)
