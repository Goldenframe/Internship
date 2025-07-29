import { HashTable } from "../data-structures/index.js";

export function hashTableDemo() {
  const hashTable = new HashTable();

  hashTable.set('name', 'Nina');
  hashTable.set('age', 22);
  console.log('Таблица после добавления данных:', hashTable.table);

  console.log('name:', hashTable.get('name'));
  console.log('age:', hashTable.get('age'));

  hashTable.delete('age');
  console.log('Таблица после удаления:', hashTable.table);
}