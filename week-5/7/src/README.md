fetch vs XMLHttpRequest

## Задание

fetch vs XMLHttpRequest

## Что такое XHR и fetch?

- **XMLHttpRequest (XHR)** - старый способ делать запросы к серверу в браузере
- **fetch** - новый способ. Появился позже, проще в использовании

## Основные отличия

### 1. Синтаксис и удобство
- **fetch** использует `Promise`, легко работает с `async/await` и даёт лаконичный код
- **XHR** основан на callback + событиях (`onload`, `onerror`, `readystatechange`), что довольно громоздко 

### 2. Поддержка JSON и других форматов
- В **fetch** есть удобные методы: `.json()`, `.text()`, `.blob()`
- В **XHR** нужно вручную парсить ответ (`JSON.parse(xhr.responseText)`)

### 3. Отмена запроса
- **fetch** поддерживает отмену через `AbortController`
- **XHR** отменяется методом `.abort()`

### 4. Обработка ошибок
- **fetch** не считает HTTP-статусы 4xx/5xx ошибкой (reject), Promise завершится успехом (resolve), нужно проверять response.ok
- **XHR** обрабатывает HTTP-ошибки через событие onerror