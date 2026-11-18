import { ChefHat, Palette, Target } from "lucide-react";
import Image from "next/image";

export function BeyondIDE() {
  return (
    <section className="border-t border-border bg-muted/20 px-6 py-24 sm:px-12 lg:px-24 dark:bg-zinc-950/20">
      <div className="mb-16">
        <h3 className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
          Beyond the IDE
        </h3>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Life &amp; Interests
        </h2>
      </div>

      <div className="grid gap-12 md:grid-cols-3">
        {/* Art Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-foreground">
            <div className="rounded-md border border-primary/20 bg-primary/10 p-2 text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <h4 className="text-xl font-bold tracking-tight">Digital Art</h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            I draw and render digital art primarily using Clip Studio Paint. My
            aesthetic is heavily influenced by anime culture, which directly
            translates into my creative direction work for the Anime.lk
            merchandising team.
          </p>
          {/* Artwork Grid with Next.js Image */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[1, 2, 3, 4].map((id) => (
              <div
                key={id}
                className="relative aspect-square overflow-hidden rounded-xl border border-border/60 transition-colors hover:border-primary/50"
              >
                <Image
                  src={`/img/artworks/${id}.png`}
                  alt={`Digital Artwork ${id}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 15vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sports Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-foreground">
            <div className="rounded-md border border-primary/20 bg-primary/10 p-2 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <h4 className="text-xl font-bold tracking-tight">Sports</h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A competitive recurve archer and participant in the 22nd National
            Archery Championship. Off the range, I maintain a disciplined
            physical routine, cycling daily and focusing heavily on
            weightlifting.
          </p>
          {/* Hero Sports Image */}
          <div className="relative mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-muted">
            <Image
              src="/img/sports/1.jpg"
              alt="Archery Tournament"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-85 grayscale transition-all duration-500 hover:scale-105 hover:opacity-100 hover:grayscale-0 dark:opacity-60"
            />
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-foreground">
            <div className="rounded-md border border-primary/20 bg-primary/10 p-2 text-primary">
              <ChefHat className="h-5 w-5" />
            </div>
            <h4 className="text-xl font-bold tracking-tight">
              Culinary &amp; Culture
            </h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            An avid baker and cook fascinated by food science—from mastering the
            physics of traditional Sri Lankan Kalu Dodol to perfecting the
            pastry of Willard mango custard tarts. Fluent in Japanese (JLPT N4)
            with a deep interest in manga localization.
          </p>

          {/* Status Badges */}
          <div className="grid gap-3 pt-2">
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3 shadow-sm dark:border-border/40 dark:bg-zinc-900/50">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(20,83,45,0.8)]" />
              <span className="text-sm font-medium text-foreground">
                Currently Reading:{" "}
                <span className="text-muted-foreground">Spice &amp; Wolf</span>
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3 shadow-sm dark:border-border/40 dark:bg-zinc-900/50">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(20,83,45,0.8)]" />
              <span className="text-sm font-medium text-foreground">
                Currently Baking:{" "}
                <span className="text-muted-foreground">Mango Tarts</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
