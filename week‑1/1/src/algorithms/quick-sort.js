export function quickSort(arr, start = 0, end = arr.length - 1) {
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

    if (start < right) quickSort(arr, start, right);
    if (left < end) quickSort(arr, left, end);
    return arr;
}