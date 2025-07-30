export function hanoiTowers(disksNum, fromPeg, toPeg, steps = []) {
    if (disksNum <= 0) return [];

    if (![1, 2, 3].includes(fromPeg) || ![1, 2, 3].includes(toPeg) || fromPeg === toPeg){
        throw new Error('Номера колышков должны быть разными и в диапазоне от 1 до 3')
    }

    if (disksNum === 1) {
        steps.push(`Перемести диск ${disksNum} с колышка ${fromPeg} на колышек ${toPeg}`);
        return steps;
    }

    const sparePeg = 6 - fromPeg - toPeg;
    hanoiTowers(disksNum - 1, fromPeg, sparePeg, steps);
    steps.push(`Перемести диск ${disksNum} с колышка ${fromPeg} на колышек ${toPeg}`);
    hanoiTowers(disksNum - 1, sparePeg, toPeg, steps);

    return steps;
}
