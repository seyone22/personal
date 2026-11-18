import { Cloud } from "lucide-react";
import Image from "next/image";

interface TechItem {
  name: string;
  icon?: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Backend & APIs",
    items: [
      {
        name: "Node.js & Express",
        icon: "https://cdn.simpleicons.org/nodedotjs/white",
      },
      {
        name: "Python (FastAPI)",
        icon: "https://cdn.simpleicons.org/fastapi/white",
      },
      {
        name: "Spring Boot (Java)",
        icon: "https://cdn.simpleicons.org/springboot/white",
      },
      {
        name: "PostgreSQL & MongoDB",
        icon: "https://cdn.simpleicons.org/postgresql/white",
      },
    ],
  },
  {
    title: "Frontend & Web",
    items: [
      {
        name: "React & Next.js",
        icon: "https://cdn.simpleicons.org/nextdotjs/white",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript/white",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.simpleicons.org/tailwindcss/white",
      },
      { name: "Astro", icon: "https://cdn.simpleicons.org/astro/white" },
    ],
  },
  {
    title: "Cloud & Infra",
    items: [
      {
        name: "AWS Cloud",
      },
      {
        name: "Terraform (IaC)",
        icon: "https://cdn.simpleicons.org/terraform/white",
      },
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker/white" },
      {
        name: "GitHub Actions",
        icon: "https://cdn.simpleicons.org/githubactions/white",
      },
    ],
  },
  {
    title: "Mobile & Native",
    items: [
      {
        name: "Kotlin (Android)",
        icon: "https://cdn.simpleicons.org/kotlin/white",
      },
      {
        name: "Jetpack Compose",
        icon: "https://cdn.simpleicons.org/jetpackcompose/white",
      },
      { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/white" },
      { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/white" },
    ],
  },
];

export function TechArsenal() {
  return (
    <section className="border-t border-border/50 bg-zinc-100/80 px-6 py-24 sm:px-12 lg:px-24 dark:bg-zinc-950/50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center md:text-left">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground">
            The core frameworks, languages, and infrastructure I use to build
            scalable systems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TECH_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="flex flex-col rounded-xl border border-zinc-200/90 bg-card p-6 shadow-xs backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-sm dark:border-border/40 dark:bg-zinc-950/40 dark:shadow-none dark:hover:bg-zinc-900/40"
            >
              <h3 className="mb-6 font-mono text-sm tracking-widest text-primary uppercase">
                {category.title}
              </h3>
              <ul className="space-y-4 text-sm font-medium text-foreground/85 dark:text-zinc-300">
                {category.items.map((item) => (
                  <li key={item.name} className="group flex items-center gap-3">
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={20}
                        height={20}
                        unoptimized
                        className="h-5 w-5 opacity-75 invert transition-opacity group-hover:opacity-100 dark:invert-0"
                      />
                    ) : (
                      <Cloud className="h-5 w-5 text-foreground/75 transition-colors group-hover:text-foreground dark:text-zinc-300" />
                    )}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
