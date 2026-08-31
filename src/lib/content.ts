export const PHONE_DISPLAY = "1-780-613-0226"
export const PHONE_HREF = "tel:+17806130226"
export const PHONE_ALT_DISPLAY = "1-587-882-8813"
export const EMAIL = "brett@cell-waves.ca"
export const SITE_NAME = "CellWaves"
export const LOCATION = "1539 Bradwell Avenue Saskatoon, Saskatchewan, Canada S7N2K5"
export const LOCATION_HREF = "https://maps.app.goo.gl/ycUu1uSz2Y89hNB87"

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Homepage", href: "/" },
  {
    label: "About",
    href: "/#about",
    children: [
      { label: "About Cell Waves", href: "/#about" },
      { label: "Why select us", href: "/#why" },
      { label: "Testimonials", href: "/#testimonials" },
    ],
  },
  {
    label: "Our Services",
    href: "/#services",
    children: [
      { label: "Cell Tower Lease Agreements", href: "/#services" },
      { label: "Lease Renewals and Extensions", href: "/#services" },
      { label: "Negotiating Cell Tower Leases", href: "/#services" },
      { label: "Rooftop Leases", href: "/#services" },
      { label: "Wireless Lease Buyout Available", href: "/#services" },
      { label: "Consultant Services Cost", href: "/#contact" },
      { label: "Hiring a Cell Tower Lease Consultant", href: "/#why" },
    ],
  },
  {
    label: "Our Advice",
    href: "/blog",
    children: [
      { label: "Cell Phone Tower Lease Rates", href: "/blog" },
      {
        label: "What Is My Wireless Lease Worth?",
        href: "/blog/how-much-is-my-cell-tower-lease-worth-understanding-lease-valuation",
      },
      { label: "Mergers and Technology Risks to Revenue", href: "/blog" },
      {
        label: "Market Value Of Your Rent",
        href: "/blog/how-much-is-my-cell-tower-lease-worth-understanding-lease-valuation",
      },
      { label: "Should I Consent to Upgrade Requests?", href: "/blog" },
      { label: "Tenant Requests to Renew My Lease", href: "/blog" },
      { label: "Cell Tower Attorney", href: "/blog" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/#contact" },
]

export const FOOTER_USEFUL_LINKS: NavItem[] = [
  { label: "About Us", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Why Select Us", href: "/#why" },
  { label: "Our Advice", href: "/blog" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/#contact" },
]

export const FOOTER_SERVICES: NavItem[] = [
  { label: "Cell Tower Lease Agreements", href: "/#services" },
  { label: "Lease Renewals and Extensions", href: "/#services" },
  { label: "Negotiating Cell Tower Leases", href: "/#services" },
  { label: "Rooftop Leases", href: "/#services" },
  { label: "Wireless Lease Buyout", href: "/#services" },
  { label: "Hiring a Lease Consultant", href: "/#why" },
]

export const FOOTER_ABOUT =
  "The CellWaves' leadership group brings more than 35 combined years of expertise in all facets of Cell Tower site leasing, development, wireless engineering, lump-sum lease buyouts, and cell tower construction."

export interface Service {
  title: string
  description: string
  image: string
  alt: string
  href: string
  large?: boolean
}

export const SERVICES: Service[] = [
  {
    title: "New cell tower leases",
    description:
      "We help property owners secure better deals for existing towers on their land. While we don't broker new deals with new clients, our expertise ensures you receive maximum value for lease renewals on existing towers.",
    image:
      "https://images.unsplash.com/photo-1602823284936-463177448097?q=80&w=1600&auto=format&fit=crop",
    alt: "Metal cell tower under a blue sky",
    href: "/#services",
    large: true,
  },
  {
    title: "Existing cell tower leases",
    description:
      "Many telecom companies place antennas on rooftops under agreements lasting decades. As these 30-year leases near expiration, we renegotiate for higher payouts for the continued use of your space.",
    image:
      "https://images.unsplash.com/photo-1557174360-3f4f7c724501?q=80&w=1200&auto=format&fit=crop",
    alt: "Red and grey rooftop cell site",
    href: "/#services",
  },
  {
    title: "Cell tower lease buyouts",
    description:
      "Considering selling your lease income stream? We negotiate buyout agreements so you receive a lump sum that reflects the true long-term leasing value of your property.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    alt: "Two people shaking hands over a signed agreement",
    href: "/#services",
  },
]

export interface Reason {
  title: string
  body: string
}

export const REASONS: Reason[] = [
  {
    title: "Proven Success",
    body: "With a deep understanding of the telecom industry and market rates, we've helped property owners achieve significant income increases. We know how to navigate the industry's complexities and advocate for your best interests.",
  },
  {
    title: "Tailored Negotiation Strategies",
    body: "Every property is unique, and so is every lease. We assess your situation, evaluate your property's market value, and craft a personalized strategy to secure the best possible deal.",
  },
  {
    title: "No New Deals, Only Renewals",
    body: "Unlike brokers chasing new clients, our niche expertise is dedicated exclusively to lease renewals. This specialized focus gives you an edge in negotiations.",
  },
  {
    title: "Hassle-Free Process",
    body: "We handle the complex negotiations, industry jargon, and paperwork, so you don't have to. From start to finish, we're by your side.",
  },
]

export interface Step {
  title: string
  body: string
}

export const STEPS: Step[] = [
  {
    title: "Initial Assessment",
    body: "We evaluate your property's market potential when you share your lease details. This step is simple and obligation-free, and identifies opportunities to increase the value of your lease.",
  },
  {
    title: "Negotiation",
    body: "Our team engages with the telecom company on your behalf, leveraging our expertise to secure a better deal. We handle the heavy lifting so your lease reflects your property's true value.",
  },
  {
    title: "Maximized Earnings",
    body: "Once negotiations are complete, you enjoy the benefits of a significantly improved lease agreement or buyout. More income, greater security, and a long-term advantage.",
  },
]

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
      "https://cell-waves.ca/wp-content/uploads/elementor/thumbs/cell-tower-5207588_1280-1-r6g9lrd1mryvyji4z5iiiuenessocbkswr27agxsw8.jpg",
    alt: "Cell tower",
  },
  {
    title: "Substantially Improved Lease Offer with CellWaves",
    quote:
      "Larry Heuchert reviewed my documents, offered expert guidance at no cost, and leveraged their financial network to secure an offer significantly higher than the one from Rogers. I'm extremely satisfied.",
    name: "Brad Lawson",
    location: "Kelowna, B.C.",
    image:
      "https://cell-waves.ca/wp-content/uploads/elementor/thumbs/monte-brione-357576_1280-r6g9lrd1mryvyji4z5iiiuenessocbkswr27agxsw8.jpg",
    alt: "Cell tower",
  },
  {
    title: "Experienced Real Estate Investor Endorses CellWaves",
    quote:
      "Unlike legal services that bill by the hour, CellWaves' compensation was tied directly to the success of the new lease terms. A refreshing, results-oriented approach. I've already begun referring them.",
    name: "Francis Lemieux",
    location: "Trois-Rivières, Quebec",
    image:
      "https://cell-waves.ca/wp-content/uploads/elementor/thumbs/pexels-cloudett-20034963-r6g9lphd93wbbbkva4p9duvq811xwxdc8hr8bx0l8o.jpg",
    alt: "Cell tower",
  },
  {
    title: "Optimal Outcome for Our Condominium Association",
    quote:
      "CellWaves secured both higher compensation and more favorable terms than any other offer, with a shorter commitment period. Their commission structure, based on the value they deliver, aligned their goals with ours.",
    name: "Sam Riedman",
    location: "Condominium Board Chair",
    image:
      "https://cell-waves.ca/wp-content/uploads/elementor/thumbs/signal-mountain-cell-tower-3847257_1280-r6g9lrd1mryvyji4z5iiiuenessocbkswr27agxsw8.jpg",
    alt: "Cell tower",
  },
  {
    title: "Completed My Rogers Lease Buyout When Others Could Not",
    quote:
      "After a previous firm failed to close, CellWaves navigated the complexities, worked with my attorney, and secured a value higher than I had anticipated. Expert guidance and real results.",
    name: "Andy Wasylyshen",
    location: "Halifax, Nova Scotia",
    image:
      "https://cell-waves.ca/wp-content/uploads/elementor/thumbs/th-1-r6g9lrd1mryvyji4z5iiiuenessocbkswr27agxsw8.jpg",
    alt: "Cell tower",
  },
  {
    title: "Invaluable Expertise That Exceeded Expectations",
    quote:
      "CellWaves secured a rent increase even after the sale contract was in place, delivering an unexpected $85,000 in additional value. The proceeds let us refinance and renovate one of our hotels.",
    name: "Raj Patel",
    location: "Prince George, British Columbia",
    image:
      "https://cell-waves.ca/wp-content/uploads/elementor/thumbs/telecommunication-towers-6000558_1280-r6g9lrd1mryvyji4z5iiiuenessocbkswr27agxsw8.jpg",
    alt: "Cell tower",
  },
  {
    title: "I'm Now a Firm Believer in Cell Waves",
    quote:
      "Larry showed me the rent offered was far below what it should be, and secured a higher rate while removing clauses I was told were standard. I can't believe I assumed the tower rep had my interests at heart.",
    name: "James Landry",
    location: "Red Deer, Alberta",
    image:
      "https://cell-waves.ca/wp-content/uploads/elementor/thumbs/pexels-danielsulfit-9131870-1-r6g9lsavtm06a5grtnx53c6406o1k0oj8vporqweq0.jpg",
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

export const POSTS: Post[] = [
  {
    slug: "how-to-find-the-best-land-for-cell-tower-companies-looking-for-land",
    title: "How To Find The Best Land For Cell Tower Companies Looking For Land",
    excerpt:
      "Looking for a smart way to generate passive income from your land? Leasing to cell tower companies could be the perfect solution.",
    date: "March 15, 2025",
    image:
      "https://cell-waves.ca/wp-content/uploads/2025/05/telecommunications-tower-6609433_1920.jpg",
    alt: "Telecommunications tower",
  },
  {
    slug: "the-blurbs-of-wireless-towers-why-hiring-a-cell-tower-lease-consultant-is-beneficial-for-landowners",
    title: "Why Hiring a Cell Tower Lease Consultant is Beneficial for Landowners",
    excerpt:
      "Caught off guard by a cell tower lease offer? It feels like a golden opportunity, but the details decide whether it really is.",
    date: "March 6, 2025",
    image:
      "https://cell-waves.ca/wp-content/uploads/2025/05/antenna-498438_1280.jpg",
    alt: "Cell tower antenna",
  },
  {
    slug: "cell-tower-lease-friendly-list",
    title: "Cell Tower Lease Friendly List",
    excerpt:
      "If you've thought about leasing your property for a cell tower, it takes more than having space to spare.",
    date: "January 30, 2025",
    image:
      "https://cell-waves.ca/wp-content/uploads/2025/01/telecommunication-5053730_1280.jpg",
    alt: "Telecommunication tower",
  },
  {
    slug: "how-to-negotiate-my-cell-tower-lease-a-comprehensive-guide",
    title: "How to Negotiate My Cell Tower Lease: A Comprehensive Guide",
    excerpt:
      "Turning your land into passive income through a cell tower lease sounds appealing. Here's how to make sure the deal works for you.",
    date: "September 25, 2024",
    image:
      "https://cell-waves.ca/wp-content/uploads/2024/09/Cell-phone-tower-cell-combination-microwave.webp",
    alt: "Cell tower and microwave equipment",
  },
  {
    slug: "how-to-get-more-money-for-my-cell-tower-lease-tips-and-strategies",
    title: "How to Get More Money for My Cell Tower Lease: Tips and Strategies",
    excerpt:
      "If you have a cell tower lease, you might wonder if you're maximizing its potential. Here's how to push for more.",
    date: "September 25, 2024",
    image:
      "https://cell-waves.ca/wp-content/uploads/2025/03/pexels-tima-miroshnichenko-6694543.jpg",
    alt: "Reviewing lease documents",
  },
  {
    slug: "how-much-is-my-cell-tower-lease-worth-understanding-lease-valuation",
    title: "How Much Is My Cell Tower Lease Worth? Understanding Lease Valuation",
    excerpt:
      "Approached by a telecom company to lease space for a tower? Your first question is likely what it's actually worth.",
    date: "September 25, 2024",
    image:
      "https://cell-waves.ca/wp-content/uploads/2024/09/transmission-system-1090036_1920.jpg",
    alt: "Transmission system",
  },
  {
    slug: "why-should-i-use-a-wireless-consultant-for-my-cell-phone-tower-lease",
    title: "Why Should I Use a Wireless Consultant for My Cell Phone Tower Lease?",
    excerpt:
      "A wireless consultant works for you, not the carrier. Here's what that changes at the negotiating table.",
    date: "May 5, 2023",
    image:
      "https://cell-waves.ca/wp-content/uploads/2025/04/businessman-4914044_1280-1.jpg",
    alt: "Consultant at work",
  },
  {
    slug: "small-cells-in-deployment",
    title: "Small Cells In Deployment",
    excerpt:
      "Carriers are densifying networks with small cells. Here's what that means for property owners and lease value.",
    date: "October 1, 2019",
    image:
      "https://cell-waves.ca/wp-content/uploads/2025/02/New-Project-2022-07-07T092522.458-1024x743-1.jpg",
    alt: "Small cell deployment",
  },
  {
    slug: "i-want-a-cell-tower",
    title: "I Want A Cell Tower",
    excerpt:
      "Many landowners want a tower on their property. Here's the reality of how carriers actually pick sites.",
    date: "September 5, 2017",
    image:
      "https://cell-waves.ca/wp-content/uploads/2025/02/catus-tower.jpg",
    alt: "Cell tower in a desert",
  },
  {
    slug: "5g-technologys-impact-on-your-cell-site",
    title: "5G Technology's Impact On Your Cell Site",
    excerpt:
      "5G upgrades are changing what carriers need from existing sites. Here's how it affects your lease.",
    date: "August 30, 2017",
    image:
      "https://cell-waves.ca/wp-content/uploads/2017/08/GettyImages-1126630372.jpg",
    alt: "5G cell site",
  },
  {
    slug: "46-billion-firstnet-awarded-to-att-whats-your-cut",
    title: "$46 Billion FirstNet Awarded To AT&T. What's Your Cut?",
    excerpt:
      "The FirstNet build reshapes carrier spending. Here's what it could mean for the value of your site.",
    date: "August 5, 2017",
    image:
      "https://cell-waves.ca/wp-content/uploads/2025/01/firstnet_1280x720_techybg-1024x576-1.jpg",
    alt: "FirstNet network graphic",
  },
]

export const LEASE_TOPICS = [
  {
    title: "Are you getting fair market rent?",
    body: "Fair market value of your cell property can only be determined once you understand the value it delivers to the network.",
    href: "/blog/how-much-is-my-cell-tower-lease-worth-understanding-lease-valuation",
  },
  {
    title: "Terminated leases. Can this happen to you?",
    body: "With rare exceptions, all wireless leases have early termination clauses that let the carrier walk away. Know your exposure.",
    href: "/blog",
  },
  {
    title: "You've been contacted. New tower on your land.",
    body: "Rent matters, but the 30-year contract is 22 pages long. What are you missing in the other two dozen terms?",
    href: "/blog/how-to-negotiate-my-cell-tower-lease-a-comprehensive-guide",
  },
  {
    title: "Why is your lease valuable?",
    body: "What your lease is worth and what you are paid are often not in alignment. Here's why the gap exists.",
    href: "/blog",
  },
]

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1602823284936-463177448097?q=80&w=1920&auto=format&fit=crop"
export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1615377387113-4692ddb9e292?q=80&w=1400&auto=format&fit=crop"
