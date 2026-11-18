import { Github, Linkedin, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 px-6 py-12 sm:px-12 lg:px-24 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* Branding & Copyright */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="text-lg font-bold tracking-tight text-foreground dark:text-zinc-100">
            Seyone Gunasingham
          </span>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} All rights reserved.
            <span className="hidden md:inline"> &nbsp;|&nbsp; </span>
            <br className="md:hidden" />
            Negombo, Sri Lanka.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/seyone22"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-10 w-10 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary",
            )}
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/sgseyone"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-10 w-10 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary",
            )}
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:hi@seyone.dev"
            aria-label="Email Seyone Gunasingham"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-10 w-10 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary",
            )}
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Tech Stack Subtle Nod */}
      <div className="mx-auto mt-12 max-w-5xl text-center md:text-left">
        <p className="font-mono text-xs tracking-widest text-muted-foreground/70 uppercase">
          Built with Next.js, Tailwind CSS &amp; TypeScript.
        </p>
      </div>
    </footer>
  );
}
