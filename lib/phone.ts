/** Маска телефона Казахстана: хранение — 11 цифр «7XXXXXXXXXX», показ — «+7 (XXX) XXX-XX-XX». */

/** Полный номер: 7 + 10 цифр. */
export const isCompletePhone = (d: string) => /^7\d{10}$/.test(d);

/** Цифры номера без кода страны с учётом форматов «8 707…», «+7 707…», «7 707…» и «707…». */
const localPart = (raw: string) => {
  const d = raw.replace(/\D/g, "");
  if (d.length === 11 && /^[78]/.test(d)) return d.slice(1); // 8 707 123 45 67 / 7 707 123 45 67
  if (d.length === 1 && /^[78]$/.test(d)) return ""; // начали с 8 или 7 — это код страны
  return d.slice(0, 10); // 707 123 45 67 — номер без кода
};

export const digitsOf = (v: string) => {
  const local = localPart(v);
  return v.replace(/\D/g, "") ? `7${local}` : "";
};

export const formatPhone = (d: string) => {
  const p = d.slice(1);
  if (!d) return "";
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
};

/** Следующее значение по событию ввода: набор, вставка, удаление разделителей, «8 707…». */
export function nextPhone(prevDigits: string, inputValue: string) {
  let next: string;
  if (inputValue.startsWith("+7")) {
    let rest = inputValue.slice(2).replace(/\D/g, "");
    if (prevDigits.length <= 1 && rest.startsWith("8")) rest = rest.slice(1); // «+7» + набрали 8 по привычке
    if (rest.length === 11 && /^[78]/.test(rest)) rest = rest.slice(1); // вставили номер с кодом поверх «+7»
    next = rest ? `7${rest.slice(0, 10)}` : "7";
  } else {
    next = digitsOf(inputValue); // поле очищено/выделено целиком и вставлен номер
  }
  const prevShown = formatPhone(prevDigits);
  // стёрли разделитель («)», «-», пробел) — стираем и цифру перед ним
  if (inputValue.length < prevShown.length && next === prevDigits) return prevDigits.slice(0, -1);
  return next;
}
