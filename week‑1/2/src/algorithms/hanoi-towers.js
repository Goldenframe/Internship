export function hanoiTowers(disksNum, fromPeg, toPeg) {
    if (disksNum === 1) {
        console.log(`Перемести диск 1 с колышка ${fromPeg} на колышек ${toPeg}`);
        return;
    }

    const sparePeg = 6 - fromPeg - toPeg;
    hanoiTowers(disksNum - 1, fromPeg, sparePeg);
    console.log(`Перемести диск ${disksNum} с колышка ${fromPeg} на колышек ${toPeg}`);
    hanoiTowers(disksNum - 1, sparePeg, toPeg);
}
