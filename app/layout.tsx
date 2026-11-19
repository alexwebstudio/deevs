import type { ReactNode } from "react";
import "./globals.css";

/** Корневой layout — проход насквозь: <html> рендерит app/[locale]/layout.tsx (свой lang для каждой локали). */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
