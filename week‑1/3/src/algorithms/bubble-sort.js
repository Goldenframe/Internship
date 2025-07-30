function bubbleSort(arr) {
    const arrCopy = [...arr]; 
    for (let i = 0; i <= arrCopy.length - 1; i++) {
        for (let j = 0; j <= arrCopy.length - 1 - i; j++) {
            if (arrCopy[j] >= arrCopy[j + 1]) {
                let temp = arrCopy[j];
                arrCopy[j] = arrCopy[j + 1];
                arrCopy[j + 1] = temp;
            }
        }
    }
    return arrCopy;
}

module.exports = { bubbleSort };