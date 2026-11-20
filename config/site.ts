/** Название бренда — меняется здесь одной константой. Тексты меню — messages/*.json → nav. */
export const BRAND = "DEEVS";

export const site = {
  brand: BRAND,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://deevs.kz",
  phone: "+7 777 993 3999",
  phoneHref: "tel:+77779933999",
  whatsapp: "https://wa.me/77779933999",
  email: "too_deevs1@mail.ru",
  developer: { name: "AlexWebStudio", url: "https://alexwebstudio.ru" },
} as const;

/** пункты меню: путь без локали + ключ в messages.nav */
export const nav = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/contacts", key: "contacts" },
] as const;
