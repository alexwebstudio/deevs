import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Panel } from "@/components/ui/Section";
import { Reveal } from "@/components/effects/Reveal";
import { Visual } from "@/components/ui/Visual";
import { PillButton } from "@/components/ui/PillButton";
import { works } from "@/data/works";
import { Link } from "@/i18n/navigation";
import { alternates } from "@/lib/seo";
type Props={params:Promise<{locale:string}>};
const category={construction:"Строительство",repair:"Ремонт",finishing:"Отделочные работы",landscaping:"Благоустройство",engineering:"Инженерные сети",supply:"Поставка"} as const;
export async function generateMetadata({params}:Props):Promise<Metadata>{const {locale}=await params;const t=await getTranslations({locale,namespace:"meta.projects"});return{title:t("title"),description:t("description"),alternates:alternates(locale,"/projects")}}
export default async function ProjectsPage({params}:Props){const {locale}=await params;setRequestLocale(locale);return <PageShell crumbs={[{label:"Объекты"}]} label="Портфолио" title="Промышленные и общественные объекты" lead="Примеры строительства, реконструкции и благоустройства из презентации ТОО Deevs.">
<Panel className="px-4 py-10 md:px-10 md:py-16"><Reveal className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{works.map(w=><li key={w.slug}><Link href={`/projects/${w.slug}`} className="group block h-full overflow-hidden rounded-[var(--radius-card)] bg-white p-2 shadow-[0_20px_50px_-30px_rgba(20,21,24,.22)] transition-transform duration-500 hover:-translate-y-1">{w.image?<div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-photo)]"><Visual visual={{kind:"photo",src:w.image,altKey:"common.photo",position:"50% 50%"}} sizes="(max-width:768px) 100vw, 33vw" className="grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"/><span className="glass absolute top-3 left-3 rounded-full px-3 py-1 text-xs">{w.year}</span></div>:<div className="grid aspect-[4/3] place-items-center rounded-[var(--radius-photo)] bg-dark px-8 text-center font-brand text-4xl text-white">DEEVS</div>}<div className="p-4"><p className="text-xs uppercase tracking-wider text-muted">{category[w.category]} · {w.year}</p><h2 className="mt-3 text-xl font-medium">{w.title}</h2><p className="mt-2 text-sm text-muted">{w.client ? `${w.client} · ` : ""}{w.location}</p><span className="mt-5 inline-flex text-sm font-medium">Подробнее ↗</span></div></Link></li>)}</Reveal></Panel>
<Panel className="flex flex-col items-start gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12"><p className="max-w-2xl text-lg">Для промышленной площадки нужен комплекс зданий и инженерных систем? Обсудим задачу.</p><PillButton href="/contacts">Связаться с нами</PillButton></Panel>
</PageShell>}
