import { NotFoundView } from "@/components/layout/NotFoundView";

/** Запасной вариант 404 внутри локали (основная — app/[locale]/page-404, см. middleware.ts). */
export default function NotFound() {
  return <NotFoundView />;
}
