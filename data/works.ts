export type WorkCategory = "construction" | "repair" | "finishing" | "landscaping" | "engineering" | "supply";

export type Work = {
  slug: string;
  year: string;
  client?: string;
  location: string;
  title: string;
  category: WorkCategory;
  image?: string;
};

/** Работы, которые прямо названы в предоставленном задании и презентации. */
export const works: Work[] = [
  { slug: "modular-hostel-220", year: "2024–2025", client: "АО «ФИК Алел»", location: "Месторождение Суздальское", title: "Модульное общежитие под ключ на 220 человек с объектами инженерного обеспечения", category: "construction", image: "/images/projects/work-dormitory.jpg" },
  { slug: "floating-pump-station", year: "2025", client: "ТОО «Бакырчикское ГОП»", location: "п. Ауэзов", title: "Плавучая насосная станция оборотного водоснабжения", category: "construction", image: "/images/projects/work-pump-station.jpg" },
  { slug: "destructor-ds-5000", year: "2023", client: "АО «ФИК Алел»", location: "Месторождение Суздальское", title: "Площадка и здание ангарного типа под Деструктор ДС-5000", category: "construction", image: "/images/projects/work-destructor-hangar.jpg" },
  { slug: "bozshakol-mezzanine", year: "2023–2024", client: "ТОО «KAZ Minerals Bozshakol»", location: "Месторождение Бозшаколь", title: "Дополнительный мезонин в здании Центрального склада", category: "construction", image: "/images/projects/work-mezzanine.jpg" },
  { slug: "vko-hospice", year: "2018–2019", client: "ВКО Хоспис", location: "Усть-Каменогорск", title: "Реконструкция административно-производственного здания под учреждение «ВКО Хоспис»", category: "construction" },
  { slug: "hostel-96", year: "2022", client: "ТОО «Бакырчикское ГОП»", location: "п. Ауэзов", title: "Общежитие №5 на 96 человек", category: "construction" },
  { slug: "chemical-hangars-3-4", year: "2021", client: "ТОО «Бакырчикское ГОП»", location: "п. Ауэзов", title: "Ангары для хранения химреагентов №3 и №4", category: "construction", image: "/images/projects/work-hangar.jpg" },
  { slug: "maisky-hangar", year: "2023", client: "АО «АК Алтыналмас»", location: "Участок ГРР Майский", title: "Бескаркасный арочный ангар", category: "construction", image: "/images/projects/work-hangar.jpg" },
  { slug: "shulbinsk-sport-complex", year: "2022", location: "п. Шульбинск", title: "Многофункциональный спорткомплекс на базе воздухоопорного сооружения", category: "construction" },
  { slug: "bus-stops", year: "2016", client: "ГУ «Отдел ЖКХ, пассажирского транспорта и автомобильных дорог»", location: "Усть-Каменогорск", title: "Изготовление и установка тёплых остановочных павильонов по ул. Казахстан", category: "construction" },
  { slug: "guard-posts", year: "2015", client: "РГУ «Главное управление расквартирования войск Вооружённых сил РК»", location: "Казахстан", title: "Изготовление и установка караульных вышек", category: "construction" },
  { slug: "vostokenergo-roof", year: "2017", client: "ТОО «Востокэнерго»", location: "Усть-Таловский энергоцех", title: "Ремонт кровли подстанции ГПП 110/6 Артемьевского рудника", category: "repair" },
  { slug: "housing-modernization", year: "2014–2015", client: "ТОО «Жилищно-эксплуатационное управление Восточно-Казахстанской области»", location: "г. Риддер", title: "Ремонт кровли, фасада, подъездов и электрических инженерных сетей в рамках программы модернизации ЖКХ", category: "repair" },
  { slug: "paving-alelel", year: "2022", client: "АО «ФИК Алел»", location: "Участок Суздаль, 80 км от г. Семей", title: "Устройство пешеходных дорожек из брусчатки", category: "landscaping", image: "/images/projects/work-paving.jpg" },
  { slug: "bakyrchik-yard", year: "2021", client: "ТОО «Бакырчикское ГОП»", location: "п. Ауэзов", title: "Благоустройство территории: пешеходные зоны и автопроезды вахтового посёлка", category: "landscaping" },
];

export const featuredWorks = works.slice(0, 4);
