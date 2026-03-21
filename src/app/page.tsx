import { Badge } from "@/components/ui/badge"; // Assumes shadcn is installed
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
      <div className="flex flex-col items-center">
        <main className="flex w-full max-w-4xl flex-col gap-20 px-6 py-24 sm:px-12">

          {/* Hero Section */}
          <section className="flex flex-col items-start gap-6">
            <Badge variant="outline" className="border-primary/30 text-primary">
              Available for new projects
            </Badge>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Building the future of <span className="text-primary">mobile & AI.</span>
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
                I&apos;m Seyone, an Android developer from Sri Lanka focused on building high-performance
                apps like Cook and Shot, and intelligent enterprise systems for Providence Auto.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon"><Github className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Linkedin className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Mail className="h-5 w-5" /></Button>
              </div>
            </div>
          </section>

          {/* Next step: Project Grid Component goes here */}

        </main>
      </div>
  );
}