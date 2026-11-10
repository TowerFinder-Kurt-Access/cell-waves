import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { ADVICE_PAGES, EMAIL, LOCATION, PHONE_DISPLAY, SERVICE_PAGES, TEAM } from "@/lib/content"
import { SITE, absoluteUrl } from "@/lib/seo"

// Generated index for language models, per https://llmstxt.org. Built from the
// same catalogs the pages use, so a new page cannot drift out of this file.
export const prerender = true

function section(title: string, entries: { title: string; href: string; description: string }[]): string {
  const lines = entries.map((e) => `- [${e.title}](${absoluteUrl(e.href)}): ${e.description}`)
  return `## ${title}\n\n${lines.join("\n")}\n`
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  )

  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "Cell Waves Canada advises Canadian property owners who lease land or rooftop space to wireless carriers. The work covers lease agreements, renewals and extensions, rent negotiation, rooftop leases, and lump-sum buyouts. Clients are landlords, not carriers.",
    "",
    "Key facts:",
    "",
    `- Location: ${LOCATION}`,
    `- Phone: ${PHONE_DISPLAY}`,
    `- Email: ${EMAIL}`,
    "- Area served: Canada",
    "- Languages: English, Canadian French",
    `- Site: ${SITE.url}`,
    "",
    section("Services", SERVICE_PAGES.en),
    section("Advice guides", ADVICE_PAGES.en),
    section(
      "Articles",
      posts.map((post) => ({
        title: post.data.title,
        href: `/blog/${post.id}/`,
        description: post.data.description,
      })),
    ),
    "## Company",
    "",
    `- [About us](${absoluteUrl("/about-us/")}): Team, experience, and how the firm works with landlords.`,
    `- [Why select us](${absoluteUrl("/why-select-us/")}): What separates this firm from a carrier-side agent.`,
    `- [Testimonials](${absoluteUrl("/testimonials/")}): Landlord accounts of past negotiations.`,
    `- [Contact](${absoluteUrl("/#contact")}): Free lease review request.`,
    "",
    ...TEAM.map((member) => `- ${member.name}, ${member.role}`),
    "",
    section("Version francaise", [
      ...SERVICE_PAGES.fr,
      ...ADVICE_PAGES.fr,
    ]),
    "## Optional",
    "",
    `- [Sitemap](${absoluteUrl("/sitemap-index.xml")}): Every indexable page, both locales.`,
    `- [Privacy policy](${absoluteUrl("/privacy-policy/")})`,
    `- [Terms and conditions](${absoluteUrl("/terms-and-conditions/")})`,
    "",
  ].join("\n")

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
