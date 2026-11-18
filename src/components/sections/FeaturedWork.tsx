import { ProjectCard } from "@/components/ProjectCard";
import { ALL_PROJECTS } from "@/data/projects";

export function FeaturedWork() {
  const featuredProjects = ALL_PROJECTS.filter((p) => p.featured);

  return (
    <div className="mb-24">
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold tracking-tight">
          Featured Work
        </h2>
        <p className="text-muted-foreground">
          High-impact platforms and architectures.
        </p>
      </div>

      {/* Bento Grid: First item spans 2 columns on desktop */}
      <div className="grid gap-6 md:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <div
            key={project.title}
            className={index === 0 ? "md:col-span-2" : "md:col-span-1"}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.tags}
              github={project.github}
              link={project.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
