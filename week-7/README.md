# 7-8 неделя | Next.js (Page Router)

1. **Введение в фреймворк, Page Router**
   - File-based routing: `pages/index.tsx`, `pages/books/[id].tsx`, catch-all `pages/[...slug].tsx`
   - Динамика: `[id]`, `[...slug]`, `basePath` в `next.config.js` (деплой под поддиректорией)
   - Где рендерится код: клиент vs сервер

2. **SSR в Page Router**
   - `getServerSideProps(ctx)`: когда вызывается; возвраты: `props`, `redirect`, `notFound`
   - `GetServerSidePropsContext`: `params`, `query`, `req`, `res`
   - `useEffect`/`useLayoutEffect` при SSR: почему `useLayoutEffect` ругается на сервере

3. **Кастомные страницы ошибок**
   - `pages/404.tsx`, `pages/_error.tsx`: нет SSR (`getServerSideProps` недоступен)
   - Что можно и нельзя на страницах ошибок

4. **API-роуты**
   - `pages/api/*.ts`: Node-окружение, кэширование, ограничения serverless

5. **Middleware и CSP (Content Security Policy)**
   - `middleware.ts` исполняется **до** обработки роутов/`getServerSideProps`
   - Добавление CSP заголовка и `nonce`, прокладка `nonce` дальше в страницу

6. **Оптимизация картинок `next/image`**
   - Чем отличается от `<img>`, `sizes`, `priority`, `placeholder="blur"`, `fill`, `remotePatterns`

Ссылки:

