export function quickSort(originalArr, start = 0, end = originalArr.length - 1, arr = [...originalArr]) {


    if (start >= end) return arr;

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

    if (start < right) quickSort(originalArr, start, right, arr);
    if (left < end) quickSort(originalArr, left, end, arr);
    return arr;
}
