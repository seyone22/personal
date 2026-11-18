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
    slug: "ikman-daraz-mcp-gateway",
    title: "I Just Wanted to Buy a Tablet: Querying Ikman & Daraz via MCP",
    subtitle:
      "Building NestJS REST and MCP gateways for Sri Lankan marketplaces, and what live queries for a Galaxy Tab S11 show about duplicate shop listings and bait pricing.",
    date: "2026-11-18",
    verifiedDate: "2026-11-18",
    readTime: "3 min read",
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
