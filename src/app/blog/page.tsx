import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/data/posts";

export const metadata: Metadata = {
  title: "Writing & Research | Seyone Gunasingham",
  description:
    "Side projects, data breakdowns, and technical write-ups by Seyone Gunasingham.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Writing & Research | Seyone Gunasingham",
    description:
      "Side projects, data breakdowns, and technical write-ups by Seyone Gunasingham.",
    url: "/blog",
    siteName: "Seyone Gunasingham",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Writing & Research | Seyone Gunasingham",
    description:
      "Side projects, data breakdowns, and technical write-ups by Seyone Gunasingham.",
  },
};

export default function BlogIndexPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Writing & Research | Seyone Gunasingham",
    description:
      "Side projects, data breakdowns, and technical write-ups by Seyone Gunasingham.",
    url: "https://seyone.dev/blog",
    author: {
      "@type": "Person",
      name: "Seyone Gunasingham",
      url: "https://seyone.dev",
      sameAs: [
        "https://github.com/seyone22",
        "https://linkedin.com/in/sgseyone",
      ],
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      url: `https://seyone.dev/blog/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured JSON-LD schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-20 sm:px-12">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="mb-12 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            Writing &amp; Research
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Notes &amp; Write-ups
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Side projects, data breakdowns, and things I&apos;ve put together.
          </p>
        </div>

        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-muted/40 sm:p-8"
            >
              <div className="mb-3 flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
                {post.featured && (
                  <span className="rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 text-[11px] text-primary">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-card-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>

              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {post.subtitle}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
