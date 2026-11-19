import { generateMetadata as generateLocalizedMetadata, default as LocalizedPrivacyPage } from "../[locale]/privacy/page";
import LocaleLayout from "../[locale]/layout";

const russianParams = Promise.resolve({ locale: "ru" });

/** Public default-locale URL. Keep it explicit so /privacy remains available without /ru. */
export const generateMetadata = () => generateLocalizedMetadata({ params: russianParams });

export default function RussianPrivacyRoute() {
  return (
    <LocaleLayout params={russianParams}>
      <LocalizedPrivacyPage params={russianParams} />
    </LocaleLayout>
  );
}
