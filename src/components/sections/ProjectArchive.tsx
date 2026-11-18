"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ALL_PROJECTS, CATEGORIES, type Category } from "@/data/projects";

export function ProjectArchive() {
  const [activeFilter, setActiveFilter] = useState<Category | "All">("All");

  const filteredProjects = ALL_PROJECTS.filter(
    (project) => activeFilter === "All" || project.category === activeFilter,
  );

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-6 border-t border-border/50 pt-12 md:flex-row md:items-end">
        <div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight">
            Project Archive
          </h2>
          <p className="text-sm text-muted-foreground">
            Filter by technical domain.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              size="sm"
              className={`rounded-full transition-all ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Archive Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            tags={project.tags}
            github={project.github}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}