- [Next.js Documentation => (Using Pages Router)](https://nextjs.org/docs)
- [Pages Router](https://nextjs.org/docs/pages/building-your-application/routing)
- [getServerSideProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props)
- [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- [Middleware](https://nextjs.org/docs/pages/api-reference/file-conventions/middleware)
- [next/image](https://nextjs.org/docs/pages/api-reference/components/image)
- [Custom Error Pages](https://nextjs.org/docs/pages/building-your-application/routing/custom-error)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Практическое задание (неделя 7-8) (Новое приложение используй Google Books API)

### 1. Базовая миграция роутинга и динамические страницы

#### File-based routing + SSR

- Страницы:
  - `/` — список книг (как у тебя сейчас)
  - `/books/[id]` — детальная страница книги (данные с Google Books)
  - `/favorites` — избранное (из `localStorage`, client-side)
- **SSR на `/books/[id]`** через `getServerSideProps`: загружай детали книги
- **Покажи все варианты возврата из GSSP(getServerSideProps):**
  - `notFound`: если книги нет/ошибка 404 от API
  - `redirect`: если `id` невалидный → редирект на `/` (или `/404`)
  - `props`: успешный путь
- **Демо `useEffect`/`useLayoutEffect` при SSR:**
  - Лёгкий «логгер» внутри детальной страницы: `useEffect` — ок, `useLayoutEffect` — обернуть в проверку `typeof window !== 'undefined'` или вынести в клиентский компонент

---

### 2. Кастомная 404

#### Страница ошибки

- Создай `pages/404.tsx` в стиле приложения
- Объясни в README, почему `getServerSideProps` здесь не доступен и чем это чревато

---

### 3. Продвинутая работа с `GetServerSidePropsContext`

#### Персонализация детальной страницы

- Прочитай `ctx.req.headers['user-agent']` и покажи небольшой бейдж «Mobile/Desktop»
- Прочитай/запиши cookie `gb_lang=ru|en` (если нет — установи `ru` по умолчанию через `res.setHeader('Set-Cookie', ...)`)
- Считай query `?ref=...` и добавь в лог (см. задание 4)
- В `props` передай `lang`, `uaType`, `ref`

---

### 4. API-эндпоинт + серверный LRU-лог через effector

#### Логирование GSSP

- Создай effector-модель **на сервере** для логов GSSP (в памяти процесса):
  - Поля лога: `time` (ISO), `resolvedUrl` (из `ctx.resolvedUrl`), `ref` (из query), `uaType`, `lang`, `status` (`props|redirect|notFound`)
  - Хранилище — LRU на **10 записей**
- В `getServerSideProps` детальной страницы **добавляй запись** в лог (через модель)
- Создай эндпоинт `GET /api/logs` → возвращает текущие 10 записей LRU
- Сделай маленькую админку на `/logs` (client-side) — подтягивает `/api/logs` и показывает таблицу

> Примечание: В serverless окружении выживание стейта не гарантировано. В README отметь это.

---

### 5. Middleware с CSP + nonce

#### Безопасность и заголовки

- В `middleware.ts`:
  - Сгенерируй `nonce` (напр., `crypto.randomUUID()` или base64) и добавь CSP заголовок `Content-Security-Policy`
  - Пробрось `nonce` дальше: положи в `request.headers` (через `request.headers.set`) или в `request.cookies`, а на странице вытащи его в GSSP и вставь в `<script nonce={nonce}>` где нужно
- Добавь в README: порядок выполнения — **middleware → route → GSSP → render**

---

### 6. next/image для обложек

#### Оптимизация изображений

- Заменить `<img>` на `<Image>` в карточках книг
- Настроить `next.config.js` → `images.remotePatterns` для доменов Google Books thumbnails
- На главной:
  - Указать `sizes`, корректные `width/height` **или** `fill` + контейнер
  - Для первых N карточек — `priority`
  - Для низкокачественных превью — `placeholder="blur"`
- В README коротко сравни `<img>` vs `<Image>`

---

### 7. Effector + `allSettled` в `getServerSideProps`

#### Компоновка домашней страницы

- Домашняя (`/`): сверстай из нескольких блоков (например: «Популярное», «Новинки», «JS-книги»)
- Для каждого блока — отдельная effector-модель (фабрики приветствуются)
- В `getServerSideProps` вызови `allSettled` для эффектов загрузки каждого блока, собери сторы, верни в `props` уже готовые данные (гидратация)
- На клиенте сторы проинициализированы стартовыми значениями (никаких «миганий»)

### По-дням

**Неделя 7**

**Пн**

- Теория Page Router, структура `pages/*`, динамика `[id]`, `basePath`
- Создать страницы `/`, `/books/[id]`, `/favorites`

**Вт**

- Внедрить `getServerSideProps` на `/books/[id]` + сценарии `props/redirect/notFound`
- README: заметка про `useLayoutEffect`

**Ср**

- Кастомная `pages/404.tsx`
- Завести легкий UI-логгер эффектов на детальной

**Чт**

- Расширенный `GetServerSidePropsContext`: `req/res`, cookies (`gb_lang`), `user-agent`, `?ref`

**Пт**

- API-роут `/api/logs` + effector-LRU (10 записей) и страница `/logs`

**Неделя 8**

**Пн**

- `middleware.ts` + CSP заголовок + `nonce`, прокладка `nonce` до страницы и пример inline-скрипта

**Вт**

- `next/image` на карточках, `remotePatterns`, `sizes`, `priority`, `placeholder="blur"`

**Ср**

- Домашняя страница из блоков, effector-модели, `allSettled` в GSSP

**Чт**

- резервный день

**Пт**

- резервный день

## Структура проекта (Page Router) (Можно использовать FSD)

```
pages/
  index.tsx
  books/
    [id].tsx
  favorites.tsx
  logs.tsx
  api/
    logs.ts
middleware.ts
next.config.js
src/
  components/
  features/             # блоки домашней страницы
  models/               # effector: books, logs, blocks
  lib/                  # fetchJSON, cookies, csp
  server/               # helpers для GSSP
```

## Подсказки/скелеты

**`getServerSideProps` — ветвления**

```ts
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, ref } = { ...ctx.params, ...ctx.query } as { id?: string; ref?: string };
  if (!id) return { redirect: { destination: '/', permanent: false } };

  try {
    const book = await fetchBookById(id);
    if (!book) return { notFound: true };

    // cookies / headers
    const ua = ctx.req.headers['user-agent'] || '';
    const uaType = /mobile/i.test(ua) ? 'mobile' : 'desktop';
    const lang = parseCookie(ctx.req.headers.cookie).gb_lang ?? 'ru';
    if (!('gb_lang' in parseCookie(ctx.req.headers.cookie ?? ''))) {
      ctx.res.setHeader('Set-Cookie', `gb_lang=${lang}; Path=/; HttpOnly; SameSite=Lax`);
    }

    // логирование (эффектор)
    logGsspFx({ status: 'props', resolvedUrl: ctx.resolvedUrl, ref, uaType, lang });

    return { props: { book, uaType, lang, ref: ref ?? null } };
  } catch (e) {
    logGsspFx({ status: 'notFound', resolvedUrl: ctx.resolvedUrl });
    return { notFound: true };
  }
};
```

**`middleware.ts` — CSP + nonce (эскиз)**

```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const res = NextResponse.next({
    request: { headers: new Headers(req.headers) },
  });
  res.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline';`
  );
  res.headers.set('x-nonce', nonce);
  return res;
}
```

**`next.config.js` — `remotePatterns` и `basePath` (если нужно)**

```js
module.exports = {
  // basePath: '/myapp',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'books.google.com' },
      { protocol: 'https', hostname: 'books.googleusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
};
```

**SSR + effector на главной (`allSettled`) — идея**

```ts
export const getServerSideProps: GetServerSideProps = async () => {
  const scope = fork(); // effector
  await allSettled(loadPopularFx, { scope });
  await allSettled(loadNewFx, { scope });
  await allSettled(loadJSFx, { scope });
  return { props: { initialState: serialize(scope) } };
};
```

## Доп. задачи (если останется время)

- Сравнить SSR (`getServerSideProps`) с SSG/ISR (`getStaticProps`/`revalidate`) на детальной странице (теория + README)
- Небольшой split: вынести «тяжёлые» виджеты в `next/dynamic` с `ssr: false`, если уместно
- Короткая страница «/diagnostics» с выводом заголовков запроса (на клиенте — через `/api/echo-headers`)
