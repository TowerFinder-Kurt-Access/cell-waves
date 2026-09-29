export type Locale = "en" | "fr"

export const LOCALES: readonly Locale[] = ["en", "fr"] as const

/** Values for `html lang` / `og:locale`. */
export const HTML_LANG: Record<Locale, string> = { en: "en-CA", fr: "fr-CA" }

// One mark per locale, so a switch can never show the same flag for both.
// Neither has a dependable flag emoji: Canada is an emoji but renders
// differently per platform, and the Quebec sequence (CA-QC) is not RGI so
// almost nothing supports it. Both ship as self-hosted public-domain SVGs
// instead, each at its own true ratio: Canada 2:1, Quebec 3:2.
export interface LocaleMark {
  src: string;
  width: string;
}

export const LOCALE_MARKS: Record<Locale, LocaleMark> = {
  // Both at a 20px height, each keeping its true ratio: Canada 2:1 (40px wide),
  // Quebec 3:2 (30px). Matching the height instead of the width leaves the
  // fleurdelise too small to read next to the maple leaf.
  en: { src: "/flags/canada.webp", width: "w-10" },
  fr: { src: "/flags/quebec.webp", width: "w-[30px]" },
}

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
