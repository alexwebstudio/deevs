import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Panel } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return {
    ...pageMetadata({ locale, path: "/privacy", title: t("title"), description: t("lead"), keywords: locale === "kz" ? ["Deevs құпиялылық саясаты", "дербес деректерді өңдеу"] : ["политика конфиденциальности Deevs", "обработка персональных данных"] }),
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const sections = t.raw("sections") as { title: string; text: string }[];
  return (
    <PageShell crumbs={[{ label: t("crumb") }]} label={t("label")} title={t("title")} lead={t("lead")}>
      <Panel className="px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-14">
        <div className="mb-8 flex flex-col gap-3 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[52ch] text-[14px] leading-relaxed text-muted">{t("lead")}</p>
          <Link href="/contacts" className="inline-flex w-fit shrink-0 underline underline-offset-4">{nav("contacts")} ↗</Link>
        </div>
        <ol className="grid min-w-0 gap-3 md:grid-cols-2">
          {sections.map((section) => (
            <li key={section.title} className="min-w-0 rounded-[var(--radius-card)] border border-white bg-white/75 p-5 shadow-[0_16px_40px_-32px_rgba(17,17,17,.25)] sm:p-6">
              <h2 className="text-[18px] font-medium leading-snug sm:text-[20px]">{section.title}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-muted [overflow-wrap:anywhere]">{section.text}</p>
            </li>
          ))}
        </ol>
      </Panel>
    </PageShell>
  );
}
