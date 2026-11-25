import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import IkmanDarazMcpGateway from "@/content/blog/ikman-daraz-mcp-gateway.mdx";
import SriLankaFoodInflationCpi2026 from "@/content/blog/sri-lanka-food-inflation-cpi-2026.mdx";
import SriLankaLimeChiliPrices2026 from "@/content/blog/sri-lanka-lime-chili-prices-2026.mdx";
import SriLankaMobileDataPlans2026 from "@/content/blog/sri-lanka-mobile-data-plans-2026.mdx";
import SriLankaUsedCarPrices2026 from "@/content/blog/sri-lanka-used-car-prices-2026.mdx";
import { BLOG_POSTS, getPostBySlug } from "@/data/posts";

const POST_COMPONENTS: Record<string, ComponentType> = {
  "sri-lanka-used-car-prices-2026": SriLankaUsedCarPrices2026,
  "sri-lanka-lime-chili-prices-2026": SriLankaLimeChiliPrices2026,
  "sri-lanka-food-inflation-cpi-2026": SriLankaFoodInflationCpi2026,
  "ikman-daraz-mcp-gateway": IkmanDarazMcpGateway,
  "sri-lanka-mobile-data-plans-2026": SriLankaMobileDataPlans2026,
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Post Not Found | Seyone Gunasingham" };
  }
  const url = `/blog/${post.slug}`;
  return {
    title: `${post.title} | Seyone Gunasingham`,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: "Seyone Gunasingham", url: "https://seyone.dev" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      siteName: "Seyone Gunasingham",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.verifiedDate ?? post.date,
      authors: ["Seyone Gunasingham"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const PostContent = POST_COMPONENTS[slug];

  if (!post || !PostContent) {
    notFound();
  }

  const postUrl = `https://seyone.dev/blog/${post.slug}`;
  const authorSchema = {
    "@type": "Person",
    name: "Seyone Gunasingham",
    url: "https://seyone.dev",
    sameAs: ["https://github.com/seyone22", "https://linkedin.com/in/sgseyone"],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.summary,
        datePublished: post.date,
        dateModified: post.verifiedDate ?? post.date,
        url: postUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        keywords: post.tags.join(", "),
        inLanguage: "en",
        author: authorSchema,
        publisher: authorSchema,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://seyone.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://seyone.dev/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured JSON-LD schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-12 sm:py-20">
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All Posts
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Portfolio Home
          </Link>
        </div>

        <header className="mb-12 border-b border-border pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {post.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div className="min-w-0">
          <PostContent />
        </div>
      </article>

      <Footer />
    </div>
  );
}
