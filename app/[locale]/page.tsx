import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Offer } from "@/components/home/Offer";
import { Why } from "@/components/home/Why";
import { Services } from "@/components/home/Services";
import { ProjectsRail } from "@/components/home/ProjectsRail";
import { Credentials } from "@/components/home/Credentials";
import { Steps } from "@/components/home/Steps";
import { Reviews } from "@/components/home/Reviews";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const keywords = locale === "kz"
    ? ["Астанадағы өнеркәсіптік құрылыс", "Қазақстандағы құрылыс компаниясы", "өндірістік ангарлар", "кәсіпорындардың инженерлік желілері"]
    : ["промышленное строительство Астана", "строительная компания Казахстан", "производственные ангары", "инженерные сети предприятий"];
  return pageMetadata({ locale, path: "/", title: t("siteTitle"), description: t("siteDescription"), keywords });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faq = await getTranslations({ locale, namespace: "home.faq" });
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faq.raw("items") as { q: string; a: string }[]).map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero />
      {/* Светлая часть «наезжает» на графитовый hero скруглённым краем */}
      <div className="bg-graphite">
        <div className="flex flex-col gap-[var(--gutter)] rounded-t-[var(--radius-section)] bg-bg pt-[var(--gutter)] pb-[var(--gutter)]">
          <Offer />
          <Why />
          <Services />
          <ProjectsRail />
          <Credentials />
          <Steps />
          <Reviews />
          <Faq />
          <FinalCta />
        </div>
      </div>
    </main>
  );
}
