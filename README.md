# link-shortener-web

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

Веб-интерфейс сервиса коротких ссылок [link-shortener](https://github.com/emilburganov/link-shortener).

Стек: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, React Router, Vitest.

## Скриншоты

![Главная страница](docs/home.png)

![Созданная короткая ссылка](docs/result.png)

На телефоне:

<p>
  <img src="docs/mobile-home.png" width="260" alt="Главная страница на телефоне">
  <img src="docs/mobile-result.png" width="260" alt="Созданная короткая ссылка на телефоне">
</p>

## Возможности

- [x] Форма создания короткой ссылки с проверкой адреса
- [x] Ограничение числа переходов, в поле вводятся только цифры
- [x] Срок жизни ссылки в вашем часовом поясе
- [x] Копирование короткой ссылки одним нажатием
- [x] Понятные сообщения об ошибках сервера и сети

## Требования

- Node.js 22.12
- Запущенный сервер [link-shortener](https://github.com/emilburganov/link-shortener)

## Запуск

```bash
npm install
npm run dev
```

Приложение открывается на `http://localhost:5173`, запросы к `/links` проксируются на сервер по адресу `http://localhost:8080`.

Другой адрес сервера:

```bash
API_PROXY_TARGET=http://localhost:9000 npm run dev
```

Сборка попадает в `dist`:

```bash
npm run build
```

В продакшене запросы к `/links` должен проксировать веб-сервер.

## Конфигурация

| Переменная         | Назначение            | По умолчанию            |
| ------------------ | --------------------- | ----------------------- |
| `API_PROXY_TARGET` | Адрес сервера для dev | `http://localhost:8080` |

## Структура

```
src/api         Запросы к серверу
src/components  Общие компоненты, в ui лежат компоненты shadcn
src/features    Функциональные части: create-link и landing
src/hooks       Хуки
src/lib         Утилиты без React
src/pages       Страницы
src/test        Настройка тестов
```

## Команды

| Команда                | Действие                            |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Запустить dev-сервер                |
| `npm run build`        | Проверить типы и собрать приложение |
| `npm run preview`      | Посмотреть собранное приложение     |
| `npm run lint`         | Запустить ESLint                    |
| `npm run lint:fix`     | Исправить замечания ESLint          |
| `npm run format`       | Отформатировать код                 |
| `npm run format:check` | Проверить форматирование            |
| `npm run typecheck`    | Проверить типы                      |
| `npm test`             | Запустить тесты                     |
| `npm run test:watch`   | Запустить тесты в режиме наблюдения |

Перед каждым коммитом husky запускает lint-staged, проверку типов и тесты.

## Лицензия

MIT
