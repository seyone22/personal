"use client";

import { useMemo, useState } from "react";
import rawData from "@/data/sl-grocery-history.json";
import { cn } from "@/lib/utils";

interface PricePoint {
  date: string;
  label: string;
  price: number;
}

interface SeriesItem {
  id: string;
  label: string;
  unit: string;
  color: string;
  points: PricePoint[];
}

interface GroceryDataset {
  generatedAt: string;
  cbslCcpi2026: { month: string; headline: number; food: number | null }[];
  series: SeriesItem[];
}

const DATA = rawData as GroceryDataset;

type ChartMode = "pct" | "lkr";

export function GroceryInflationChart() {
  const [mode, setMode] = useState<ChartMode>("pct");
  const [enabledIds, setEnabledIds] = useState<string[]>([
    "lime-cargills",
    "chili-spar",
    "coconut-spar",
    "dhal-spar",
    "rice-ponni",
  ]);
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const toggleSeries = (id: string) => {
    setEnabledIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((x) => x !== id)
          : prev
        : [...prev, id],
    );
  };

  const activeSeries = useMemo(
    () => DATA.series.filter((s) => enabledIds.includes(s.id)),
    [enabledIds],
  );

  const allDates = useMemo(() => {
    const set = new Set<string>();
    for (const s of activeSeries) {
      for (const p of s.points) set.add(p.date);
    }
    return Array.from(set).sort();
  }, [activeSeries]);

  const transformed = useMemo(() => {
    return activeSeries.map((s) => {
      const base = s.points[0]?.price ?? 1;
      return {
        ...s,
        values: s.points.map((p) => ({
          date: p.date,
          label: p.label,
          raw: p.price,
          val: mode === "pct" ? ((p.price - base) / base) * 100 : p.price,
        })),
      };
    });
  }, [activeSeries, mode]);

  const { minY, maxY } = useMemo(() => {
    let min = mode === "pct" ? -10 : 0;
    let max = mode === "pct" ? 20 : 500;
    for (const s of transformed) {
      for (const v of s.values) {
        if (v.val < min) min = v.val;
        if (v.val > max) max = v.val;
      }
    }
    const padSpan = (max - min) * 0.1 || 10;
    return {
      minY: mode === "pct" ? Math.floor((min - padSpan) / 10) * 10 : 0,
      maxY:
        mode === "pct"
          ? Math.ceil((max + padSpan) / 10) * 10
          : Math.ceil((max + padSpan) / 100) * 100,
    };
  }, [transformed, mode]);

  const width = 760;
  const height = 360;
  const pad = { top: 24, right: 24, bottom: 42, left: 60 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const dateToX = (date: string) => {
    if (allDates.length <= 1) return pad.left;
    const idx = allDates.indexOf(date);
    return pad.left + (idx / (allDates.length - 1)) * plotW;
  };

  const valToY = (v: number) => {
    const span = maxY - minY || 1;
    return pad.top + plotH - ((v - minY) / span) * plotH;
  };

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const count = 5;
    const step = (maxY - minY) / count;
    for (let i = 0; i <= count; i++) {
      ticks.push(Math.round(minY + step * i));
    }
    return ticks;
  }, [minY, maxY]);

  const xTickDates = useMemo(() => {
    if (allDates.length <= 5) return allDates;
    const step = Math.floor((allDates.length - 1) / 4);
    return [
      allDates[0],
      allDates[step],
      allDates[step * 2],
      allDates[step * 3],
      allDates[allDates.length - 1],
    ];
  }, [allDates]);

  const cbslY = mode === "pct" ? valToY(8.8) : null;
  const zeroY = mode === "pct" ? valToY(0) : null;

  const activeDate = hoverDate ?? allDates[allDates.length - 1] ?? null;

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Supermarket Price History vs. CBSL CCPI
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-card-foreground">
            {mode === "pct"
              ? "Price Change (%) Since First Observed Date"
              : "Retail Price (LKR) Over Time"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Toggle items below or switch between % change and raw LKR prices.
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-border bg-muted p-1">
          <button
            type="button"
            onClick={() => setMode("pct")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              mode === "pct"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            % Change
          </button>
          <button
            type="button"
            onClick={() => setMode("lkr")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              mode === "lkr"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            LKR Price
          </button>
        </div>
      </div>

      {/* Series Toggles */}
      <div className="mb-4 flex flex-wrap gap-2 border-b border-border pb-4">
        {DATA.series.map((s) => {
          const active = enabledIds.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleSeries(s.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                active
                  ? "border-foreground/30 bg-muted text-foreground"
                  : "border-border bg-background text-muted-foreground opacity-60 hover:opacity-100",
              )}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* SVG Line Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[560px] select-none"
          role="img"
          aria-label="Historical supermarket price chart"
          onMouseLeave={() => setHoverDate(null)}
        >
          {/* Y Grid */}
          {yTicks.map((t) => {
            const y = valToY(t);
            return (
              <g key={t}>
                <line
                  x1={pad.left}
                  x2={pad.left + plotW}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  className="text-border"
                  strokeWidth={1}
                />
                <text
                  x={pad.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted-foreground font-mono text-[11px]"
                >
                  {mode === "pct" ? `${t > 0 ? "+" : ""}${t}%` : `Rs.${t}`}
                </text>
              </g>
            );
          })}

          {/* Zero line in pct mode */}
          {zeroY !== null && (
            <line
              x1={pad.left}
              x2={pad.left + plotW}
              y1={zeroY}
              y2={zeroY}
              stroke="currentColor"
              className="text-muted-foreground/40"
              strokeWidth={1}
            />
          )}

          {/* CBSL Oct 2026 Food Inflation Reference Line */}
          {cbslY !== null && (
            <g>
              <line
                x1={pad.left}
                x2={pad.left + plotW}
                y1={cbslY}
                y2={cbslY}
                stroke="#e11d48"
                strokeWidth={1.5}
                strokeDasharray="5 4"
              />
              <text
                x={pad.left + plotW - 4}
                y={cbslY - 6}
                textAnchor="end"
                className="fill-rose-600 font-mono text-[10px] dark:fill-rose-400"
              >
                CBSL Oct 2026 Food Inflation (+8.8%)
              </text>
            </g>
          )}

          {/* X Axis labels */}
          {xTickDates.map((d) => {
            const x = dateToX(d);
            return (
              <text
                key={d}
                x={x}
                y={pad.top + plotH + 20}
                textAnchor="middle"
                className="fill-muted-foreground font-mono text-[10px]"
              >
                {d.slice(5)}
              </text>
            );
          })}

          {/* Series Paths */}
          {transformed.map((s) => {
            if (s.values.length < 2) return null;
            const pathD = s.values
              .map(
                (v, i) =>
                  `${i === 0 ? "M" : "L"}${dateToX(v.date).toFixed(1)},${valToY(v.val).toFixed(1)}`,
              )
              .join(" ");
            return (
              <path
                key={s.id}
                d={pathD}
                fill="none"
                stroke={s.color}
                strokeWidth={2.2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}

          {/* Hover vertical cursor */}
          {activeDate && (
            <line
              x1={dateToX(activeDate)}
              x2={dateToX(activeDate)}
              y1={pad.top}
              y2={pad.top + plotH}
              stroke="currentColor"
              className="text-foreground/25"
              strokeDasharray="3 3"
            />
          )}

          {/* Invisible hover columns for smooth scrubbing */}
          {allDates.map((d, idx) => {
            const x = dateToX(d);
            const colW =
              allDates.length > 1 ? plotW / (allDates.length - 1) : plotW;
            return (
              // biome-ignore lint/a11y/noStaticElementInteractions: interactive SVG hover scrubbing column
              <rect
                key={d}
                x={idx === 0 ? pad.left : x - colW / 2}
                y={pad.top}
                width={colW}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setHoverDate(d)}
              />
            );
          })}
        </svg>
      </div>

      {/* Hover / Latest Readout */}
      {activeDate && (
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-2 font-mono text-xs text-muted-foreground">
            Date:{" "}
            <span className="font-semibold text-foreground">{activeDate}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {transformed.map((s) => {
              const pt =
                s.values.find((v) => v.date === activeDate) ??
                s.values.filter((v) => v.date <= activeDate).slice(-1)[0];
              if (!pt) return null;
              const base = s.points[0]?.price ?? pt.raw;
              const pct = ((pt.raw - base) / base) * 100;
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-border/70 bg-background px-3 py-2 text-xs"
                >
                  <span className="flex items-center gap-2 truncate font-medium text-foreground">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="truncate">{s.label}</span>
                  </span>
                  <span className="ml-2 shrink-0 font-mono">
                    <span className="font-semibold text-foreground">
                      Rs. {pt.raw.toLocaleString()}
                    </span>{" "}
                    <span
                      className={cn(
                        pct > 0
                          ? "text-rose-600 dark:text-rose-400"
                          : pct < 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-muted-foreground",
                      )}
                    >
                      ({pct > 0 ? "+" : ""}
                      {pct.toFixed(1)}%)
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
