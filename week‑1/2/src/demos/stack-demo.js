import { Stack } from "../data-structures/index.js";

export function stackDemo() {
  const stack = new Stack();

  stack.push(100);
  stack.push(200);
  stack.push(300);
  console.log('После добавления:', stack.items);

  console.log('Удален:', stack.pop());
  console.log('Сейчас верхний:', stack.peek());
  console.log('Размер:', stack.size());

  stack.clear();
  console.log('После очистки:', stack.items);
}