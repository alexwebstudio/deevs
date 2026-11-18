"use client";

import Link from "next/link";

/** Запасная 404 вне локалей (middleware обычно перенаправляет раньше). */
export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#16181B", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <Link href="/ru" style={{ color: "#89939e" }}>DEEVS → /ru</Link>
      </body>
    </html>
  );
}
