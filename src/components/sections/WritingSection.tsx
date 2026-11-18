import { ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/data/posts";

export function WritingSection() {
  return (
    <section
      id="writing"
      className="border-t border-border/40 bg-zinc-100/60 px-6 py-24 sm:px-12 lg:px-24 dark:bg-zinc-950/30"
    >
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            Writing &amp; Research
          </h2>
          <p className="text-muted-foreground">
            Side projects, data notes, and things I&apos;ve been digging into.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-card p-6 shadow-xs transition-all hover:border-primary/50 hover:shadow-md dark:border-border dark:hover:bg-muted/40"
          >
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold tracking-tight text-card-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
            </div>

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
    </section>
  );
}
