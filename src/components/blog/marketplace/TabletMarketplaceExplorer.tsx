"use client";

import { ArrowUpDown, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  NOISE_EXAMPLES,
  TAB_S11_LISTINGS,
} from "@/data/sl-marketplace-tablets";
import { cn } from "@/lib/utils";

type TabView = "s11" | "noise";
type PlatformFilter = "All" | "Ikman" | "Daraz";

export function TabletMarketplaceExplorer() {
  const [view, setView] = useState<TabView>("s11");
  const [platform, setPlatform] = useState<PlatformFilter>("All");
  const [variant, setVariant] = useState<string>("All");
  const [sortAsc, setSortAsc] = useState(true);

  const variants = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(TAB_S11_LISTINGS.map((l) => l.variant))),
    ];
  }, []);

  const rows = useMemo(() => {
    return TAB_S11_LISTINGS.filter((item) => {
      if (platform !== "All" && item.platform !== platform) return false;
      if (variant !== "All" && item.variant !== variant) return false;
      return true;
    }).sort((a, b) =>
      sortAsc ? a.priceLkr - b.priceLkr : b.priceLkr - a.priceLkr,
    );
  }, [platform, variant, sortAsc]);

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Live MCP Query Snapshot (Nov 18, 2026)
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-card-foreground">
            {view === "s11"
              ? "Samsung Galaxy Tab S11: Ikman vs. Daraz"
              : "What Pollutes Tablet Searches Without Filtering"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {view === "s11"
              ? "Compare listed prices, duplicate Liberty Plaza shop entries, and Daraz listings."
              : "Real items returned by site-wide and category tablet searches before cleanup."}
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-border bg-muted p-1">
          <button
            type="button"
            onClick={() => setView("s11")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              view === "s11"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Tab S11 Listings
          </button>
          <button
            type="button"
            onClick={() => setView("noise")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              view === "noise"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Search Noise
          </button>
        </div>
      </div>

      {view === "s11" ? (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-border pb-4">
            {(["All", "Ikman", "Daraz"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  platform === p
                    ? "border-foreground/30 bg-muted text-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
              </button>
            ))}

            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              aria-label="Filter by variant"
              className="ml-auto rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              {variants.map((v) => (
                <option key={v} value={v}>
                  {v === "All" ? "All Variants" : v}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-3">Platform</th>
                  <th className="py-3 pr-3">Listing &amp; Seller</th>
                  <th className="py-3 pr-3">Variant</th>
                  <th className="py-3 pr-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSortAsc((s) => !s)}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      Price (LKR)
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="py-3 text-right">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {rows.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-xs font-medium",
                          item.platform === "Ikman"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            : "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400",
                        )}
                      >
                        {item.platform}
                      </span>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="font-medium text-foreground">
                        {item.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.seller} ({item.location})
                      </div>
                      <div className="mt-0.5 text-xs text-amber-700 dark:text-amber-300/90">
                        {item.note}
                      </div>
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap text-xs text-muted-foreground">
                      {item.variant}
                    </td>
                    <td className="py-3 pr-3 text-right font-mono font-semibold whitespace-nowrap text-foreground">
                      Rs. {item.priceLkr.toLocaleString()}
                    </td>
                    <td className="py-3 text-right whitespace-nowrap">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${item.title}`}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        View
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          {NOISE_EXAMPLES.map((item) => (
            <div
              key={`${item.platform}-${item.title}`}
              className="flex flex-col justify-between gap-2 rounded-xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <div className="text-xs font-mono text-primary">
                  {item.platform}
                </div>
                <div className="font-medium text-foreground">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  {item.reason}
                </div>
              </div>
              <div className="shrink-0 font-mono text-sm font-bold text-foreground">
                Rs. {item.priceLkr.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
