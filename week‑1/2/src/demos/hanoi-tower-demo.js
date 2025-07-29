import { hanoiTowers } from "../algorithms/hanoi-towers.js";

export function hanoiTowersDemo() {

    console.log('Первый пример Ханойских башен');
    hanoiTowers(3, 1, 3);

    console.log('Второй пример Ханойских башен');
    hanoiTowers(5, 1, 2);

    console.log('Третий пример Ханойских башен');
    hanoiTowers(1, 2, 1);
}
