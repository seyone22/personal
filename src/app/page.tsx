import { BeyondIDE } from "@/components/sections/BeyondIDE";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectArchive } from "@/components/sections/ProjectArchive";
import { TechArsenal } from "@/components/sections/TechArsenal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* 01. HERO SECTION */}
      <HeroSection />

      {/* 02. PROJECTS GRID */}
      <section
        id="projects"
        className="min-h-screen bg-zinc-950/50 px-6 py-24 sm:px-12 lg:px-24"
      >
        <FeaturedWork />
        <ProjectArchive />
      </section>

      {/* 03. TECH STACK & TOOLKIT */}
      <TechArsenal />

      {/* 04. WORK EXPERIENCE & CONTRACTS */}
      <ExperienceSection />

      {/* 05. PERSONAL / ACHIEVEMENTS */}
      <BeyondIDE />

      {/* 06. CALL TO ACTION */}
      <ContactCTA />

      {/* 07. FOOTER */}
      <Footer />
    </div>
  );
}
