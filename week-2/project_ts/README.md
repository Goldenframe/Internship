# Миграция проекта на Vite

## Задания

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