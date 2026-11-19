import { generateMetadata as localizedMetadata, default as LocalizedPage } from "../../[locale]/projects/[slug]/page";
import LocaleLayout from "../../[locale]/layout";

type Params = Promise<{ slug: string }>;
const russianParams = (params: Params) => params.then(({ slug }) => ({ locale: "ru", slug }));

export async function generateMetadata({ params }: { params: Params }) {
  return localizedMetadata({ params: russianParams(params) });
}

export default async function RussianProjectPage({ params }: { params: Params }) {
  const localized = russianParams(params);
  return <LocaleLayout params={Promise.resolve({ locale: "ru" })}><LocalizedPage params={localized} /></LocaleLayout>;
}
