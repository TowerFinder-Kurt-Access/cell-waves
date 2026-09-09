import type { Localized } from "@/lib/i18n"

import dataEn from "@/i18n/locales/en/data.json"
import dataFr from "@/i18n/locales/fr/data.json"

// Structured content lives in the JSON locale catalogs (src/i18n/locales).
function localized<T>(key: "nav" | "footerUsefulLinks" | "footerServices" | "footerAbout" | "servicePages" | "advicePages" | "services" | "reasons" | "steps" | "leaseTopics" | "posts"): Localized<T> {
  return {
    en: (dataEn as Record<string, unknown>)[key] as T,
    fr: (dataFr as Record<string, unknown>)[key] as T,
  }
}

export const PHONE_DISPLAY = "1 -780-230-1364"
export const PHONE_HREF = "tel:+17802301364"
export const PHONE_ALT_DISPLAY = "1-587-882-8813"
export const PHONE_ALT_HREF = "tel:+15878828813"
export const EMAIL = "brett@cell-waves.ca"
export const SITE_NAME = "CellWaves"
export const LOCATION = "1539 Bradwell Avenue Saskatoon, Saskatchewan, Canada S7N2K5"
export const LOCATION_HREF = "https://maps.app.goo.gl/ycUu1uSz2Y89hNB87"

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export const NAV_ITEMS: Localized<NavItem[]> = localized("nav")

export const FOOTER_USEFUL_LINKS: Localized<NavItem[]> = localized("footerUsefulLinks")

export const FOOTER_SERVICES: Localized<NavItem[]> = localized("footerServices")

export interface ServicePage {
  title: string
  href: string
  description: string
  keywords?: string[]
}

export const SERVICE_PAGES: Localized<ServicePage[]> = localized("servicePages")

export const ADVICE_PAGES: Localized<ServicePage[]> = localized("advicePages")

export const FOOTER_ABOUT: Localized<string> = localized("footerAbout")

export interface Service {
  title: string
  description: string
  image: string
  alt: string
  href: string
  large?: boolean
}

export const SERVICES: Localized<Service[]> = localized("services")

export interface Reason {
  title: string
  body: string
}

export const REASONS: Localized<Reason[]> = localized("reasons")

export interface Step {
  title: string
  body: string
}

export const STEPS: Localized<Step[]> = localized("steps")

export interface Testimonial {
  title: string
  quote: string
  name: string
  location: string
  role?: string
  image: string
  alt: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    title: "We Felt Confident and Protected with Cell Waves",
    quote:
      "From my very first conversation with David Ralston, I immediately felt a sense of trust. We had been out of our depth reviewing the lease, with red flags we did not know how to fix. Once Cell Waves stepped in, our concerns quickly faded.",
    name: "Janet and Mark Ellison",
    location: "Quebec City, Quebec",
    image:
      "/images/testimonials/carousel/t1.jpg",
    alt: "Cell tower",
  },
  {
    title: "Substantially Improved Lease Offer with CellWaves",
    quote:
      "Larry Heuchert reviewed my documents, offered expert guidance at no cost, and leveraged their financial network to secure an offer significantly higher than the one from Rogers. I'm extremely satisfied.",
    name: "Brad Lawson",
    location: "Kelowna, B.C.",
    image:
      "/images/testimonials/carousel/t2.jpg",
    alt: "Cell tower",
  },
  {
    title: "Experienced Real Estate Investor Endorses CellWaves",
    quote:
      "Unlike legal services that bill by the hour, CellWaves' compensation was tied directly to the success of the new lease terms. A refreshing, results-oriented approach. I've already begun referring them.",
    name: "Francis Lemieux",
    location: "Trois-Rivières, Quebec",
    image:
      "/images/testimonials/carousel/t3.jpg",
    alt: "Cell tower",
  },
  {
    title: "Optimal Outcome for Our Condominium Association",
    quote:
      "CellWaves secured both higher compensation and more favorable terms than any other offer, with a shorter commitment period. Their commission structure, based on the value they deliver, aligned their goals with ours.",
    name: "Sam Riedman",
    location: "Condominium Board Chair",
    image:
      "/images/testimonials/carousel/t4.jpg",
    alt: "Cell tower",
  },
  {
    title: "Completed My Rogers Lease Buyout When Others Could Not",
    quote:
      "After a previous firm failed to close, CellWaves navigated the complexities, worked with my attorney, and secured a value higher than I had anticipated. Expert guidance and real results.",
    name: "Andy Wasylyshen",
    location: "Halifax, Nova Scotia",
    image:
      "/images/testimonials/carousel/t5.jpg",
    alt: "Cell tower",
  },
  {
    title: "Invaluable Expertise That Exceeded Expectations",
    quote:
      "CellWaves secured a rent increase even after the sale contract was in place, delivering an unexpected $85,000 in additional value. The proceeds let us refinance and renovate one of our hotels.",
    name: "Raj Patel",
    location: "Prince George, British Columbia",
    image:
      "/images/testimonials/carousel/t7.jpg",
    alt: "Cell tower",
  },
  {
    title: "I'm Now a Firm Believer in Cell Waves",
    quote:
      "Larry showed me the rent offered was far below what it should be, and secured a higher rate while removing clauses I was told were standard. I can't believe I assumed the tower rep had my interests at heart.",
    name: "James Landry",
    location: "Red Deer, Alberta",
    image:
      "/images/testimonials/carousel/t6.jpg",
    alt: "Cell tower",
  },
]

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
  alt: string
}

