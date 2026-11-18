import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function ContactCTA() {
  return (
    <section className="border-t border-border/50 bg-primary/5 px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-primary/20 bg-card/85 p-12 text-center backdrop-blur-md shadow-sm dark:bg-zinc-950/50 dark:shadow-[0_0_40px_rgba(20,83,45,0.1)]">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl dark:text-zinc-100">
          Ready to build something together?
        </h2>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          I am currently available for new opportunities. Whether you need a
          full-stack architect, a specialized data engineer, or a technical lead
          for your next project, let’s talk.
        </p>
        <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
          <a
            href="mailto:hi@seyone.dev"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full bg-primary px-10 py-6 text-base font-bold text-primary-foreground transition-transform hover:scale-105 hover:bg-primary/90",
            )}
          >
            Get In Touch
          </a>
          <a
            href="https://linkedin.com/in/sgseyone"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-border bg-transparent px-10 py-6 text-base font-medium text-foreground transition-all hover:bg-muted dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white",
            )}
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
}
