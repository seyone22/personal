"use client";

import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CAR_MODELS,
  CAR_PLATFORMS,
  type CarListing,
  type CarModel,
  type CarPlatform,
  formatLkr,
  formatMillions,
  formatSellerType,
  PLATFORM_META,
  USED_CAR_DATA,
} from "@/data/sl-used-cars";
import { cn } from "@/lib/utils";

type XAxisMode = "year" | "mileage";

function computeMedian(values: number[]): number {
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? Math.round((s[mid - 1] + s[mid]) / 2) : s[mid];
}

export function CarPriceScatterChart() {
  const [selectedModel, setSelectedModel] =
    useState<CarModel>("Suzuki Wagon R");
  const [selectedPlatform, setSelectedPlatform] = useState<CarPlatform | "All">(
    "All",
  );
  const [xMode, setXMode] = useState<XAxisMode>("year");
  const [hideDealers, setHideDealers] = useState(false);
  const [hideBait, setHideBait] = useState(true);
  const [hovered, setHovered] = useState<CarListing | null>(null);

  const modelRows = useMemo(() => {
    return USED_CAR_DATA.listings.filter(
      (l) => l.model === selectedModel && l.priceLkr !== null,
    );
  }, [selectedModel]);

  const hiddenBaitCount = useMemo(() => {
    return modelRows.filter(
      (l) =>
        l.priceStatus === "typo_or_bait" ||
        l.priceStatus === "dummy_price" ||
        l.priceStatus === "lease_hand_price",
    ).length;
  }, [modelRows]);

  const filteredPoints = useMemo(() => {
    return modelRows.filter((l) => {
      if (selectedPlatform !== "All" && l.platform !== selectedPlatform) {
        return false;
      }
      if (
        hideDealers &&
        (l.sellerType === "member_dealer" || l.sellerType === "stealth_dealer")
      ) {
        return false;
      }
      if (
        hideBait &&
        (l.priceStatus === "typo_or_bait" ||
          l.priceStatus === "dummy_price" ||
          l.priceStatus === "lease_hand_price")
      ) {
        return false;
      }
      if (xMode === "year") {
        return (
          l.modelYear !== null && l.modelYear >= 2008 && l.modelYear <= 2026
        );
      }
      return l.mileageKm !== null && l.mileageKm <= 250_000;
    });
  }, [modelRows, selectedPlatform, hideDealers, hideBait, xMode]);

  const width = 760;
  const height = 390;
  const pad = { top: 26, right: 28, bottom: 48, left: 68 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const { minX, maxX, minY, maxY, xTicks, yTicks } = useMemo(() => {
    const prices = filteredPoints
      .map((p) => p.priceLkr ?? 0)
      .filter((v) => v > 0);
    const rawMinY = prices.length ? Math.min(...prices) : 0;
    const rawMaxY = prices.length ? Math.max(...prices) : 20_000_000;
    const yFloor = hideBait
      ? Math.max(0, Math.floor(rawMinY / 2_000_000) * 2_000_000)
      : 0;
    const yCeil = Math.max(
      yFloor + 2_000_000,
      Math.ceil(rawMaxY / 2_000_000) * 2_000_000,
    );

    const yStep = yCeil - yFloor <= 8_000_000 ? 2_000_000 : 4_000_000;
    const yt: number[] = [];
    for (let v = yFloor; v <= yCeil; v += yStep) yt.push(v);

    if (xMode === "year") {
      const years = filteredPoints
        .map((p) => p.modelYear ?? 2015)
        .filter((y) => y >= 2008);
      const xMin = years.length ? Math.min(2014, Math.min(...years)) : 2010;
      const xMax = 2026;
      const xt: number[] = [];
      for (let y = xMin; y <= xMax; y += 2) xt.push(y);
      if (xt[xt.length - 1] !== xMax) xt.push(xMax);
      return {
        minX: xMin,
        maxX: xMax,
        minY: yFloor,
        maxY: yCeil,
        xTicks: xt,
        yTicks: yt,
      };
    }

    const kms = filteredPoints.map((p) => p.mileageKm ?? 0);
    const kmMax = kms.length
      ? Math.max(100_000, Math.ceil(Math.max(...kms) / 25_000) * 25_000)
      : 150_000;
    const kmStep = kmMax <= 125_000 ? 25_000 : 50_000;
    const xt: number[] = [];
    for (let k = 0; k <= kmMax; k += kmStep) xt.push(k);
    return {
      minX: 0,
      maxX: kmMax,
      minY: yFloor,
      maxY: yCeil,
      xTicks: xt,
      yTicks: yt,
    };
  }, [filteredPoints, xMode, hideBait]);

  const xScale = (val: number) =>
    pad.left + ((val - minX) / Math.max(1, maxX - minX)) * plotW;
  const yScale = (price: number) =>
    pad.top + plotH - ((price - minY) / Math.max(1, maxY - minY)) * plotH;

  // Compute median line per model year (when in year mode)
  const medianLinePath = useMemo(() => {
    if (xMode !== "year") return "";
    const byYr = new Map<number, number[]>();
    for (const p of filteredPoints) {
      if (
        p.modelYear === null ||
        p.priceLkr === null ||
        p.priceStatus !== "priced"
      ) {
        continue;
      }
      const list = byYr.get(p.modelYear) ?? [];
      list.push(p.priceLkr);
      byYr.set(p.modelYear, list);
    }
    const pts = [...byYr.entries()]
      .filter(([, vals]) => vals.length >= 2)
      .sort((a, b) => a[0] - b[0])
      .map(([yr, vals]) => ({
        x: pad.left + ((yr - minX) / Math.max(1, maxX - minX)) * plotW,
        y:
          pad.top +
          plotH -
          ((computeMedian(vals) - minY) / Math.max(1, maxY - minY)) * plotH,
      }));
    if (pts.length < 2) return "";
    return pts
      .map(
        (pt, i) =>
          `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`,
      )
      .join(" ");
  }, [filteredPoints, xMode, minX, maxX, minY, maxY, plotW, plotH]);

  // Deterministic slight x-jitter per listing id so stacked year dots remain visible
  const jitter = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash * 31 + id.charCodeAt(i)) | 0;
    }
    return ((hash % 100) / 100 - 0.5) * (xMode === "year" ? 12 : 4);
  };

  const active = hovered ?? filteredPoints[0] ?? null;

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Interactive Scatter Plot (n = {filteredPoints.length})
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-card-foreground">
            {selectedModel}: Asking Price vs.{" "}
            {xMode === "year" ? "Model Year" : "Verified Mileage"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {xMode === "year"
              ? "Shaded band marks Sri Lanka's 2019–2022 vehicle import ban. Dashed line traces clean annual medians."
              : "Mileage points come from detail-enriched Ikman listings with verified odometer specs."}
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-border bg-muted p-1">
          <button
            type="button"
            onClick={() => {
              setXMode("year");
              setHovered(null);
            }}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              xMode === "year"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            By Model Year
          </button>
          <button
            type="button"
            onClick={() => {
              setXMode("mileage");
              setHovered(null);
            }}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              xMode === "mileage"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            By Mileage (km)
          </button>
        </div>
      </div>

      {/* Model tabs */}
      <div className="mb-3 flex flex-wrap gap-2">
        {CAR_MODELS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setSelectedModel(m);
              setHovered(null);
            }}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
              selectedModel === m
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Platform & filter pills */}
      <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-border pb-4">
        {(["All", ...CAR_PLATFORMS] as const).map((plat) => (
          <button
            key={plat}
            type="button"
            onClick={() => {
              setSelectedPlatform(plat);
              setHovered(null);
            }}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              selectedPlatform === plat
                ? "border-foreground/30 bg-muted text-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            {plat === "All" ? "All Platforms" : plat}
          </button>
        ))}

        <div className="ml-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setHideDealers((v) => !v)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              hideDealers
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-muted/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {hideDealers ? "✓ Hide Ikman Dealers" : "Hide Ikman Dealers"}
          </button>

          {hiddenBaitCount > 0 && (
            <button
              type="button"
              onClick={() => setHideBait((v) => !v)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                hideBait
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-destructive/40 bg-destructive/10 text-destructive",
              )}
            >
              {hideBait
                ? `✓ Hiding ${hiddenBaitCount} Typo/Bait`
                : `Showing ${hiddenBaitCount} Typo/Bait`}
            </button>
          )}
        </div>
      </div>

      {/* SVG Plot */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[540px]"
          role="img"
          aria-label={`Scatter plot of ${selectedModel} asking prices`}
        >
          {/* 2019-2022 Import Ban shaded band */}
          {xMode === "year" && minX <= 2019 && maxX >= 2022 && (
            <g>
              <rect
                x={xScale(2018.6)}
                y={pad.top}
                width={xScale(2022.4) - xScale(2018.6)}
                height={plotH}
                fill="currentColor"
                className="text-amber-500/10"
              />
              <text
                x={(xScale(2018.6) + xScale(2022.4)) / 2}
                y={pad.top + 14}
                textAnchor="middle"
                className="fill-amber-600 font-mono text-[10px] dark:fill-amber-400"
              >
                Import Ban (2019–2022)
              </text>
            </g>
          )}

          {/* Horizontal gridlines & Y ticks */}
          {yTicks.map((tick) => {
            const y = yScale(tick);
            return (
              <g key={tick}>
                <line
                  x1={pad.left}
                  x2={width - pad.right}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray="3 4"
                  className="text-border/70"
                />
                <text
                  x={pad.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted-foreground font-mono text-[11px]"
                >
                  {(tick / 1_000_000).toFixed(0)}M
                </text>
              </g>
            );
          })}

          {/* Vertical ticks */}
          {xTicks.map((tick) => {
            const x = xScale(tick);
            return (
              <g key={tick}>
                <line
                  x1={x}
                  x2={x}
                  y1={pad.top}
                  y2={pad.top + plotH}
                  stroke="currentColor"
                  className="text-border/40"
                />
                <text
                  x={x}
                  y={height - 16}
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono text-[11px]"
                >
                  {xMode === "year" ? tick : `${Math.round(tick / 1000)}k`}
                </text>
              </g>
            );
          })}

          {/* Axis labels */}
          <text
            x={pad.left + plotW / 2}
            y={height - 2}
            textAnchor="middle"
            className="fill-muted-foreground text-[11px] font-medium"
          >
            {xMode === "year" ? "Model Year" : "Odometer Mileage (km)"}
          </text>
          <text
            x={16}
            y={pad.top + plotH / 2}
            textAnchor="middle"
            transform={`rotate(-90 16 ${pad.top + plotH / 2})`}
            className="fill-muted-foreground text-[11px] font-medium"
          >
            Asking Price (LKR)
          </text>

          {/* Dashed median line */}
          {medianLinePath && (
            <path
              d={medianLinePath}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeDasharray="5 4"
              className="text-foreground/70"
            />
          )}

          {/* Data dots */}
          {filteredPoints.map((pt) => {
            const rawX =
              xMode === "year" ? (pt.modelYear ?? 2020) : (pt.mileageKm ?? 0);
            const cx = xScale(rawX) + jitter(pt.id);
            const cy = yScale(pt.priceLkr ?? 0);
            const isSelected = active?.id === pt.id;
            const isOutlier = pt.priceStatus === "typo_or_bait";
            const fill = isOutlier
              ? "#ef4444"
              : PLATFORM_META[pt.platform].color;

            return (
              // biome-ignore lint/a11y/useSemanticElements: SVG circle data point inside scatter plot
              <circle
                key={pt.id}
                role="button"
                tabIndex={0}
                aria-label={`${pt.title} — ${formatMillions(pt.priceLkr)}`}
                cx={cx}
                cy={cy}
                r={isSelected ? 7 : isOutlier ? 5.5 : 4.5}
                fill={fill}
                fillOpacity={isSelected ? 1 : 0.72}
                stroke={isSelected ? "currentColor" : "none"}
                strokeWidth={isSelected ? 2 : 0}
                className="cursor-pointer text-foreground transition-all focus:outline-none"
                onMouseEnter={() => setHovered(pt)}
                onFocus={() => setHovered(pt)}
                onClick={() => setHovered(pt)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setHovered(pt);
                  }
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        {CAR_PLATFORMS.map((p) => (
          <span key={p} className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: PLATFORM_META[p].color }}
            />
            {p}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          Typo / Bait Outlier
        </span>
      </div>

      {/* Inspection card */}
      {active && (
        <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-border bg-muted/40 p-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase",
                  PLATFORM_META[active.platform].badge,
                )}
              >
                {active.platform}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {active.modelYear ?? "Year N/A"} · {active.district}
                {active.mileageKm !== null
                  ? ` · ${active.mileageKm.toLocaleString()} km`
                  : ""}
              </span>
              {active.platform === "Ikman" && (
                <span className="rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {formatSellerType(active.sellerType)}
                </span>
              )}
            </div>
            <p className="font-semibold text-card-foreground">{active.title}</p>
            {active.baitSnippet && (
              <p className="text-xs text-destructive">{active.baitSnippet}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-mono text-lg font-bold text-primary">
                {formatMillions(active.priceLkr)}
              </div>
              <div className="font-mono text-[11px] text-muted-foreground">
                {formatLkr(active.priceLkr)}
              </div>
            </div>
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View Ad <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
