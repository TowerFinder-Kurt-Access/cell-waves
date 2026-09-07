import { EMAIL, PHONE_ALT_HREF, PHONE_HREF } from "@/lib/content"

export const SITE = {
  name: "Cell Waves Canada",
  brandName: "CellWaves",
  url: "https://cell-waves.ca",
  locale: "en-CA",
  description:
    "Cell Waves Canada: expert cell tower lease negotiation for Canadian landlords. Maximize your lease renewals and buyouts.",
  keywords: [
    "cell tower lease",
    "cell tower lease negotiation",
    "cell tower lease consultant",
    "wireless lease buyout",
    "cell site lease",
    "rooftop lease",
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
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.name,
    alternateName: SITE.brandName,
    url: SITE.url,
    logo: absoluteUrl(SITE.favicon),
    image: absoluteUrl(SITE.ogImage),
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1539 Bradwell Avenue",
      addressLocality: "Saskatoon",
      addressRegion: "Saskatchewan",
      postalCode: "S7N 2K5",
      addressCountry: "CA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      areaServed: "CA",
      availableLanguage: "en",
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
}

export function webPageSchema({ title, description, url, type = "website" }: WebPageSchemaArgs) {
  return {
    "@context": "https://schema.org",
    "@type": type === "article" ? "WebPage" : "WebPage",
    "@id": `${url}#webpage`,
    name: title,
    description,
    url,
    inLanguage: SITE.locale,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    primaryImageOfPage: { "@id": `${SITE.url}/#og-image` },
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

interface ArticleSchemaArgs {
  title: string
  description: string
  url: string
  datePublished: Date
  image?: string
}

export function articleSchema({ title, description, url, datePublished, image }: ArticleSchemaArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
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

