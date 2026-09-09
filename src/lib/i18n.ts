export type Locale = "en" | "fr"

export const LOCALES: readonly Locale[] = ["en", "fr"] as const

/** Values for `html lang` / `og:locale`. */
export const HTML_LANG: Record<Locale, string> = { en: "en-CA", fr: "fr-CA" }

/** A value translated into every locale. */
export type Localized<T> = { en: T; fr: T }

export function localeFromPath(pathname: string): Locale {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en"
}

/** Drop the locale prefix: `/fr/foo` → `/foo`, `/fr` → `/`. */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/fr(?=\/|$)/, "")
  return stripped === "" ? "/" : stripped
}

/**
 * Point a site-relative EN href at the given locale.
 * Anchors (`#x`), absolute URLs, and tel:/mailto: pass through untouched.
 */
export function localizePath(locale: Locale, href: string): string {
  if (locale === "en" || !href.startsWith("/") || href.startsWith("//")) return href
  if (href === "/fr" || href.startsWith("/fr/")) return href
  return href === "/" ? "/fr" : `/fr${href}`
}
