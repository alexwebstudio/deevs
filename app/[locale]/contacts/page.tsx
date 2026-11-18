import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Panel } from "@/components/ui/Section";
import { ContactLocationMap } from "@/components/contacts/ContactLocationMap";
import { LeadModalButton } from "@/components/providers/LeadModalProvider";
import { site } from "@/config/site";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contacts" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/contacts") };
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell crumbs={[{ label: "Контакты" }]} label="ТОО Deevs · Астана" title="Контакты компании" lead="Телефон, WhatsApp, Instagram, юридический адрес и производственная база ТОО Deevs.">
      <Panel className="grid gap-4 p-3 md:p-4 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-[var(--radius-card)] bg-dark p-6 text-white md:p-8">
          <p className="text-[11px] font-medium tracking-[.14em] text-white/50 uppercase">Связаться с нами</p>
          <h2 className="mt-4 text-[clamp(28px,4vw,42px)] leading-tight font-medium">ТОО Deevs</h2>
          <div className="mt-7 space-y-5 text-[14px] leading-relaxed">
            <p><span className="block text-white/50">Телефон</span><a className="mt-1 inline-block text-[20px]" href={site.phoneHref}>{site.phone}</a></p>
            <p><span className="block text-white/50">WhatsApp</span><a className="mt-1 inline-flex items-center gap-2" href={site.whatsapp} target="_blank" rel="noreferrer">Написать в WhatsApp ↗</a></p>
            <p><span className="block text-white/50">Instagram</span><a className="mt-1 inline-flex items-center gap-2" href="https://www.instagram.com/too_deevs/" target="_blank" rel="noreferrer">@too_deevs ↗</a></p>
            <p><span className="block text-white/50">Юридический адрес</span><span className="mt-1 inline-block">Республика Казахстан, г. Астана, ул. Керей, Жанибек хандар, 44/1, кв. 37</span><br/><a className="mt-1 inline-block text-white/70 underline underline-offset-4" href="https://2gis.kz/astana/inside/70030076513910385/firm/70000001112483051" target="_blank" rel="noreferrer">Открыть адрес на карте ↗</a></p>
            <p><span className="block text-white/50">БИН</span><span className="mt-1 inline-block">031240013006</span></p>
          </div>
          <LeadModalButton className="mt-7 inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-6 text-[13px] font-semibold text-ink transition-colors hover:bg-wood-light sm:w-fit">Оставить заявку <span aria-hidden>↗</span></LeadModalButton>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/15 pt-5 text-[13px]">
            <a href="/deevs-presentation.pdf" target="_blank" rel="noreferrer" className="underline underline-offset-4">Смотреть презентацию PDF ↗</a>
            <a href="/documents/license-overview.png" target="_blank" rel="noreferrer" className="underline underline-offset-4">Лицензия ↗</a>
            <a href="/documents/iso-certificates.png" target="_blank" rel="noreferrer" className="underline underline-offset-4">Сертификаты ISO ↗</a>
          </div>
        </div>
        <div className="min-w-0 p-1 md:p-3"><ContactLocationMap /></div>
      </Panel>
    </PageShell>
  );
}
