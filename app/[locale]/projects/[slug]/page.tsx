import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Panel } from "@/components/ui/Section";
import { PillButton } from "@/components/ui/PillButton";
import { works } from "@/data/works";
import { alternates } from "@/lib/seo";
type Props={params:Promise<{locale:string;slug:string}>};
export function generateStaticParams(){return works.map(w=>({slug:w.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {locale,slug}=await params;const w=works.find(x=>x.slug===slug);if(!w)return{};const t=await getTranslations({locale,namespace:"meta.project"});return{title:t("title",{name:w.title}),description:`${w.client} · ${w.location} · ${w.year}`,alternates:alternates(locale,`/projects/${slug}`)}}
export default async function ProjectPage({params}:Props){const {locale,slug}=await params;setRequestLocale(locale);const w=works.find(x=>x.slug===slug);if(!w)notFound();return <PageShell crumbs={[{href:"/projects",label:"Объекты"},{label:w.title}]} label={`${w.year} · ${w.location}`} title={w.title} lead={`${w.client ? `${w.client} · ` : ""}пример работ из презентации ТОО Deevs`}><Panel className="grid gap-6 p-3 md:p-4 lg:grid-cols-[1.4fr_1fr]"><div className="relative min-h-[320px] overflow-hidden rounded-[calc(var(--radius-section)-10px)] bg-dark md:min-h-[520px]">{w.image&&<Image src={w.image} alt={w.title} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover"/>}</div><div className="flex flex-col justify-center px-5 py-8 md:px-8"><p className="text-xs uppercase tracking-widest text-muted">Портфолио · {w.year}</p><h2 className="mt-4 text-3xl font-medium">{w.title}</h2><dl className="mt-8 grid gap-4 border-t border-ink/10 pt-6 text-sm">{w.client && <div><dt className="text-muted">Заказчик</dt><dd className="mt-1">{w.client}</dd></div>}<div><dt className="text-muted">Местоположение</dt><dd className="mt-1">{w.location}</dd></div><div><dt className="text-muted">Направление</dt><dd className="mt-1">{({construction:"Строительство",repair:"Ремонт",finishing:"Отделочные работы",landscaping:"Благоустройство",engineering:"Инженерные сети",supply:"Поставка"} as const)[w.category]}</dd></div></dl><div className="mt-8"><PillButton href="/contacts">Обсудить похожий объект</PillButton></div></div></Panel></PageShell>}
