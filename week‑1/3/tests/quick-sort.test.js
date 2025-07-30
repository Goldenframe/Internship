const { quickSort } = require('../src/algorithms/index.js');

describe('quick-sort', () => {
    test('sorts an unsorted array', () => {
        const array = [1, 5, 2, 10, 7];

        const result = quickSort(array);

        expect(result).toEqual([1, 2, 5, 7, 10]);
    });

    test('sorts a sorted array', () => {
        const array = [1, 2, 5, 7, 10];

        const result = quickSort(array);

        expect(result).toEqual([1, 2, 5, 7, 10]);
    });

    test('sorts an array with doubles', () => {
        const array = [1, 5, 2, 10, 5, 7];

        const result = quickSort(array);

        expect(result).toEqual([1, 2, 5, 5, 7, 10]);
    });

    test('sorts an empty array', () => {
        const array = [];

        const result = quickSort(array);

        expect(result).toEqual([]);
    });

    test('sorts an array with one element', () => {
        const array = [2];

        const result = quickSort(array);

        expect(result).toEqual([2]);
    });

})