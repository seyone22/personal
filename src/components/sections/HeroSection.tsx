import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center px-6 py-24 sm:px-12 lg:px-24">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Seyone Gunasingham. <br />
          <span className="text-primary">I build scalable platforms.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Architecting reliable web platforms and data pipelines with
          TypeScript, Next.js, Python, and PostgreSQL. Currently engineering
          full-stack data solutions at Uprise Digital, previously building
          serverless AWS cloud infrastructure at Axallant.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex-1 sm:flex-none rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90 transition-all",
              )}
            >
              View My Work
            </a>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex-1 sm:flex-none rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-all",
              )}
            >
              Read Blog
            </Link>
            <a
              href="/Seyone_Gunasingham.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex-1 sm:flex-none rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-all",
              )}
            >
              Download CV
            </a>
          </div>
          <div className="flex items-center gap-2 px-4">
            <a
              href="https://github.com/seyone22"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "hover:text-primary transition-colors",
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
                "hover:text-primary transition-colors",
              )}
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:hi@seyone.dev"
              aria-label="Email Seyone Gunasingham"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "hover:text-primary transition-colors",
              )}
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
