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
    if (start >= end) return arrCopy; 

    const pivot = arr[Math.floor((start + end) / 2)]; 
    let left = start;
    let right = end;

    while (left <= right) {
        while (arr[left] < pivot) left++;
        while (arr[right] > pivot) right--;

        if (left <= right) {
            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    if (start < right) qSort(arr, start, right);
    if (left < end) qSort(arr, left, end);
    return arr;
}

const copy1 = [...array1];
const copy2 = [...array1];

console.log(array1);
console.log(bubbleSort(copy1));
console.log(qSort(copy2));


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
