export interface BlogPostMeta {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  verifiedDate?: string;
  readTime: string;
  tags: string[];
  summary: string;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "sl-supermarket-inflation-2026",
    title: "Pilot: Replicating Sri Lanka's Food CPI Using Supermarket Data",
    subtitle:
      "Benchmarking 42 CCPI-matched items (54.2% of the food basket) from food.seyone.dev against the Central Bank's October 2026 inflation figures.",
    date: "2026-11-18",
    verifiedDate: "2026-11-18",
    readTime: "4 min read",
    tags: ["FoodRepo", "Sri Lanka", "Inflation", "Interactive"],
    summary:
      "A pilot study weighting 42 daily supermarket SKUs from Cargills, Keells, Arpico, and SPAR by official CCPI shares (+8.99% Jun–Oct vs. CBSL's +8.8%), and where the remaining 45.8% gap sits.",
    featured: true,
  },
  {
    slug: "ikman-daraz-mcp-gateway",
    title: "I Just Wanted to Buy a Tablet: Querying Ikman & Daraz via MCP",
    subtitle:
      "Building NestJS REST and MCP gateways for Sri Lankan marketplaces, and what live queries for a Galaxy Tab S11 show about duplicate shop listings and bait pricing.",
    date: "2026-11-18",
    verifiedDate: "2026-11-18",
    readTime: "5 min read",
    tags: ["NestJS", "MCP", "Sri Lanka", "Marketplaces"],
    summary:
      "Built headless MCP and REST gateways for ikman.lk and daraz.lk after getting frustrated trying to buy a Galaxy Tab S11, uncovering duplicate Liberty Plaza shop floods and call-for-price disclaimers.",
    featured: true,
  },
  {
    slug: "sl-mobile-tariffs-2026",
    title: "Comparing Sri Lanka's Mobile Data Tariffs",
    subtitle:
      "A look at 64 active plans across Dialog, Mobitel, Hutch, and Airtel, normalizing taxes, 28-day billing cycles, and weird pricing overlaps.",
    date: "2026-11-18",
    verifiedDate: "2026-11-18",
    readTime: "7 min read",
    tags: ["Data", "Sri Lanka", "TRCSL", "Interactive"],
    summary:
      "Pulled data from operator websites and 268 TRCSL PDF filings using a small Node.js script to compare mobile plans by tax-inclusive Rs. per Anytime GB.",
    featured: true,
  },
];

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
