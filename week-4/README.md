# 4 неделя | effector

1. createStore, createEvent, createEffect – знакомство с основными примитивами библиотеки.
<https://effector.dev/>
Пример задания – замена локального state-менеджмента на effector в приложении.

2. scope – выполнение вычислений на scope, использование allSettled.
<https://effector.dev/docs/api/effector/scope>
Пример задания – применение в unit-тестах и создание отдельных scope для модалок.

3. effector-react – Provider, useUnit, useList, useStoreMap, useGate. Подсветить важность вызова событий через useUnit при наличии провайдера. Рассказать основные кейсы применения Gate.
<https://effector.dev/docs/api/effector-react/useUnit>
Пример задания – реализовать приложение на React, где будет использоваться Provider. Показать, что вызов событий без useUnit не приводит к обновлению значений сторов в скоупе провайдера.

4. Фабрики, динамические модели. Переиспользование логики.
Пример задания – создать компонент, который принимает модель в виде пропсов и использовать несколько его копий на одной странице.

5. patronum. Изучение методов.
<https://patronum.effector.dev/>
Пример задания – использование методов debounce, spread, reset для упрощения моделей.

Ссылки:

- [[RotFront] Эффектор. Начало. - Анастасия Розанова от 15.02.2023](https://www.youtube.com/watch?v=afx2ok3ZCXs)
- [[RotFront] "Effector + patronum" от Назара Фоминова](https://www.youtube.com/watch?v=rviM-vfZex4)
- [effector](https://effector.dev/)
- [effector patronum](https://patronum.effector.dev/)

## Практическое задание (неделя 4) (Используй свой проект из week-3)

### Цель

Заменить часть локального state-менеджмента в приложении на effector, освоить базовые примитивы (`store`, `event`, `effect`), работу со `scope` и `Provider`, научиться собирать динамические модели и попробовать библиотеку `patronum`.

---

### 1. Базовые примитивы

#### Замена state-менеджмента на effector

- Создай `booksModel.ts` с `createEffect` для загрузки книг, `createStore` для списка, `createEvent` для поиска
- Подключи `useUnit` в React и убирай прямые вызовы `fetch` — работай через `booksModel`
- Докажи: список книг управляется только через effector-store

*Что должен изучить/применить:* createStore, createEvent, createEffect, useUnit

---

### 2. Scope + allSettled

#### Тестирование и изоляция state

- Добавь юнит-тесты для `booksModel` с использованием `allSettled`
- Проверяй корректность данных в store при вызове событий
- Сделай отдельный `scope` для модалки BookDetails — при закрытии стор сбрасывается

*Что должен изучить/применить:* scope, allSettled, изоляция state

---

### 3. effector-react

#### Provider и хуки

- Оберни приложение в `<Provider value={rootScope}>`
- Переделай список книг на `useList(store, renderFn)`
- Добавь `FavoritesGate`: монтирование → загрузка из localStorage, размонтирование → сохранение
- Покажи: вызов `event` напрямую не обновляет стор в scope-провайдере

*Что должен изучить/применить:* Provider, useList, useGate, scope-провайдер

---

### 4. Фабрики и динамические модели

#### Переиспользование логики

- Создай фабрику `createBookModel()` (events + store + effects для отдельной книги)
- Компонент `BookWidget` принимает модель как проп, можно отрендерить несколько на странице

*Что должен изучить/применить:* фабрики, динамические модели, переиспользование

---

### 5. Patronum

#### Упрощение моделей

- Используй методы из `patronum`:
  • `debounce` для поиска (задержка перед запросом)
  • `spread` для обновления нескольких сторов
  • `reset` для сброса на событие `clear`

*Что должен изучить/применить:* patronum, debounce, spread, reset

---

### По‑дням

### Пн

- createStore, createEvent, createEffect → базовая модель книг

### Вт

- Добавление scope, модалки с отдельным скоупом, юнит-тесты через allSettled

### Ср

- Интеграция Provider, useList, useStoreMap, реализация Gate для избранного

### Чт

- Фабрика моделей + компонент BookWidget

### Пт

- Внедрение patronum (debounce, reset, …), рефакторинг, PR
