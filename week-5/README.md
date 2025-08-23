# 5–6 недели | Web API, WebSec

1. IntersectionObserver
<https://habr.com/ru/post/494670/>
<https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API>
Примеры заданий – «ленивая» или отложенная загрузка изображений, InfinityScroll, подсчёт просмотров блока, оптимизация (например: запуск анимации, только после попадания блока во вьюпорт)

2. ResizeObserver
<https://habr.com/ru/post/487146/>
<https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver>
Примеры заданий – адаптивные блоки с помощью ResizeObserver, хук получения размеров блока при изменении его размеров

3. MutationObserver
<https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver>
Пример задания – реагирование на изменения внутри компонентов сторонней библиотеки

4. Встроенные браузерные хранилища. BroadcastChannel API.
<https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage>
<https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage>
<https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event>
<https://developer.mozilla.org/ru/docs/Web/API/BroadcastChannel>

5. fetch, XMLHttpRequest, AbortController.
<https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API>
<https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest>
<https://developer.mozilla.org/ru/docs/Web/API/AbortController>
Пример задания – классический пример загрузки данных на клиенте в React через useEffect с использованием fetch и XMLHttpRequest (во втором случае обернуть в Promise) и отмена запроса при анмаунте через AbortController. Желательно реализовать переиспользуемый хук.

6. Cookies. CSRF, xsrf токены.
<https://learn.javascript.ru/cookie>
<https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie>
Примеры заданий – реализация функций для чтения и записи Cookie, парсинг document.cookie, удаление по ключу.

7. CORS. Preflight-запросы.
<https://learn.javascript.ru/fetch-crossorigin>
<https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS>
Тема больше с упором на теорию. Примеры вопросов – что такое атака с использованием XSS и как от неё защититься, что такое простые запросы, что такое Preflight-запрос, когда он отправляется и когда нет.

Ссылки:

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
- [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [Broadcast Channel API](https://developer.mozilla.org/ru/docs/Web/API/BroadcastChannel)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [XMLHttpRequest](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest)
- [AbortController](https://developer.mozilla.org/ru/docs/Web/API/AbortController)
- [Cookies](https://learn.javascript.ru/cookie)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Практическое задание (недели 5–6)

### Цель

Освоить Web API (IntersectionObserver, ResizeObserver, MutationObserver), работу с браузерными хранилищами, сетевые запросы, безопасность и создать переиспользуемые хуки для работы с Web API.

---

## Неделя 5 · Web API

### 1. IntersectionObserver (Используй свой проект из week-4)

#### Ленивая загрузка и подсчёт просмотров

- Добавь lazy-загрузку обложек книг через `IntersectionObserver`
- Реализуй подсчёт просмотров каждой книги (логируй в консоль или показывай в UI)
- Создай хук `useIntersectionObserver` для переиспользования

---

### 2. ResizeObserver (Используй отдельное приложение)

#### Адаптивные блоки

- Создай компонент `<ResizableBox>` с CSS `resize: both`
- Через `ResizeObserver` показывай текущие размеры блока в реальном времени
- Реализуй хук `useResizeObserver` для получения размеров любого элемента

---

### 3. MutationObserver (Используй отдельное приложение)

#### Отслеживание DOM-изменений

- Создай компонент `<Widget>` который каждые 2 сек добавляет элемент в `div`
- `MutationObserver` отслеживает добавление и подсвечивает новые узлы
- Реализуй хук `useMutationObserver` для подписки на DOM-мутации

---

### 4. Комбинированное задание (Используй свой проект из week-4)

#### Аналитика просмотров

- Встрои подсчёт просмотров блока в Google Books App через `IntersectionObserver`
- Добавь счётчик внизу страницы: «Вы просмотрели X книг»
- Покажи практическое применение Web API для аналитики

---

## Неделя 6 · WebSec + работа с сетью

### 5. BroadcastChannel + Web Storage (Используй свой проект из week-4)

#### Синхронизация между вкладками

- Добавь синхронизацию «Избранного» между вкладками через `BroadcastChannel`
- Покажи отличие `localStorage` и `sessionStorage` в мини-демо
- Реализуй хук `useBroadcastChannel` для переиспользования

---

### 6. fetch + AbortController (Используй свой проект из week-4)

#### Отмена запросов

- Реализуй хук `useFetch<T>` с `AbortController`
- При закрытии модалки книги отменяй загрузку деталей (имитируй задержку)
- Покажи правильную отмену запроса при анмаунте компонента

---

### 7. XMLHttpRequest (Используй отдельное приложение)

#### Обёртка в Promise

- Напиши функцию `xhrRequest<T>(url): Promise<T>`
- Создай кнопки для загрузки данных через `fetch` и через `xhrRequest`
- Покажи разницу API и умение обернуть XHR в Promise

Можно использовать API c гугл книгами

---

### 8. Cookies (Используй отдельное приложение)

#### Работа с токенами

- Напиши утилиты `getCookie`, `setCookie`, `deleteCookie`
- В компоненте кнопки: «Установить токен», «Прочитать токен», «Удалить токен»
- CSRF vs XSRF (теория) (Можно в формате readme)

---

### 9. CORS + Web Security (Теория)

#### Теория безопасности (Можно в формате readme)

- Изучи что такое простые запросы и когда делается Preflight
- Разбери чем опасен XSS и CSRF
- Пойми как правильно защищать API

---

### По‑дням

#### Неделя 5

**Пн** – IntersectionObserver → lazy loading обложек + подсчёт просмотров

**Вт** – ResizeObserver → компонент ResizableBox + хук useResizeObserver

**Ср** – MutationObserver → компонент Widget + хук useMutationObserver

**Чт** – Комбинированное задание → аналитика просмотров в Google Books App

**Пт** – Резерв

#### Неделя 6

**Пн** – BroadcastChannel + Web Storage → синхронизация избранного между вкладками

**Вт** – fetch + AbortController → хук useFetch с отменой запросов

**Ср** – XMLHttpRequest → обёртка в Promise, демо-компонент

**Чт** – Cookies → утилиты для работы с токенами, CSRF/XSRF

**Пт** – CORS + Web Security → теория, мини-проверка знаний
