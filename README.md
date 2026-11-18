# ТОО Deevs

Сайт компании Deevs на Next.js 15, TypeScript, Tailwind CSS 4, next-intl, GSAP и Lenis. Композиция, сетка, анимации, переходы, карточки и горизонтальный слайдер перенесены из NORDHAUS; тексты и палитра адаптированы под материалы Deevs и промышленных заказчиков.

## Запуск

```bash
npm install
npm run dev -- --port 3001
```

Откройте http://localhost:3001/ru.

## Проверки

```bash
npm run lint
npm run typecheck
npm run build
```

## Страницы

- Главная — `/ru`
- Услуги — `/ru/services`
- Объекты и страницы проектов — `/ru/projects`
- О компании — `/ru/about`
- Контакты — `/ru/contacts`
- Политика обработки данных — `/ru/privacy`

## Данные и интеграции

Телефон, бренд и навигация находятся в `config/site.ts`, тексты — `messages/ru.json`, список объектов — `data/works.ts`. При деплое задайте `NEXT_PUBLIC_SITE_URL` для корректных canonical URL, sitemap и Open Graph.

Форма отправляет заявку боту Telegram после настройки `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в `.env.local` (шаблон — `.env.example`). Перезапустите dev-сервер после добавления переменных. Токен хранится только на сервере. Публичная презентация компании размещена в `/deevs-presentation.pdf`. Исходные материалы в `materials/` исключены из Git, так как в них есть таблица лидов.
