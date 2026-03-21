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
        <Card className="group relative overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(20,83,45,0.15)]">
            {/* Decorative Gradient Overlay */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-opacity group-hover:opacity-100" />

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {title}
                    </CardTitle>
                    <div className="flex gap-1">
                        {github && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                <Github className="h-4 w-4" />
                            </Button>
                        )}
                        {link && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-primary/5 text-[10px] font-medium uppercase tracking-wider text-primary border border-primary/10"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}