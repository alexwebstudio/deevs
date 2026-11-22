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

Телефон, WhatsApp, адрес сайта и контакты находятся в `config/site.ts`; переводы — в `messages/`; список проектов — в `data/works.ts`. Форма заявки открывает WhatsApp (в новой вкладке) с подготовленным сообщением. Для развёртывания задайте `NEXT_PUBLIC_SITE_URL`.

Переменные окружения для подтверждения прав в вебмастерах и для счётчиков аналитики (Яндекс Метрика, GA4) описаны в `.env.example`. Без них сайт работает как обычно. Цели аналитики: `lib/analytics.ts`.

## Маршрутизация и SEO

- Русские страницы обслуживает `app/[locale]`: `middleware.ts` незаметно переписывает `/about` → `/ru/about`. Адреса `/ru/...` перенаправляются на адреса без префикса (308), `/KZ/...` → `/kz/...`.
- Язык определяется только адресом (`localeDetection: false`), без редиректов по cookie или языку браузера.
- В `middleware.ts` есть список существующих страниц. Все прочие адреса получают статическую 404-страницу на нужном языке (`app/[locale]/page-404`) с HTTP-статусом 404 и `noindex`.
- Title, description, canonical, hreflang и OG задаются через `lib/seo.ts`. Sitemap: `app/sitemap.ts`, туда не попадают политика и 404.
- Новый проект в `data/works.ts` надо добавить ещё в одно место — в превью для соцсетей: `npm run og:projects` (создаёт `public/images/og/projects/<slug>.jpg`). Страница и sitemap подхватят проект сами.
- Иконки (`app/favicon.ico`, `app/apple-icon.png`) генерируются из `app/icon.svg` командой `npm run icons`.
