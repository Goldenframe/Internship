import { Queue } from "../data-structures/index.js";

export function queueDemo() {
  const queue = new Queue();

  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);
  console.log('После добавления:', queue.items);

  console.log('Удален:', queue.dequeue());
  console.log('Сейчас первый:', queue.peek());
  console.log('Размер:', queue.size());

  queue.clear();
  console.log('После очистки:', queue.items);
}