export type Category =
  | "Web & Enterprise"
  | "Mobile & WearOS"
  | "Backend & Data"
  | "Tools & Misc";

export interface Project {
  title: string;
  category: Category;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export const CATEGORIES: (Category | "All")[] = [
  "All",
  "Web & Enterprise",
  "Mobile & WearOS",
  "Backend & Data",
  "Tools & Misc",
];

export const ALL_PROJECTS: Project[] = [
  // ENTERPRISE & WEB
  {
    title: "Propia / Uprise Digital",
    category: "Web & Enterprise",
    description:
      "Real estate investment analysis platform featuring robust data extraction pipelines to aggregate and normalize property data.",
    tags: ["Next.js", "Python", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Axallant Apthia",
    category: "Web & Enterprise",
    description:
      "Serverless property rental management system with strict IAM roles, Stripe integrations, and high-availability cloud deployment.",
    tags: ["Node.js", "React", "AWS", "Terraform"],
  },
  {
    title: "Providence Auto CMS",
    category: "Web & Enterprise",
    description:
      "Full-stack lead tracking and CRM solution built for high-volume international car dealerships.",
    tags: ["Next.js", "MongoDB", "Data Analytics"],
  },
  {
    title: "Anime.lk Event Portal",
    category: "Web & Enterprise",
    description:
      "Comprehensive event management and artist partner portal supporting internal review workflows and attendee routing.",
    tags: ["Next.js", "MongoDB", "Fullstack"],
    link: "https://dev.anime.lk/",
  },
  {
    title: "Anime.lk Partner Static",
    category: "Web & Enterprise",
    description:
      "High-performance, statically generated landing page for the Anime.lk Artist Partner Program.",
    tags: ["Astro", "Tailwind", "Static"],
    link: "https://partnerprogram.anime.lk/",
  },

  // MOBILE & WEARABLE
  {
    title: "Shot: Archery Tracker",
    category: "Mobile & WearOS",
    description:
      "Professional archery score tracking system with tournament management capabilities for Wear OS and Android.",
    tags: ["Kotlin", "Jetpack Compose", "Wear OS"],
    github: "https://github.com/seyone22/shot",
  },
  {
    title: "Expense Tracker",
    category: "Mobile & WearOS",
    description:
      "Material Expressive personal finance application designed in strict alignment with PSD2 security guidelines.",
    tags: ["Android", "Kotlin", "OCR"],
    github: "https://github.com/seyone22/expense_tracker",
  },
  {
    title: "Cook: Recipe Engine",
    category: "Mobile & WearOS",
    description:
      "Automated recipe and pantry management engine utilizing OCR and AI to seamlessly categorize household ingredients.",
    tags: ["Android", "Material Design", "Gemini AI"],
    github: "https://github.com/seyone22/cook",
    featured: true,
  },
  {
    title: "Catfish AI",
    category: "Mobile & WearOS",
    description:
      "Offline voice synthesis and transcription app optimizing a custom C++ layer on TensorFlow for low-latency processing.",
    tags: ["C++", "Kotlin", "TensorFlow"],
    github: "https://github.com/seyone22/catfish",
  },
  {
    title: "Anime Wear OS",
    category: "Mobile & WearOS",
    description:
      "Custom wearable application bringing specialized tracking and aesthetic interfaces to the wrist.",
    tags: ["Wear OS", "Kotlin"],
  },

  // BACKEND & DATA
  {
    title: "Ikman & Daraz MCP Gateway",
    category: "Backend & Data",
    description:
      "Headless MCP server and NestJS REST gateway for Sri Lanka's largest marketplaces, unlocking cheapest-first sorting, spam/accessory filtering, and normalized DTOs.",
    tags: ["NestJS", "TypeScript", "MCP", "Railway"],
    github: "https://github.com/seyone22/ikman-gateway",
    link: "https://ikman-gateway-production.up.railway.app/api/docs",
  },
  {
    title: "food.seyone.dev",
    category: "Backend & Data",
    description:
      "Automated data aggregation engine tracking and visualizing national supermarket price trends across thousands of SKUs.",
    tags: ["Next.js", "Data Eng", "MongoDB"],
    link: "https://food.seyone.dev",
    featured: true,
  },
  {
    title: "SLR Transit Server",
    category: "Backend & Data",
    description:
      "GTFS-compliant transit data backend handling complex scheduling, routing, and location data.",
    tags: ["NestJS", "PostgreSQL", "GTFS"],
  },
  {
    title: "Recipe Importer Core",
    category: "Backend & Data",
    description:
      "Robust Kotlin library utilizing JSON-LD for standardized, cross-platform recipe data extraction.",
    tags: ["Kotlin", "JSON-LD", "Library"],
  },

  // TOOLS & MISC
  {
    title: "Anime.lk POS",
    category: "Tools & Misc",
    description:
      "Cross-platform Point-of-Sale desktop application for high-volume convention merchandise transactions.",
    tags: ["Kotlin", "Desktop", "SQLite"],
  },
  {
    title: "University CVS Admin",
    category: "Tools & Misc",
    description:
      "Administrative web system built for the secure verification and management of university credentials.",
    tags: ["PHP", "MySQL", "Admin"],
  },
  {
    title: "Cert Maker Pipeline",
    category: "Tools & Misc",
    description:
      "Automated Python pipeline for batch-filling and generating hundreds of verified university certificates.",
    tags: ["Python", "Automation"],
  },
  {
    title: "Firefox Minimal Tab",
    category: "Tools & Misc",
    description:
      "A lightweight, hyper-minimalist custom new tab override for Firefox.",
    tags: ["HTML", "CSS", "Vanilla JS"],
    github: "https://github.com/seyone22/FirefoxNewTab",
  },
];
