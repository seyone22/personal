"use client";

import { useMemo, useState } from "react";
import rawData from "@/data/sl-lime-chili-2026.json";
import { cn } from "@/lib/utils";

interface Point {
  date: string;
  price: number;
  rawPrice: number;
}

interface SkuSeries {
  id: string;
  store: string;
  name: string;
  pack: string;
  mult: number;
  points: Point[];
}

interface Dataset {
  generatedAt: string;
  limes: SkuSeries[];
  chilis: SkuSeries[];
}

const DATA = rawData as Dataset;

const STORE_COLORS = [
  "#10b981", // emerald
  "#ef4444", // red
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#8b5cf6", // violet
];

type CropTab = "limes" | "chilis";

export function LimeChiliChart() {
  const [crop, setCrop] = useState<CropTab>("limes");
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const series = useMemo(() => {
    const list = crop === "limes" ? DATA.limes : DATA.chilis;
    return list.map((s, idx) => ({
      ...s,
      color: STORE_COLORS[idx % STORE_COLORS.length],
      displayName: `${s.store} (${s.name}, ${s.pack})`,
    }));
  }, [crop]);

  const activeSeries = useMemo(
    () => series.filter((s) => !hiddenIds.includes(s.id)),
    [series, hiddenIds],
  );

  const toggleSeries = (id: string) => {
    setHiddenIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : activeSeries.length > 1
          ? [...prev, id]
          : prev,
    );
  };

  const allDates = useMemo(() => {
    const set = new Set<string>();
    for (const s of activeSeries) {
      for (const p of s.points) set.add(p.date);
    }
    return Array.from(set).sort();
  }, [activeSeries]);

  const maxY = useMemo(() => {
    let m = 500;
    for (const s of activeSeries) {
      for (const p of s.points) {
        if (p.price > m) m = p.price;
      }
    }
    return Math.ceil((m * 1.08) / 500) * 500;
  }, [activeSeries]);

  const width = 760;
  const height = 360;
  const pad = { top: 26, right: 24, bottom: 42, left: 64 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const dateToX = (date: string) => {
    if (allDates.length <= 1) return pad.left;
    const idx = allDates.indexOf(date);
    return pad.left + (idx / (allDates.length - 1)) * plotW;
  };

  const valToY = (v: number) => pad.top + plotH - (v / maxY) * plotH;

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = maxY / 5;
    for (let i = 0; i <= 5; i++) ticks.push(Math.round(step * i));
    return ticks;
  }, [maxY]);

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

  const activeDate = hoverDate ?? allDates[allDates.length - 1] ?? null;
  const july23X = allDates.includes("2026-07-23")
    ? dateToX("2026-07-23")
    : null;

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Normalized to LKR per kg (Mar–Nov 2026)
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-card-foreground">
            {crop === "limes"
              ? "Lime (Dehi) Across 5 Supermarket SKUs"
              : "Green Chili (Amu Miris) Across 5 Supermarket SKUs"}
          </h3>
          <p className="text-sm text-muted-foreground">
            All packs normalized to Rs. / kg. Hover across dates to compare
            chains side by side.
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-border bg-muted p-1">
          <button
            type="button"
            onClick={() => {
              setCrop("limes");
              setHiddenIds([]);
              setHoverDate(null);
            }}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              crop === "limes"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Lime (Dehi)
          </button>
          <button
            type="button"
            onClick={() => {
              setCrop("chilis");
              setHiddenIds([]);
              setHoverDate(null);
            }}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              crop === "chilis"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Green Chili
          </button>
        </div>
      </div>

      {/* SKU Toggles */}
      <div className="mb-4 flex flex-wrap gap-2 border-b border-border pb-4">
        {series.map((s) => {
          const active = !hiddenIds.includes(s.id);
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
              {s.displayName}
            </button>
          );
        })}
      </div>

      {/* SVG Plot */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[560px] select-none"
          role="img"
          aria-label="Normalized LKR per kg price chart"
          onMouseLeave={() => setHoverDate(null)}
        >
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
                  Rs.{t}
                </text>
              </g>
            );
          })}

          {/* July 23 Spike Marker for Green Chili */}
          {crop === "chilis" && july23X !== null && (
            <g>
              <line
                x1={july23X}
                x2={july23X}
                y1={pad.top}
                y2={pad.top + plotH}
                stroke="#ef4444"
                strokeWidth={1.2}
                strokeDasharray="4 4"
              />
              <text
                x={july23X + 6}
                y={pad.top + 14}
                className="fill-rose-600 font-mono text-[10px] dark:fill-rose-400"
              >
                Jul 23 peak across all chains
              </text>
            </g>
          )}

          {xTickDates.map((d) => (
            <text
              key={d}
              x={dateToX(d)}
              y={pad.top + plotH + 20}
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[10px]"
            >
              {d.slice(5)}
            </text>
          ))}

          {activeSeries.map((s) => {
            if (s.points.length < 2) return null;
            const pathD = s.points
              .map(
                (p, i) =>
                  `${i === 0 ? "M" : "L"}${dateToX(p.date).toFixed(1)},${valToY(p.price).toFixed(1)}`,
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

      {/* Hover Readout */}
      {activeDate && (
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-2 font-mono text-xs text-muted-foreground">
            Date:{" "}
            <span className="font-semibold text-foreground">{activeDate}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {activeSeries.map((s) => {
              const pt =
                s.points.find((p) => p.date === activeDate) ??
                s.points.filter((p) => p.date <= activeDate).slice(-1)[0];
              if (!pt) return null;
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
                    <span className="truncate">{s.displayName}</span>
                  </span>
                  <span className="ml-2 shrink-0 font-mono font-semibold text-foreground">
                    Rs. {pt.price.toLocaleString()} / kg
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