export const POSTS: Localized<Post[]> = localized("posts")

export const LEASE_TOPICS: Localized<{ title: string; body: string; href: string }[]> = localized("leaseTopics")

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1602823284936-463177448097?q=80&w=1920&auto=format&fit=crop"
export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop"
export interface PageTestimonial {
  title: string
  paragraphs: string[]
  name: string
  location: string
  image: string
}

export const PAGE_TESTIMONIALS: PageTestimonial[] = [
  {
    title: "We felt confident and protected with CellWaves",
    paragraphs: [
      "It's a pleasure to share our experience working with the team at CellWaves. From my very first conversation with David Ralston, I immediately felt a sense of trust and reassurance. Initially, we were completely out of our depth and unsure how to safely navigate the lease process, which made me hesitant to proceed. But once we began working with the CellWaves team, our concerns quickly faded. It became clear we were in capable hands.",
      "We had been approached by a local cell tower lease representative who assured us it was a simple process and offered a relatively modest monthly rent. My husband managed to negotiate a small increase, about $70 more per month, and we agreed to review the lease before making a final decision.",
      "However, once we received and started reviewing the lease, numerous red flags became apparent. This was clearly a highly technical and complex industry that we didn't fully understand. There were parts of the agreement that didn't sit right with me, but I had no way of knowing how they should be revised or what better alternatives might be. The legal language was dense and extended into unfamiliar territory, well beyond what we felt qualified to handle on our own.",
      "Thanks to CellWaves, we were able to move forward with clarity and confidence, knowing our interests were being looked after.",
    ],
    name: "Janet and Mark Ellison",
    location: "Quebec City, Quebec",
    image: "/images/testimonials/ellison.jpg",
  },
  {
    title: "Substantially improved lease offer with CellWaves",
    paragraphs: [
      "I was initially approached by Rogers with an offer to purchase my lease. While I was open to selling, I had specific conditions I wanted to include to safeguard both my interests and those of any future property buyers. Although I had already engaged an attorney to review their proposal, I was subsequently contacted by Brett from CellWaves. Then Larry Heuchert provided a thorough review of my documents, offered expert guidance at no cost, and leveraged their financial network to secure an offer that was significantly higher than the one from Rogers. They guided me through each step of the closing process and addressed all of my questions promptly and professionally. I'm extremely satisfied with their service and would highly recommend CellWaves to any wireless leaseholder seeking knowledgeable and trustworthy support.",
    ],
    name: "Brad Lawson",
    location: "Kelowna, B.C.",
    image: "/images/testimonials/lawson.jpg",
  },
  {
    title: "Experienced real estate investor endorses CellWaves for cell tower lease expertise",
    paragraphs: [
      "Thank you for your exceptional support in renegotiating our cell tower lease.",
      "As an active real estate investor and developer with over two decades of experience, I've managed multiple properties with cell tower land leases. While I routinely work with highly skilled real estate attorneys, I've found that most are well-versed in conventional lease negotiations but lack the specialized expertise and industry relationships required to effectively navigate cell tower agreements.",
      "My recent experience with CellWaves in renegotiating and extending a cell tower ground lease was outstanding. I was highly impressed not only with the favorable terms achieved but also with the straightforward, performance-based structure of our agreement. Unlike traditional legal services that bill by the hour regardless of results, CellWaves' compensation was directly tied to the success of the new lease terms, a refreshing and results-oriented approach.",
      "Thank you again for the excellent work. I've already begun referring CellWaves to fellow real estate professionals and legal contacts for their wireless lease needs.",
    ],
    name: "Francis Lemieux",
    location: "Trois-Rivières, Quebec",
    image: "/images/testimonials/lemieux.jpg",
  },
  {
    title: "CellWaves delivered the optimal outcome for our condominium association",
    paragraphs: [
      "CellWaves Wireless played a pivotal role in helping our condominium association secure the most competitive purchase offer for our Bell tower lease. While we had been approached by numerous companies in the past, CellWaves stood out by delivering both higher compensation and more favorable terms than any other offer we had received.",
      "As a homeowner's association, our decision-making process involved multiple stakeholders. Despite this complexity, CellWaves navigated the process smoothly, securing an offer that exceeded our expectations with a shorter commitment period. They provided us with a range of tailored options, allowing us to choose a solution aligned with our long-term objectives. Throughout the transaction, CellWaves worked closely with our attorney to ensure all issues were addressed and kept us well-informed from start to finish.",
      "We're extremely satisfied with the value they brought to our organization and the ease of the overall process. Their commission structure, based on the value they deliver, gave us confidence that their goals were fully aligned with ours. Thank you again for your outstanding support.",
    ],
    name: "Sam Riedman",
    location: "Condominium Board Chair",
    image: "/images/testimonials/riedman.jpg",
  },
  {
    title: "CellWaves Wireless successfully completed my Rogers lease buyout when others could not",
    paragraphs: [
      "I was referred to CellWaves Wireless to help monetize the Rogers lease on my hotel property after a previous firm in the industry was unable to bring the transaction to completion.",
      "The team at CellWaves skillfully navigated the complexities of the deal, collaborating effectively with my attorney to see the transaction through. Throughout the process, they took the time to educate me on both the industry and the steps involved, ultimately securing a value higher than I had anticipated.",
      "I highly recommend CellWaves Wireless to anyone seeking expert guidance and results in the wireless lease space.",
    ],
    name: "Andy Wasylyshen",
    location: "Halifax, Nova Scotia",
    image: "/images/testimonials/wasylyshen.jpg",
  },
  {
    title: "Invaluable expertise that exceeded expectations",
    paragraphs: [
      "We are extremely pleased with the outstanding support CellWaves provided in the sale of our Rogers and Bell leases.",
      "As owners of several hotels, we're well-versed in the hospitality industry, but negotiating optimal wireless lease agreements is a highly specialized area. CellWaves brought a level of expertise and advocacy that went well beyond what we could have achieved on our own. Their involvement proved far more beneficial than many property owners might realize. They ensured we received fair and favorable terms, both financially and legally, and protected our interests throughout the process.",
      "One standout moment was when CellWaves secured a rent increase on one of our leases even after the contract to sell was in place, delivering an unexpected $85,000 in additional value. They also navigated our unique challenges involving lenders, timing, and internal approvals with patience and professionalism.",
      "Thanks to CellWaves, we received an offer that significantly surpassed prior ones. Their attentiveness and persistence led to a successful closing after months of delays with other parties. The proceeds from the lease sale enabled us to refinance and invest in major renovations at one of our hotels.",
      "We look forward to continuing our relationship with CellWaves for all our wireless lease needs and strongly recommend them to any landlord considering a wireless lease transaction.",
    ],
    name: "Raj Patel",
    location: "Prince George, British Columbia",
    image: "/images/testimonials/patel.jpg",
  },
  {
    title: "A trusted advisor across our entire portfolio",
    paragraphs: [
      "As an investor in the self-storage sector, I've often encountered cell tower installations on our properties. In my role as lead asset manager for a portfolio of over 100 operating self-storage facilities, I oversaw numerous assets with existing cell tower agreements. Over the past few years, we were approached multiple times to renegotiate these agreements.",
      "One notable case involved a license agreement with Rogers Mobility that was set to expire in 2021. They contacted us to discuss an extension, and we engaged CellWaves Wireless to represent us in the negotiation for a property just outside of Sarnia. Their expertise was immediately evident. CellWaves secured terms that significantly exceeded Rogers's original offer. Even after factoring in their fee, the outcome provided us with more cash at signing and substantially improved long-term cash flow under the revised lease.",
      "Our experience with the CellWaves consultant was excellent. They were a strong and strategic negotiator, communicated clearly and efficiently, and remained responsive throughout the entire process. CellWaves went well beyond our expectations in both service and results.",
      "As we continue to pursue acquisitions of self-storage properties with cell tower assets, we are confident knowing we have a trusted advisor in CellWaves. We fully intend to use their services again and highly recommend them to any property owner navigating cell site lease negotiations.",
    ],
    name: "Brenda Flores",
    location: "Investment Strategist, Sarnia, Ontario",
    image: "/images/testimonials/flores.jpg",
  },
  {
    title: "Even with 32 years of legal experience, CellWaves was invaluable",
    paragraphs: [
      "We are extremely pleased with the sale price that CellWaves Wireless secured for our Telus and Bell lease. Their team collaborated seamlessly with the buyer, making the entire process smooth and efficient for everyone involved.",
      "As a practicing lawyer with over 30 years of experience, I'm well-versed in negotiating contracts. However, CellWaves brought specialized knowledge and insight that proved critical in successfully completing the transaction. Their expertise added real value that extended well beyond standard legal counsel.",
      "Thank you for your outstanding support. I would be glad to recommend CellWaves to others and look forward to future opportunities to work together.",
    ],
    name: "Ivan Mikaelson",
    location: "Practicing Family-Law Lawyer, Brandon, Manitoba",
    image: "/images/testimonials/mikaelson.jpg",
  },
  {
    title: "I'm now a firm believer in CellWaves",
    paragraphs: [
      "When I first spoke with Brett from CellWaves, I was highly skeptical. I didn't think there was anything more they could do for me than what I'd already secured on my own. After all, we'd been receiving consistent rent payments for over 25 years, and we were just about to sign a new 30-year lease extension with the tower company.",
      "Brett explained that it would cost me nothing to have a CellWaves expert review the new lease before I signed it. I was 99% sure it would lead nowhere. So you can imagine my surprise when I received a call from Larry Heuchert, who pointed out several significant issues with the agreement. He walked me through the long-term financial consequences of some of the clauses, terms I hadn't fully grasped, and explained how they could negatively impact me down the line. He also showed me how, based on the location, zoning, and market demand for my property, the rent I was being offered was far below what it should be. I was practically giving the site away.",
      "That conversation convinced me to bring CellWaves on board. The best part was that their fee was contingent on them improving my financial position beyond what I already had, so there was nothing to lose. Even so, I remained doubtful. But to my surprise, CellWaves secured a higher rent rate and uncovered additional financial benefits I had never considered. They also revised the lease to remove several unfavorable clauses that I had been told were standard but turned out to be completely negotiable. These changes not only increased my income but also protected the long-term value and transferability of my property.",
      "I'm now a firm believer in CellWaves. Their expertise and service were outstanding. Looking back, I can't believe I ever assumed the tower company's rep had my best interests at heart. I was very wrong. I highly recommend CellWaves to any property owner navigating this process.",
    ],
    name: "James Landry",
    location: "Red Deer, Alberta",
    image: "/images/testimonials/landry.jpg",
  },
  {
    title: "Trustworthy and ethical professionals at CellWaves",
    paragraphs: [
      "I've had a cell tower on my property for over 15 years. About two years before my lease was set to expire, I began receiving a flood of offers from various companies, all promising me great deals if I sold them my lease. As I engaged with several of these companies, it became clear that I was being significantly underpaid by the tower company leasing from me. I hired an attorney to better understand what a fair lease rate should be.",
      "After two years of confusion, delays, and being told repeatedly by the tower company that the tower wasn't worth more, my niece searched online for expert help and found Larry and Brett at CellWaves Canada. From the start, they educated both my lawyer and me on the intricacies of the tower lease industry. Though I was initially skeptical because they seemed too good to be true, I quickly realized that working with CellWaves was the best decision I could have made.",
      "They were always available, day or night, to answer questions thoroughly and patiently. I found them to be honest, empathetic, and deeply knowledgeable. They gave me the confidence to pursue a better deal by showing me the true market value of my tower site and explaining the tactics often used by tower companies.",
      "With Larry's guidance, I was able to secure an offer that was 45% higher than the so-called maximum the tower company originally claimed they could pay. I'm sincerely grateful for their dedication and advocacy. Even though the final buyer paid substantially more than anticipated, CellWaves honored the original fee structure we had agreed upon. Their integrity truly impressed me.",
      "I can say with complete confidence that CellWaves acts in the best interests of their clients. I strongly recommend them to anyone facing the complexities of tower lease negotiations.",
    ],
    name: "Mary J. Gilbert",
    location: "Cell Tower Landowner",
    image: "/images/testimonials/gilbert.webp",
  },
]
export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  alt: string
}

