import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
}

export function ProjectCard({ title, description, tags, link, github }: ProjectProps) {
    return (
        <Card className="group relative flex h-full flex-col overflow-hidden border-border/40 bg-zinc-950/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-zinc-900/60 hover:shadow-[0_8px_30px_rgba(20,83,45,0.15)]">
            {/* Animated Top Gradient Border */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/50" />

            {/* Decorative Background Glow */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-[50px] transition-all duration-500 group-hover:bg-primary/20" />

            <CardHeader className="relative z-10 pb-4">
                <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl font-bold tracking-tight text-zinc-100 transition-colors group-hover:text-primary">
                        {title}
                    </CardTitle>
                    <div className="flex shrink-0 gap-1">
                        {github && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 transition-colors hover:bg-primary/10 hover:text-primary">
                                <a href={github} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                    <span className="sr-only">GitHub Repository</span>
                                </a>
                            </Button>
                        )}
                        {link && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 transition-colors hover:bg-primary/10 hover:text-primary">
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="sr-only">External Link</span>
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
                <CardDescription className="text-sm leading-relaxed text-zinc-400">
                    {description}
                </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 mt-auto pt-4">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="border border-zinc-800 bg-zinc-900/50 text-[10px] font-medium uppercase tracking-wider text-zinc-300 transition-colors group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}