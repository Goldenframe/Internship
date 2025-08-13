# 3 неделя | React

1. useEffect, useLayoutEffect – флоу работы этих хуков, отличия от методов жизненного цикла, cleanup-стадия, нюансы с SSR
<https://dev.to/somshekhar/understanding-the-flow-of-react-s-effect-hook-ej7>
<https://www.bharathikannan.com/blog/react-useeffect-flow>
Пример задания – на примере работающего приложения показать, когда происходят вызовы тела эффекта и cleanup-функции.

2. Мемоизация в React. useMemo, useCallback, React.memo. Влияние изменения key, children и различной композиции одних и тех же компонентов (с точки зрения верстки и взаимодействия с ними пользователя) на рендеринг.
React: полное руководство по повторному рендерингу

3. Context API. Какую проблему помогает решить контекст и типичные случаи применения.
createContext – React
Пример задания – переключение светлой/темной темы, смена языка.

4. Portals API. Распространение событий в React и JS DOM. События в React Portals.
createPortal – React
Пример задания –  типичные кейсы использования порталов на примерах (dropdown, modals, tooltip).

5. Suspense, React.lazy.
Suspense – React
Пример задания – использование отложенной загрузки тяжелого компонента (например, карты внутри модального окна) и отображение индикатора его загрузки.

Ссылки:

- [Understanding the flow of React's useEffect hook](https://dev.to/somshekhar/understanding-the-flow-of-react-s-effect-hook-ej7)
- [React useEffect Hook Flow](https://www.bharathikannan.com/blog/react-useeffect-flow)
- [Мемоизация в React](https://habr.com/ru/companies/timeweb/articles/684718/)
- [Context API](https://react.dev/reference/react/createContext)
- [Portals API](https://react.dev/reference/react-dom/createPortal)
- [Suspense, React.lazy](https://react.dev/reference/react/Suspense)

## Практическое задание (неделя 3) (Используй свой проект из week-2)

### 1. useEffect / useLayoutEffect

#### Debug-панель "Effect Logger"

- Добавь переключатель, который встраивает на страницу компонент-панель
- Панель выводит, в каком порядке вызываются:
  • `render → useLayoutEffect → useEffect`
  • cleanup-функции
  • повторные вызовы при изменении props/state
- Логируй книгу, по которой кликают, чтобы увидеть повторные эффекты
- (SSR: добавь короткий комментарий в README, почему `useLayoutEffect` предупреждает в SSR и как это чинят `useEffect`/`useInsertionEffect`)

*Что должен изучить/применить:* flow эффектов, отличие от жизненных циклов, cleanup

### 2. Мемоизация

#### Оптимизируй Book-лист

- Сделай `BookCard` обёрнутым в `React.memo`
- Вынеси heavy-вёрстку (описание книги) в отдельный компонент и лениво загрузи его (см. блок 5)
- Используй `useMemo` для отфильтрованного/отсортированного массива книг, `useCallback` для обработчиков клика/избранного
- Докажи оптимизацию через React DevTools Profiler (скриншот приложи к PR)

*Что должен изучить/применить:* useMemo, useCallback, React.memo, ключи и children

### 3. Context API

#### Светлая/тёмная тема + язык UI (На примере Header компонента в проекте)

- Создай `ThemeContext` (`'light' | 'dark'`) и `LangContext` (`'ru' | 'en'`)
- Храни текущие значения в `localStorage`, используй enum `StorageKey` из недели 2
- Добавь переключатели в Header
- Кнопку темы рендерь как иконку внутри Portals-dropdown (см. блок 4)

*Что должен изучить/применить:* проблему "prop drilling", createContext, useContext

### 4. Portals

#### Modal + Dropdown через `createPortal`

- Вынеси существующую книгу-детали из /route в модальное окно, рендеря его в `<div id="modal-root">` за пределами #root
- Сделай dropdown-список фильтров (категории Google Books) через портал в `<div id="overlay-root">`
- Добавь демонстрацию всплытия событий: внутри модалки клик по кнопке «Избранное» не должен закрывать модалку (контроль за stopPropagation)

*Что должен изучить/применить:* Portals, всплытие событий, React синтетические события

### 5. Suspense + React.lazy

#### Ленивая загрузка "тяжёлых" частей

- Оберни `BookDetailsModalBody` в `React.lazy` и покажи `<Spinner/>` через `Suspense`
- Для демонстрации загрузки вставь искусственную задержку (импортируй util `sleep(600)` в `lazy`-компонент)

*Что должен изучить/применить:* code-splitting, Suspense boundaries

### По‑дням

### Пн

- Врезка Effect Logger
- README-раздел про flow effect-ов и SSR-заметку

### Вт

- Профилирование → `React.memo`, `useMemo`, `useCallback`

### Ср

- Реализация `ThemeContext`, `LangContext`, сохранение в localStorage

### Чт

- Перенос деталей книги в Modal-портал + Dropdown портал, обработка событий

### Пт

- `React.lazy` + `Suspense`, финальная полировка, скриншоты из Profiler, PR

## Опционально

### Добавить архитектуру [fsd](https://feature-sliced.github.io/documentation/ru/docs/get-started/overview)

- достаточно будет папок верхнего уровня  app, pages и shared

### Добавить scss модули
