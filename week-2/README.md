# 2 неделя | TypeScript

1. Типы и интерфейсы. Разница между типом и интерфейсом. Utility Types.

2. Generics. Параметризация функций. Type inference переменных и возвращаемых из функции значений.

3. Type aliases, unions, enums. Type guards.

Ссылки:

- [TypeScript от Назара](https://disk.yandex.ru/i/6iOip3fz0itdgA)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- [Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

## Практическое задание (неделя 2)

### «Типизированный рефакторинг Google Books App c переездом на Vite + React TS»

**Цель:** за 5 рабочих дней перевести существующее приложение на Vite + TypeScript и закрепить темы «Типы и интерфейсы», «Generics», «Type guards» и др., **не переписывая бизнес‑логику с нуля**.

---

###  Общие требования

### 1. Инфраструктура (Vite)

- Создай проект через `vite` **или** мигрируй текущий репозиторий на Vite (удали webpack/Cra‑артефакты)
- Проверь, что `tsconfig.json` в корне и `"strict": true`
- Добавь ESLint + Prettier c `@typescript-eslint/parser`, `eslint-plugin-react-hooks`, `eslint-plugin-import`, `eslint-config-prettier`
- Конфиг можно хранить в `eslint.config.js` или `.eslintrc.cjs`
- Настрой aliases (`@/components`, `@/hooks`, …) в `vite.config.ts` + `tsconfig.paths.json`

**Ключевые темы:** setup Vite, strict TS

### 2. Модели и сервисы

- Опиши интерфейсы/типы ответа Google Books: `Book`, `VolumeInfo`, `SearchResponse`
- API‑слой (`booksService.ts`) возвращает строго типизированные данные, используй generic‑хелпер `fetchJSON<T>`
- Все переменные окружения через `.env` → `import.meta.env.VITE_*`

**Ключевые темы:** interfaces vs type, generics, `Partial`

### 3. Компоненты‑карточки

- Переведи **две** ключевые части в `.tsx`: `BookCard`, `BookDetails`
- Опиши пропсы через `PropsWithChildren` и `Pick<VolumeInfo, 'title' | 'authors'>`

**Ключевые темы:** type aliases, React types

### 4. Управление состоянием

- В util‑файле для `localStorage` введи enum `StorageKey`
- Добавь type guard `isBook(obj: unknown): obj is Book` при чтении избранного

**Ключевые темы:** enums, type guards

### 5. Хуки и Generics

- Перепиши кастомный хук `useInfiniteScroll` как generic `useInfiniteScroll<T>`
- Убедись, что callback‑функция получает тип `T` по inference, без явного указания

**Ключевые темы:** generics, type inference

### 6. Резерв + код‑ревью

- Доделай хвосты, устрани `any`/`unknown`, пройди все **strict‑ошибки**

**Ключевые темы:** закрепление

---

### 2 · По‑дням

### Пн

- Инициализируй/мигрируй Vite‑проект
- Подключи ESLint + Prettier

*Ожидаемый результат:* `npm run dev` запускает Vite dev‑сервер; приложение ещё на `.js`

### Вт

- Типизируй модели и API‑слой
- Добавь generic `fetchJSON`

*Ожидаемый результат:* В API‑файлах нет `any`; запросы type‑safe

### Ср

- Мигрируй UI‑компоненты `BookCard`, `BookDetails` на TS
- Покрой пропсы

*Ожидаемый результат:* Оба компонента полностью в `.tsx`

### Чт

- Generic‑хук `useInfiniteScroll`
- Enum `StorageKey`, type guard

*Ожидаемый результат:* Infinite scroll работает; избранное типобезопасно

### Пт

- Резерв, устранение strict‑ошибок
- Код‑ревью и PR

*Ожидаемый результат:* PR без `any`; `npm run build` собирается без ошибок
