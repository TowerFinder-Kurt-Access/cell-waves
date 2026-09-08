import { EMAIL, PHONE_ALT_HREF, PHONE_HREF, SERVICE_PAGES } from "@/lib/content"
import { HTML_LANG, stripLocale, type Locale } from "@/lib/i18n"

export const SITE = {
  name: "Cell Waves Canada",
  brandName: "CellWaves",
  url: "https://cell-waves.ca",
  locale: "en-CA",
  description:
    "Cell Waves Canada negotiates cell tower and rooftop leases for Canadian landlords. Maximize income from renewals, buyouts, and site upgrades.",
  keywords: [
    "cell tower lease",
    "cell tower lease negotiation",
    "cell tower lease consultant",
    "cell tower lease rates",
    "cell tower lease renewal",
    "cell tower lease buyout",
    "wireless lease buyout",
    "cell site lease",
    "rooftop lease",
    "small cell lease",
    "5G lease agreement",
    "tower site acquisition",
    "tower lease valuation",
    "tower lease attorney",
    "telecommunications lease consultant",
    "wireless tower lease",
    "cell tower landlord",
    "Canadian landlords",
  ],
  favicon: "/brand.webp",
  ogImage: "/OpenGraph.webp",
  ogImageWidth: 3456,
  ogImageHeight: 2168,
  phone: PHONE_HREF.replace("tel:", ""),
  altPhone: PHONE_ALT_HREF.replace("tel:", ""),
  email: EMAIL,
} as const

/** Resolve a path or absolute URL against the site base URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return new URL(path, SITE.url).toString()
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.name,
    alternateName: SITE.brandName,
    slogan: "Cell tower lease experts for Canadian landlords",
    url: SITE.url,
    logo: absoluteUrl(SITE.favicon),
    image: absoluteUrl(SITE.ogImage),
    email: SITE.email,
    telephone: SITE.phone,
    knowsAbout: [
      "cell tower lease negotiation",
      "wireless lease buyouts",
      "rooftop leases",
      "lease renewals and extensions",
      "telecommunications site leasing",
      "cell tower lease valuation",
      "5G lease agreements",
      "small cell leases",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cell tower lease consulting services",
      itemListElement: SERVICE_PAGES.en.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          url: absoluteUrl(s.href),
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "Country", name: "Canada" },
        },
      })),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "1539 Bradwell Avenue",
      addressLocality: "Saskatoon",
      addressRegion: "Saskatchewan",
      postalCode: "S7N 2K5",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.1454925,
      longitude: -106.595578,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      areaServed: "CA",
      availableLanguage: ["en", "fr"],
    },
    areaServed: { "@type": "Country", name: "Canada" },
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.locale,
    publisher: { "@id": `${SITE.url}/#organization` },
  }
}

interface WebPageSchemaArgs {
  title: string
  description: string
  url: string
  type?: "website" | "article"
  locale?: Locale
}

export function webPageSchema({ title, description, url, type = "website", locale = "en" }: WebPageSchemaArgs) {
  return {
    "@context": "https://schema.org",
    "@type": type === "article" ? "WebPage" : "WebPage",
    "@id": `${url}#webpage`,
    name: title,
    description,
    url,
    inLanguage: HTML_LANG[locale],
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    primaryImageOfPage: { "@id": `${SITE.url}/#og-image` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  }
}

export function ogImageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${SITE.url}/#og-image`,
    url: absoluteUrl(SITE.ogImage),
    width: SITE.ogImageWidth,
    height: SITE.ogImageHeight,
  }
}

const SECTION_LABELS: Record<Locale, Record<string, string>> = {
  en: { services: "Services", advice: "Advice", blog: "Blog" },
  fr: { services: "Services", advice: "Conseils", blog: "Blogue" },
}

/** Build a BreadcrumbList for a page path, e.g. /services/foo/ → Home > Services > Foo. */
export function breadcrumbSchema(pathname: string, pageTitle: string, locale: Locale = "en") {
  const segments = stripLocale(pathname).split("/").filter(Boolean)
  const crumbs: { position: number; name: string; item: string }[] = [
    { position: 1, name: locale === "fr" ? "Accueil" : "Home", item: SITE.url },
  ]
  let cursor: string = SITE.url

  for (const segment of segments) {
    cursor = `${cursor}/${segment}`
    crumbs.push({
      position: crumbs.length + 1,
      name: SECTION_LABELS[locale][segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      item: `${cursor}/`,
    })
  }

  if (crumbs.length > 1) {
    crumbs[crumbs.length - 1].name = pageTitle
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}${pathname}#breadcrumb`,
    itemListElement: crumbs.map(({ position, name, item }) => ({ "@type": "ListItem", position, name, item })),
  }
}

interface ServiceSchemaArgs {
  name: string
  description: string
  url: string
}

/** Service schema for a service page; provider points at the site Organization. */
export function serviceSchema({ name, description, url }: ServiceSchemaArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType: name,
    description,
    url,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Country", name: "Canada" },
    category: "Telecommunications real estate lease consulting",
  }
}

interface ArticleSchemaArgs {
  title: string
  description: string
  url: string
  datePublished: Date
  image?: string
}

export function blogPostingSchema({ title, description, url, datePublished, image }: ArticleSchemaArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    image: image ? [absoluteUrl(image)] : undefined,
    datePublished: datePublished.toISOString(),
    inLanguage: SITE.locale,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
  }
}

