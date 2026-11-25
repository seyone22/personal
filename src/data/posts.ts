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
    slug: "sri-lanka-used-car-prices-2026",
    title:
      "Sri Lanka Used Car Prices (2026): 1,853 Listings Across Ikman, CarMarket & HitAd",
    subtitle:
      "Empirically tracking Toyota Raize, Honda Vezel, Suzuki Wagon R, and Suzuki Alto across Sri Lanka's accessible car classifieds — import-ban cliffs, dealer spreads, and hidden prices.",
    date: "2026-11-23",
    verifiedDate: "2026-11-23",
    readTime: "7 min read",
    tags: ["Data", "Sri Lanka", "Vehicles", "Interactive"],
    summary:
      "Analyzed 1,853 live listings across Ikman.lk, CarMarket.lk, and HitAd.lk: why Toyota Raize is now #1 by volume, why Ikman undercuts CarMarket on 21 of 25 model-year pairs, and how the 2019–2022 import ban flattened depreciation.",
    featured: true,
  },
  {
    slug: "sri-lanka-lime-chili-prices-2026",
    title:
      "Why Limes Hit Rs. 2,294/kg in Sri Lanka While Green Chilies Crashed",
    subtitle:
      "A 222-day breakdown of 10 supermarket SKUs across Keells, Cargills, Arpico, and SPAR, and the harvest and weather cycles behind their opposite curves.",
    date: "2026-11-18",
    verifiedDate: "2026-11-18",
    readTime: "5 min read",
    tags: ["FoodRepo", "Sri Lanka", "Agriculture", "Interactive"],
    summary:
      "Analyzed 10 daily supermarket SKUs for lime and green chili from March to November 2026, tracing the July 23 chili spike (up to Rs. 2,730/kg) and the October-November lime squeeze (up to Rs. 2,294/kg).",
    featured: true,
  },
  {
    slug: "sri-lanka-food-inflation-cpi-2026",
    title:
      "Sri Lanka Food Inflation (2026): Replicating CPI with Supermarket Data",
    subtitle:
      "Benchmarking 43 CCPI-matched items (54.9% of the food basket) from food.seyone.dev against the Central Bank's October 2026 inflation figures.",
    date: "2026-11-18",
    verifiedDate: "2026-11-18",
    readTime: "5 min read",
    tags: ["FoodRepo", "Sri Lanka", "Inflation", "Interactive"],
    summary:
      "A pilot study weighting 43 daily supermarket SKUs from Cargills, Keells, Arpico, and SPAR by official CCPI shares (+9.25% Jun-Oct vs. CBSL's +8.8%), and where the remaining 45.1% gap sits.",
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
    slug: "sri-lanka-mobile-data-plans-2026",
    title:
      "Sri Lanka Mobile Data Plans (2026): Dialog, Mobitel, Hutch & Airtel Compared",
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
