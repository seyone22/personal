"use client";

import { ArrowUpDown, ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CAR_MODELS,
  CAR_PLATFORMS,
  type CarModel,
  type CarPlatform,
  formatLkr,
  formatMillions,
  formatSellerType,
  PLATFORM_META,
  USED_CAR_DATA,
} from "@/data/sl-used-cars";
import { cn } from "@/lib/utils";

type ExplorerTab = "clean" | "spreads" | "outliers";

function median(vals: number[]): number | null {
  if (!vals.length) return null;
  const s = [...vals].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? Math.round((s[mid - 1] + s[mid]) / 2) : s[mid];
}

export function CarMarketBreakdownTable() {
  const [tab, setTab] = useState<ExplorerTab>("clean");
  const [modelFilter, setModelFilter] = useState<CarModel | "All">("All");
  const [platformFilter, setPlatformFilter] = useState<CarPlatform | "All">(
    "All",
  );
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [limit, setLimit] = useState(30);

  const cleanRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return USED_CAR_DATA.listings
      .filter((l) => {
        if (l.priceStatus !== "priced" || l.priceLkr === null) return false;
        if (modelFilter !== "All" && l.model !== modelFilter) return false;
        if (platformFilter !== "All" && l.platform !== platformFilter) {
          return false;
        }
        if (
          q &&
          !`${l.title} ${l.district} ${l.sellerLabel}`.toLowerCase().includes(q)
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) =>
        sortAsc
          ? (a.priceLkr ?? 0) - (b.priceLkr ?? 0)
          : (b.priceLkr ?? 0) - (a.priceLkr ?? 0),
      );
  }, [modelFilter, platformFilter, search, sortAsc]);

  const outlierRows = useMemo(() => {
    return USED_CAR_DATA.listings.filter(
      (l) =>
        l.priceStatus === "typo_or_bait" ||
        l.priceStatus === "dummy_price" ||
        l.priceStatus === "lease_hand_price",
    );
  }, []);

  const sameYearSpreads = useMemo(() => {
    const rows: {
      model: CarModel;
      year: number;
      ikmanCount: number;
      ikmanMedian: number;
      cmCount: number;
      cmMedian: number;
      diffLkr: number;
    }[] = [];

    for (const model of CAR_MODELS) {
      const years = Array.from(
        new Set(
          USED_CAR_DATA.listings
            .filter(
              (l) =>
                l.model === model &&
                l.priceStatus === "priced" &&
                l.modelYear !== null,
            )
            .map((l) => l.modelYear as number),
        ),
      ).sort((a, b) => b - a);

      for (const yr of years) {
        const iPrices = USED_CAR_DATA.listings
          .filter(
            (l) =>
              l.platform === "Ikman" &&
              l.model === model &&
              l.modelYear === yr &&
              l.priceStatus === "priced" &&
              l.priceLkr !== null,
          )
          .map((l) => l.priceLkr as number);
        const cPrices = USED_CAR_DATA.listings
          .filter(
            (l) =>
              l.platform === "CarMarket" &&
              l.model === model &&
              l.modelYear === yr &&
              l.priceStatus === "priced" &&
              l.priceLkr !== null,
          )
          .map((l) => l.priceLkr as number);

        if (iPrices.length >= 5 && cPrices.length >= 5) {
          const im = median(iPrices) as number;
          const cm = median(cPrices) as number;
          rows.push({
            model,
            year: yr,
            ikmanCount: iPrices.length,
            ikmanMedian: im,
            cmCount: cPrices.length,
            cmMedian: cm,
            diffLkr: im - cm,
          });
        }
      }
    }
    return rows;
  }, []);

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Multi-Platform Snapshot ({USED_CAR_DATA.metadata.collectionDate})
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-card-foreground">
            {tab === "clean"
              ? `Priced Vehicle Listings (${cleanRows.length} matching)`
              : tab === "spreads"
                ? "Same-Year Median Spreads: Ikman vs. CarMarket"
                : `Price Typos & Bait Outliers (${outlierRows.length} flagged)`}
          </h3>
          <p className="text-sm text-muted-foreground">
            {tab === "clean"
              ? "Filter across Ikman.lk, CarMarket.lk, and HitAd.lk. Phone numbers excluded for privacy."
              : tab === "spreads"
                ? "Comparing identical model years with at least 5 clean priced listings on both platforms."
                : "Listings with impossible prices (missing zeros or lakh shorthand) caught on CarMarket.lk."}
          </p>
        </div>

        <div className="inline-flex flex-wrap rounded-lg border border-border bg-muted p-1">
          {(
            [
              ["clean", "Clean Listings"],
              ["spreads", "Ikman vs. CarMarket"],
              ["outliers", `Typos / Bait (${outlierRows.length})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                tab === id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "clean" && (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-border pb-4">
            <div className="relative min-w-[200px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setLimit(30);
                }}
                placeholder="Search title, district, or dealer..."
                className="w-full rounded-lg border border-border bg-background py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <select
              value={modelFilter}
              onChange={(e) => {
                setModelFilter(e.target.value as CarModel | "All");
                setLimit(30);
              }}
              aria-label="Filter by model"
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              <option value="All">All 4 Models</option>
              {CAR_MODELS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={platformFilter}
              onChange={(e) => {
                setPlatformFilter(e.target.value as CarPlatform | "All");
                setLimit(30);
              }}
              aria-label="Filter by platform"
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              <option value="All">All Platforms</option>
              {CAR_PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setSortAsc((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              {sortAsc ? "Cheapest First" : "Expensive First"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2.5 pr-3">Platform</th>
                  <th className="py-2.5 pr-3">Listing</th>
                  <th className="py-2.5 pr-3">Year</th>
                  <th className="py-2.5 pr-3">District</th>
                  <th className="py-2.5 pr-3">Seller</th>
                  <th className="py-2.5 pr-3 text-right">Asking Price</th>
                  <th className="py-2.5 text-right">Ad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {cleanRows.slice(0, limit).map((row) => (
                  <tr key={row.id} className="hover:bg-muted/30">
                    <td className="py-2.5 pr-3">
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold",
                          PLATFORM_META[row.platform].badge,
                        )}
                      >
                        {row.platform}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 font-medium text-card-foreground">
                      <div>{row.title}</div>
                      {row.mileageKm !== null && (
                        <div className="font-mono text-[11px] text-muted-foreground">
                          {row.mileageKm.toLocaleString()} km
                          {row.fuel ? ` · ${row.fuel}` : ""}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-xs text-muted-foreground">
                      {row.modelYear ?? "—"}
                    </td>
                    <td className="py-2.5 pr-3 text-xs text-muted-foreground">
                      {row.district}
                    </td>
                    <td className="py-2.5 pr-3 text-xs text-muted-foreground">
                      {row.platform === "Ikman"
                        ? formatSellerType(row.sellerType)
                        : "—"}
                    </td>
                    <td className="py-2.5 pr-3 text-right font-mono text-xs font-semibold text-foreground">
                      {formatMillions(row.priceLkr)}
                    </td>
                    <td className="py-2.5 text-right">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${row.title}`}
                        className="inline-flex text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {cleanRows.length > limit && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setLimit((n) => n + 40)}
                className="rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Show more ({cleanRows.length - limit} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {tab === "spreads" && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2.5 pr-3">Model</th>
                <th className="py-2.5 pr-3">Year</th>
                <th className="py-2.5 pr-3 text-right">Ikman Median (n)</th>
                <th className="py-2.5 pr-3 text-right">CarMarket Median (n)</th>
                <th className="py-2.5 text-right">Ikman vs. CarMarket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {sameYearSpreads.map((r) => (
                <tr key={`${r.model}-${r.year}`} className="hover:bg-muted/30">
                  <td className="py-2.5 pr-3 font-medium text-card-foreground">
                    {r.model}
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-xs text-muted-foreground">
                    {r.year}
                  </td>
                  <td className="py-2.5 pr-3 text-right font-mono text-xs">
                    {formatMillions(r.ikmanMedian)}{" "}
                    <span className="text-muted-foreground">
                      ({r.ikmanCount})
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-right font-mono text-xs">
                    {formatMillions(r.cmMedian)}{" "}
                    <span className="text-muted-foreground">({r.cmCount})</span>
                  </td>
                  <td
                    className={cn(
                      "py-2.5 text-right font-mono text-xs font-semibold",
                      r.diffLkr < 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-amber-600 dark:text-amber-400",
                    )}
                  >
                    {r.diffLkr < 0 ? "" : "+"}
                    {(r.diffLkr / 100_000).toFixed(1)}L
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "outliers" && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2.5 pr-3">Platform</th>
                <th className="py-2.5 pr-3">Listing</th>
                <th className="py-2.5 pr-3 text-right">Listed Price</th>
                <th className="py-2.5 pr-3">Why Flagged</th>
                <th className="py-2.5 text-right">Ad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {outlierRows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/30">
                  <td className="py-2.5 pr-3">
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold",
                        PLATFORM_META[row.platform].badge,
                      )}
                    >
                      {row.platform}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 font-medium text-card-foreground">
                    {row.title}
                  </td>
                  <td className="py-2.5 pr-3 text-right font-mono text-xs font-semibold text-destructive">
                    {formatLkr(row.priceLkr)}
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-muted-foreground">
                    {row.baitSnippet ?? "Impossible price outlier"}
                  </td>
                  <td className="py-2.5 text-right">
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${row.title}`}
                      className="inline-flex text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
