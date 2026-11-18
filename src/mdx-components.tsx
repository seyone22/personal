import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
      <h1
        className={`mt-10 mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${className ?? ""}`}
        {...props}
      />
    ),
    h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
      <h2
        className={`mt-12 mb-4 border-b border-border pb-2 text-2xl font-bold tracking-tight text-foreground ${className ?? ""}`}
        {...props}
      />
    ),
    h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
      <h3
        className={`mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground ${className ?? ""}`}
        {...props}
      />
    ),
    p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
      <p
        className={`my-4 leading-7 text-foreground/85 ${className ?? ""}`}
        {...props}
      />
    ),
    ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
      <ul
        className={`my-4 ml-6 list-disc space-y-2 text-foreground/85 ${className ?? ""}`}
        {...props}
      />
    ),
    ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
      <ol
        className={`my-4 ml-6 list-decimal space-y-2 text-foreground/85 ${className ?? ""}`}
        {...props}
      />
    ),
    li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
      <li className={`leading-7 ${className ?? ""}`} {...props} />
    ),
    blockquote: ({
      className,
      ...props
    }: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        className={`my-6 rounded-r-lg border-l-2 border-primary bg-muted/60 py-2 pr-4 pl-4 text-foreground/85 italic ${className ?? ""}`}
        {...props}
      />
    ),
    code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
      <code
        className={`rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-emerald-700 dark:text-emerald-300 ${className ?? ""}`}
        {...props}
      />
    ),
    pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
      <pre
        className={`my-6 overflow-x-auto rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground ${className ?? ""}`}
        {...props}
      />
    ),
    a: ({ className, ...props }: ComponentPropsWithoutRef<"a">) => (
      <a
        className={`font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80 ${className ?? ""}`}
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-border" />,
    strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
      <strong
        className={`font-semibold text-foreground ${className ?? ""}`}
        {...props}
      />
    ),
    ...components,
  };
}
