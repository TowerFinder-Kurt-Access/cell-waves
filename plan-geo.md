# GEO plan — visibility in AI answer engines

Source: follow-up to `plan.md` (Search Console index coverage). 2026-11-10.
Scope: make the site easier for ChatGPT, Claude, Perplexity, Gemini, and Copilot to crawl, quote, and cite.

GEO means generative engine optimization. The work is split in two:

- **Machine side.** Make the crawlers welcome and hand them a clean index. No editorial input needed.
- **Content side.** Give an extractor a sentence it can quote. Needs your approval per page.

## Shipped 2026-11-10

| Item | Where | Why |
|---|---|---|
| Named AI crawler groups in robots.txt | `public/robots.txt` | 16 user agents get explicit `Allow: /`. A future wildcard edit cannot silently drop the site from AI answers. |
| `llms.txt` markdown index | `src/pages/llms.txt.ts` | Generated at build from the same catalogs the pages use: 7 services, 7 advice guides, 11 articles, company links, 14 French pages, key facts. Cannot drift. |
| `sameAs` entity links | `src/lib/seo.ts` | Ties the Organization node to the LinkedIn and Facebook profiles, so answer engines resolve one company, not three. |
| `Person` nodes for the team | `src/lib/seo.ts`, both about pages | Three named people with `jobTitle`, `image`, and `worksFor`. Answer engines weigh named expertise. |

Verification on `dist/client`:

- `llms.txt` present, 82 lines, both locales, every link on `https://www.cell-waves.ca`.
- `robots.txt` lists 16 AI agents, keeps `Allow: /`, and points at `llms.txt`.
- `about-us` carries 3 `Person` nodes and 1 `sameAs` pair.
- `bun run build` passes. `bun run typecheck` reports 0 errors.

## Content side — needs your call

Answer engines quote short, self-contained statements. Each item below is one page edit.

1. **Answer-first opening.** Add one sentence under 40 words at the top of each advice and service page that answers the title question, then the existing intro. Example for `cell-phone-tower-lease-rates`: "Canadian cell tower leases typically pay $1,500 to $3,000 per month, depending on site type, tenancy length, and carrier demand."
2. **Numbers and years.** Each rate claim carries a figure and a year. Extractors prefer a dated number over an adjective.
3. **Definition lines.** One sentence per key term: "A cell tower lease is a contract that lets a wireless carrier place equipment on your land in exchange for rent."
4. **Visible dates.** Add `updatedDate` to the blog collection, render it on the article, and emit `dateModified` in `BlogPosting`. No post has a revised date today, so nothing renders yet.
5. **Named authors.** Point `BlogPosting.author` at the matching `Person` node instead of the Organization. Needs one decision: which team member owns which post.
6. **Comparison table.** Rooftop versus macro site versus small cell: typical rent, term, access rights, escalation. One table answers several questions at once.
7. **Question headings.** Rewrite advice section headings as the question a landlord would type, then answer in the first sentence under it. No FAQ schema needed; the markup adds nothing.

## Machine side — later

- Add `Article` schema to the seven advice guides. They carry `WebPage` today and no dates.
- `llms-full.txt` with the full text of every advice guide, if a vendor starts reading it.
- One `Person` `@id` per person, shared across locales. Today the id is scoped to the about page.

## How to check progress

- Ask each engine the same five questions monthly and log whether the site is cited. Questions: Canadian cell tower lease rates, cell tower lease buyout, rooftop lease negotiation, cell tower lease renewal, cell tower lease consultant cost.
- In Vercel logs, filter for the AI agents named in `robots.txt` and confirm they fetch pages, not just `robots.txt`.
- Search Console cannot report AI answers. Treat the manual prompt log as the measurement.

## Not in this plan

- `FAQPage` schema. Rich results are limited to government and health sites, so it changes nothing. Question-shaped headings deliver the extraction benefit without it.
- Keyword-stuffed "AI SEO" copy, or an `llms.txt` padded with every blog archive. Both reduce trust and both are easy to detect.
