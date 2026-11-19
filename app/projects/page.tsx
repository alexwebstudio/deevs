import { generateMetadata as localizedMetadata, default as LocalizedPage } from "../[locale]/projects/page";
import LocaleLayout from "../[locale]/layout";

const russianParams = Promise.resolve({ locale: "ru" });

export const generateMetadata = () => localizedMetadata({ params: russianParams });

export default function RussianProjectsPage() {
  return <LocaleLayout params={russianParams}><LocalizedPage params={russianParams} /></LocaleLayout>;
}
