import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, ArrowDown } from "lucide-react";

export default function Home() {
  return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        {/* 01. HERO SECTION */}
        <section className="flex min-h-[80vh] flex-col justify-center px-6 py-24 sm:px-12 lg:px-24">
          <div className="max-w-3xl space-y-8">
            <Badge variant="outline" className="border-primary/50 text-primary animate-pulse">
              Available for Android & AI Projects
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              Seyone Gunasingham. <br/>
              <span className="text-primary">Mobile Architect.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Specializing in high-performance Android ecosystems and intelligent data solutions.
              Currently building lead tracking systems for Providence Auto and specialized
              logistics tools for Zebra hardware.
            </p>
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-accent text-white rounded-full px-8">
                View My Work
              </Button>
              <div className="flex items-center gap-2 px-4">
                <Button variant="ghost" size="icon" className="hover:text-primary"><Github /></Button>
                <Button variant="ghost" size="icon" className="hover:text-primary"><Linkedin /></Button>
                <Button variant="ghost" size="icon" className="hover:text-primary"><Mail /></Button>
              </div>
            </div>
          </div>
        </section>

        {/* 02. PROJECTS GRID */}
        <section className="px-6 py-24 sm:px-12 lg:px-24 bg-zinc-950/50">
          <h2 className="mb-12 text-3xl font-bold tracking-tight">Selected Engineering</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* We will populate these using your real projects */}
            <ProjectCard
                title="Providence Auto CMS"
                description="A custom lead tracking and CRM solution built for high-volume car dealerships."
                tags={["Next.js", "Ktor", "Data Analytics"]}
            />
            <ProjectCard
                title="Shot: Archery Tracker"
                description="Wear OS application for Olympic recurve shooters. Focuses on shot rhythm and scoring."
                tags={["Kotlin", "Jetpack Compose", "Wear OS"]}
            />
            <ProjectCard
                title="Cook: Recipe Engine"
                description="A nutrition-focused meal and expense tracker for professional athletes."
                tags={["Android", "Cloudflare R2", "Gemini AI"]}
            />
          </div>
        </section>

        {/* 03. PERSONAL / ACHIEVEMENTS */}
        <section className="px-6 py-24 sm:px-12 lg:px-24 border-t border-border">
          <div className="max-w-2xl space-y-4">
            <h3 className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Beyond the IDE</h3>
            <p className="text-lg italic text-zinc-300">
              "22nd National Archery Championship Competitor. Anime enthusiast. Minecraft server tinkerer."
            </p>
          </div>
        </section>
      </div>
  );
}