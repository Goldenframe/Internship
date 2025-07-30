const { hanoiTowers } = require('../src/algorithms/index.js');

describe('hanoi-towers', () => {

    test('0 disks', () => {
        const disksNum = 0;
        const fromPeg = 0;
        const toPeg = 0;

        const result = hanoiTowers(disksNum, fromPeg, toPeg);

        expect(result).toEqual([]);
    });

    test('2 disks', () => {
        const disksNum = 2;
        const fromPeg = 1;
        const toPeg = 3;

        const result = hanoiTowers(disksNum, fromPeg, toPeg);

        expect(result).toEqual([
            'Перемести диск 1 с колышка 1 на колышек 2',
            'Перемести диск 2 с колышка 1 на колышек 3',
            'Перемести диск 1 с колышка 2 на колышек 3'
        ]);
    });

    test('correct number of steps for 3 disks', () => {
        const disksNum = 3;
        const fromPeg = 1;
        const toPeg = 3;

        const result = hanoiTowers(disksNum, fromPeg, toPeg);

        expect(result).toHaveLength(7);
    });

    test('correct number of steps for 5 disks', () => {
        const disksNum = 5;
        const fromPeg = 1;
        const toPeg = 3;

        const result = hanoiTowers(disksNum, fromPeg, toPeg);

        expect(result).toHaveLength(31);
    });

    test('throws an error if peg number is greater than 3', () => {
        const disksNum = 2;
        const fromPeg = 1;
        const toPeg = 4;

        const result = () => hanoiTowers(disksNum, fromPeg, toPeg);

        expect(result).toThrow('Номера колышков должны быть разными и в диапазоне от 1 до 3');
    });

    test('throws an error if peg number is less than 1', () => {
        const disksNum = 2;
        const fromPeg = 0;
        const toPeg = 3;

        const result = () => hanoiTowers(disksNum, fromPeg, toPeg);

        expect(result).toThrow('Номера колышков должны быть разными и в диапазоне от 1 до 3');
    });

    test('throws an error if pegs are equal', () => {
        const disksNum = 2;
        const fromPeg = 2;
        const toPeg = 2;

        const result = () => hanoiTowers(disksNum, fromPeg, toPeg);

        expect(result).toThrow('Номера колышков должны быть разными и в диапазоне от 1 до 3');
    });
})