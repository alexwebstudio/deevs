import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { noindexMetadata } from "@/lib/seo";

/**
 * Статическая 404. Сюда middleware переписывает (со статусом 404) все адреса, которых нет на сайте.
 * Так 404 приходит полноценным HTML с шапкой, подвалом и метатегами в <head>:
 * notFound() в динамическом рендере Next 15.5 отдаёт пустую оболочку __next_error__.
 */
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.notFound" });
  return noindexMetadata(t("title"));
}

export default async function NotFoundPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NotFoundView />;
}