export const TEAM: TeamMember[] = [
  {
    name: "Larry Heuchert",
    role: "President",
    bio: "With extensive insider expertise in the wireless and cell tower industry since 1987, Larry has successfully negotiated over 2,500 wireless leases with major carriers across the U.S. and Canada. Bringing more than 30 years of corporate finance and consulting experience with both public and private companies, Larry has spent the past decade exclusively representing private property owners with existing or prospective cell sites. He has worked with hundreds of clients in the U.S. and Canada, advocating for fair lease terms, increased rental income, and lease buyouts. Leveraging his deep industry knowledge and strong relationships, Larry specializes in contract negotiations, resolving complex issues, and presenting strategic options to maximize his clients' benefits and financial return.",
    image: "/images/team/larry-heuchert.jpg",
    alt: "Portrait of Larry Heuchert",
  },
  {
    name: "Tamara Heuchert",
    role: "Vice President, Marketing Director and Administrative Support",
    bio: "Tamara brings over 30 years of well-rounded expertise in accounting, real estate, and telecommunications. She gained extensive telecommunications experience by developing and leasing hundreds of cell sites for leading U.S. wireless carriers. Since joining Boost Financial Telecom, LLC, Tamara has helped enhance lease value and secure more favorable terms for hundreds of property owners across North America. In addition to lease negotiations, she specializes in lease buyouts and marketing properties to major cellular carriers and tower companies.",
    image: "/images/team/tamara-heuchert.jpg",
    alt: "Portrait of Tamara Heuchert",
  },
  {
    name: "Brett Heuchert",
    role: "Marketing and Operations Manager",
    bio: "The newest member of CellWaves, Brett adds a well-rounded history of real estate negotiations, marketing, and technical operations. In a span of a few short years, Brett has assisted with the development of hundreds of cell tower lease and lump-sum buyouts for the top Canadian and U.S. wireless carriers. During his time with CellWaves, Brett has played a significant role in enhancing contract terms for our clients, making him a welcomed addition to our growing team.",
    image: "/images/team/brett-heuchert.jpg",
    alt: "Portrait of Brett Heuchert",
  },
]
