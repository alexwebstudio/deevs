export type WorkCategory = "construction" | "repair" | "finishing" | "landscaping" | "engineering" | "supply";

export type Work = {
  slug: string;
  year?: string;
  client?: string;
  location?: string;
  locationKz?: string;
  title: string;
  titleKz: string;
  category: WorkCategory;
  image: string;
  gallery: string[];
};

const gallery = (slug: string, count: number) => Array.from(
  { length: count },
  (_, index) => `/images/portfolio/${slug}-${String(index + 1).padStart(2, "0")}.webp`,
);

/** Все подписанные проекты из актуальной презентации Deevs. Фото взяты только с соответствующих слайдов портфолио. */
const project = (data: Omit<Work, "image" | "gallery">, photoCount: number): Work => {
  const photos = gallery(data.slug, photoCount);
  return { ...data, image: photos[0], gallery: photos };
};

export const works: Work[] = [
  project({ slug: "dam-reservoir", title: "Текущий ремонт плотины водохранилища на реке Жартас", titleKz: "Жартас өзеніндегі су қоймасы бөгетін ағымдағы жөндеу", category: "repair", location: "Уланский район ВКО, 3,5 км южнее села Гагарино", locationKz: "ШҚО Ұлан ауданы, Гагарино ауылынан оңтүстікке қарай 3,5 км" }, 3),
  project({ slug: "traffic-calming", title: "Установка искусственных дорожных неровностей в Усть-Каменогорске", titleKz: "Өскемен көшелеріне жасанды жол кедергілерін орнату", category: "construction", location: "Усть-Каменогорск", locationKz: "Өскемен" }, 2),
  project({ slug: "column-base-reinforcement", title: "Усиление оснований металлических колонн в цехе шахты и концентратов НОФ АПК", titleKz: "НОФ АПК кеніш және концентраттар цехындағы металл бағаналар негіздерін күшейту", category: "repair", client: "ТОО «Востокцветмет»" }, 2),
  project({ slug: "bus-stops", year: "2016", title: "Изготовление и установка тёплых остановочных павильонов на улице Казахстан", titleKz: "Қазақстан көшесінде жылы аялдама павильондарын дайындау және орнату", category: "construction", client: "ГУ «Отдел ЖКХ, пассажирского транспорта и автомобильных дорог»", location: "Усть-Каменогорск", locationKz: "Өскемен" }, 3),
  project({ slug: "substation-roof", year: "2017", title: "Ремонт кровли подстанции ГПП 110/6 Артемьевского рудника", titleKz: "Артемьев кенішінің 110/6 бас төмендеткіш қосалқы станциясы шатырын жөндеу", category: "repair", client: "ТОО «Востокэнерго»", location: "Артемьевский рудник", locationKz: "Артемьев кенішінің аумағы" }, 3),
  project({ slug: "cold-water-pipeline", title: "Замена стального трубопровода ХПВ диаметром 219 мм, длиной 600 м по улице Фурманова", titleKz: "Фурманов көшесінде ұзындығы 600 м, диаметрі 219 мм ХПВ болат құбырын ауыстыру", category: "engineering", client: "ТОО «Востокэнерго»", location: "Улица Фурманова", locationKz: "Фурманов көшесі" }, 3),
  project({ slug: "heating-pipeline", title: "Частичная замена отопительного трубопровода D-150 мм протяжённостью 300 м", titleKz: "Ұзындығы 300 м, диаметрі 150 мм жылыту құбырын ішінара ауыстыру", category: "engineering", client: "ТОО «Востокэнерго»", location: "Промкотельная — промплощадка Иртышской шахты", locationKz: "Өнеркәсіптік қазандық — Ертіс кенішінің өндірістік алаңы" }, 3),
  project({ slug: "garage-structure-reinforcement", title: "Временное усиление аварийных строительных конструкций гаража", titleKz: "Автокөлік гаражының апатты құрылыс конструкцияларын уақытша күшейту", category: "repair", location: "Белоусовский транспортный участок", locationKz: "Белоусов көлік учаскесі" }, 3),
  project({ slug: "hostel-96", year: "2022", title: "Строительство общежития №5 на 96 человек", titleKz: "96 орындық №5 жатақхана құрылысы", category: "construction", client: "ТОО «Бакырчикское горнодобывающее предприятие»", location: "Посёлок Ауэзов", locationKz: "Әуезов кенті" }, 3),
  project({ slug: "paving-alelel", year: "2022", title: "Благоустройство АБК: устройство пешеходных дорожек из брусчатки", titleKz: "ӘБК аумағын абаттандыру: төсемтастан жаяу жүргіншілер жолдарын салу", category: "landscaping", client: "АО «ФИК Алел»" }, 3),
  project({ slug: "chemical-hangars-3-4", title: "Строительство ангаров №3 и №4 для хранения химических реагентов", titleKz: "Химиялық реагенттерді сақтауға арналған №3 және №4 ангарлардың құрылысы", category: "construction", client: "ТОО «Бакырчикское горнодобывающее предприятие»", location: "Посёлок Ауэзов", locationKz: "Әуезов кенті" }, 3),
  project({ slug: "bozshakol-mezzanine", title: "Строительство дополнительного мезонина в здании Центрального склада", titleKz: "Орталық қойма ғимаратында қосымша мезонин салу", category: "construction", client: "ТОО «KAZ Minerals Bozshakol»", location: "Месторождение Бозшаколь", locationKz: "Бозшакөл кен орны" }, 3),
  project({ slug: "floating-pump-station", year: "2024", title: "Строительство плавучей насосной станции оборотного водоснабжения", titleKz: "Айналым сумен жабдықтауға арналған жүзбелі сорғы станциясын салу", category: "construction", client: "ТОО «Бакырчикское горнодобывающее предприятие»", location: "Посёлок Ауэзов", locationKz: "Әуезов кенті" }, 1),
  project({ slug: "modular-hostel-220", year: "2024–2025", title: "Модульное общежитие на 220 человек с объектами инженерного обеспечения", titleKz: "Инженерлік инфрақұрылымы бар 220 орындық модульдік жатақхана", category: "construction", client: "АО «ФИК Алел»", location: "Месторождение Суздальское", locationKz: "Суздаль кен орны" }, 4),
  project({ slug: "destructor-ds-5000", year: "2023", title: "Площадка и здание ангарного типа под Деструктор ДС-5000", titleKz: "ДС-5000 деструкторына арналған алаң мен ангар типіндегі ғимарат", category: "construction", client: "АО «ФИК Алел»", location: "Месторождение Суздальское", locationKz: "Суздаль кен орны" }, 1),
  project({ slug: "checkpoint-module", title: "Изготовление и монтаж модульного КПП и отдельного поста охраны", titleKz: "Модульдік бақылау-өткізу пункті мен жеке күзет бекетін дайындау және монтаждау", category: "construction" }, 2),
  project({ slug: "checkpoint-garage", title: "Изготовление и монтаж модульного КПП с гаражом для служебного транспорта", titleKz: "Қызметтік көлікке арналған гаражы бар модульдік бақылау-өткізу пунктін дайындау және монтаждау", category: "construction" }, 2),
  project({ slug: "heat-point-parus", year: "2026", title: "Реконструкция зданий ЦТП «Парус», магистральной и внутриквартальной тепловой сети", titleKz: "«Парус» орталық жылу пунктінің ғимараттарын, магистральдық және орамішілік жылу желілерін қайта жаңарту", category: "engineering" }, 6),
  project({ slug: "ptec2-guard-posts", year: "2026", title: "Замена существующих постов охраны на блочно-модульные на ПТЭЦ-2", titleKz: "ПТЭЦ-2 нысанындағы қолданыстағы күзет бекеттерін блокты-модульдік бекеттерге ауыстыру", category: "construction", client: "АО «СЕВКАЗЭНЕРГО»" }, 4),
].sort((a, b) => {
  // Preserve slide order for undated projects; sort only where years are known.
  const latestYear = (work: Work) => Number(work.year?.match(/\d{4}/g)?.at(-1) ?? 0);
  return latestYear(b) - latestYear(a);
});

export const featuredWorks = ["modular-hostel-220", "floating-pump-station", "heat-point-parus", "ptec2-guard-posts"]
  .map((slug) => works.find((work) => work.slug === slug)!)
  .filter(Boolean)
  .sort((a, b) => {
    const latestYear = (work: Work) => Number(work.year?.match(/\d{4}/g)?.at(-1) ?? 0);
    return latestYear(b) - latestYear(a);
  });
export const localizedWorkTitle = (work: Work, locale: string) => locale === "kz" ? work.titleKz : work.title;
export const localizedWorkLocation = (work: Work, locale: string) => locale === "kz" ? work.locationKz : work.location;
