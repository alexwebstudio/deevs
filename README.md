# ТОО Deevs

Многоязычный сайт строительной компании Deevs на Next.js, TypeScript и Tailwind CSS.

## Запуск

```bash
npm ci
npm run dev -- --port 3001
```

Откройте `http://localhost:3001`. Русская версия работает без языкового префикса, казахская — с `/kz`.

## Страницы

- Главная: `/`
- Услуги: `/services`
- Объекты: `/projects`
- О компании: `/about`
- Контакты: `/contacts`
- Политика обработки данных: `/privacy` и `/kz/privacy` (страницы закрыты от индексации)

## Команды

```bash
npm run lint
npm run typecheck
npm run build
```

## Данные и интеграции

Телефон, WhatsApp, адрес сайта и контакты находятся в `config/site.ts`; переводы — в `messages/`; список проектов — в `data/works.ts`. Форма заявки открывает WhatsApp с подготовленным сообщением. Для развёртывания задайте `NEXT_PUBLIC_SITE_URL`.
