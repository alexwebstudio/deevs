"use client";

const address = "Республика Казахстан, Астана, ул. Керей, Жанибек хандар, 44/1, кв. 37";
const twoGisUrl = "https://2gis.kz/astana/inside/70030076513910385/firm/70000001112483051";
const yandexMapUrl = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(address)}&z=16&l=map`;

export function ContactLocationMap() {
  return (
    <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[var(--radius-card)] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(20,21,24,.2)] sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-3">
        <p className="text-[15px] font-medium text-ink">Юридический адрес на карте</p>
        <a href={twoGisUrl} target="_blank" rel="noreferrer" className="text-[12px] text-muted underline underline-offset-4">Открыть в 2ГИС ↗</a>
      </div>
      <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-[calc(var(--radius-card)-8px)] bg-[#e8e8e8] sm:min-h-[440px]">
        <iframe
          src={yandexMapUrl}
          title="Юридический адрес ТОО Deevs на Яндекс Картах"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
