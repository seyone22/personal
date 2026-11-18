import { Badge } from "@/components/ui/badge";

export function ExperienceSection() {
  return (
    <section className="border-t border-border/50 bg-background px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        {/* --- PART 1: DAY JOBS TIMELINE --- */}
        <div className="mb-16">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold tracking-tight">
              Experience
            </h2>
            <p className="text-muted-foreground">
              Professional roles and core technical trajectory.
            </p>
          </div>

          <div className="relative ml-3 space-y-12 border-l border-border/60 pl-8 md:max-w-3xl">
            {/* Uprise Digital */}
            <div className="relative">
              <div className="absolute -left-[32.5px] top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-background bg-primary" />
              <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                <h3 className="text-xl font-bold text-foreground">
                  Full-Stack Data Engineer
                </h3>
                <span className="font-mono text-sm text-muted-foreground">
                  Sep 2025 – Present
                </span>
              </div>
              <h4 className="mb-4 font-medium text-primary">
                Uprise Digital (Remote, AUS)
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Designed Propia, a real estate investment platform utilizing
                Next.js, FastAPI, and PostgreSQL. Engineered resilient data
                extraction pipelines to aggregate and normalize large volumes of
                property data, alongside implementing secure multi-tenant
                authentication.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline">Python</Badge>
                <Badge variant="outline">FastAPI</Badge>
                <Badge variant="outline">PostgreSQL</Badge>
              </div>
            </div>

            {/* Axallant */}
            <div className="relative">
              <div className="absolute -left-[32.5px] top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-background bg-muted-foreground/60" />
              <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                <h3 className="text-xl font-bold text-foreground">
                  Full-Stack Software Engineer
                </h3>
                <span className="font-mono text-sm text-muted-foreground">
                  Feb 2025 – Aug 2025
                </span>
              </div>
              <h4 className="mb-4 font-medium text-foreground/80">
                Axallant Pvt.Ltd (Remote, USA)
              </h4>
              <p className="mb-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                Intern: Nov 2024 – Jan 2025
              </p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Architected and deployed serverless cloud infrastructure
                utilizing AWS Lambda, Cognito, and CloudFront via Terraform.
                Developed robust Node.js and Spring Boot backend services
                integrated with performant React interfaces, while managing
                secure Stripe payment workflows.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline">Node.js</Badge>
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">AWS</Badge>
                <Badge variant="outline">Terraform</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* --- PART 2: CONTRACT & FREELANCE CARDS --- */}
        <div className="border-t border-border/50 pt-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-2xl font-bold tracking-tight">
                Contract &amp; Freelance
              </h3>
              <p className="text-sm text-muted-foreground">
                Independent engineering and technical consulting.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Providence Auto */}
            <div className="group relative flex flex-col rounded-xl border border-border/60 bg-card/80 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/40 dark:border-border/40 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-card-foreground transition-colors group-hover:text-primary">
                    Providence Auto
                  </h4>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Jan 2026 – Sep 2026
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="border border-border bg-muted text-[10px] tracking-wider text-muted-foreground uppercase"
                >
                  Completed
                </Badge>
              </div>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-muted-foreground">
                Engineered a highly performant Next.js and TypeScript web
                platform for international vehicle sourcing and importation,
                managing end-to-end delivery and secure lead-tracking.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="rounded border border-border px-2 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  Next.js
                </span>
                <span className="rounded border border-border px-2 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  TypeScript
                </span>
              </div>
            </div>

            {/* Anime.lk */}
            <div className="group relative flex flex-col rounded-xl border border-border/60 bg-card/80 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/40 dark:border-border/40 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-card-foreground transition-colors group-hover:text-primary">
                    Anime.lk
                  </h4>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    2022 – Present
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="border border-primary/20 bg-primary/10 text-[10px] tracking-wider text-primary uppercase"
                >
                  Active
                </Badge>
              </div>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-muted-foreground">
                Spearheaded comprehensive platform redesign. Integrated Google
                Wallet API for high-volume digital ticketing and established
                CI/CD pipelines for zero-downtime deployments.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="rounded border border-border px-2 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  Next.js
                </span>
                <span className="rounded border border-border px-2 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  Google Wallet
                </span>
              </div>
            </div>

            {/* English Tea Co */}
            <div className="group relative flex flex-col rounded-xl border border-border/60 bg-card/80 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/40 dark:border-border/40 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-card-foreground transition-colors group-hover:text-primary">
                    English Tea Co.
                  </h4>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    2023
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="border border-border bg-muted text-[10px] tracking-wider text-muted-foreground uppercase"
                >
                  Completed
                </Badge>
              </div>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-muted-foreground">
                Developed a specialized inventory and stock management
                application interfacing directly with proprietary Zebra QR
                Scanner hardware devices.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="rounded border border-border px-2 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  Hardware
                </span>
                <span className="rounded border border-border px-2 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  Zebra API
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
