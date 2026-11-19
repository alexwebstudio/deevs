import { generateMetadata as localizedMetadata, default as LocalizedPage } from "../[locale]/about/page";
import LocaleLayout from "../[locale]/layout";

const russianParams = Promise.resolve({ locale: "ru" });

export const generateMetadata = () => localizedMetadata({ params: russianParams });

export default function RussianAboutPage() {
  return <LocaleLayout params={russianParams}><LocalizedPage params={russianParams} /></LocaleLayout>;
}
