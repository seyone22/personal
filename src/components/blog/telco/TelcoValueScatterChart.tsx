"use client";

import { useMemo, useState } from "react";
import {
  formatSegment,
  getTierLabel,
  OPERATOR_META,
  type Operator,
  type Segment,
  TARIFF_DATA,
  type TariffPlan,
} from "@/data/sl-tariffs";
import { cn } from "@/lib/utils";

const OPERATORS: Operator[] = ["Dialog", "Mobitel", "Hutch", "Airtel (Dialog)"];

export function TelcoValueScatterChart() {
  const [selectedOp, setSelectedOp] = useState<Operator | "All">("All");
  const [segmentFilter, setSegmentFilter] = useState<Segment | "All">("All");
  const [onlyUnlimitedCalls, setOnlyUnlimitedCalls] = useState(false);
  const [hideExtremeOutliers, setHideExtremeOutliers] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState<TariffPlan | null>(null);

  const filteredPlans = useMemo(() => {
    return TARIFF_DATA.plans.filter((p) => {
      if (selectedOp !== "All" && p.operator !== selectedOp) return false;
      if (segmentFilter !== "All" && p.segment !== segmentFilter) return false;
      if (
        onlyUnlimitedCalls &&
        !p.voice_benefits.toLowerCase().includes("unlimited")
      ) {
        return false;
      }
      if (hideExtremeOutliers && p.cost_per_anytime_gb_lkr > 150) return false;
      return true;
    });
  }, [selectedOp, segmentFilter, onlyUnlimitedCalls, hideExtremeOutliers]);

  const width = 760;
  const height = 380;
  const pad = { top: 24, right: 28, bottom: 48, left: 58 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const maxPrice = useMemo(() => {
    const m = Math.max(
      ...filteredPlans.map((p) => p.effective_30d_price_incl_tax_lkr),
      4000,
    );
    return Math.ceil(m / 1000) * 1000;
  }, [filteredPlans]);

  const maxCostPerGb = useMemo(() => {
    const m = Math.max(
      ...filteredPlans.map((p) => p.cost_per_anytime_gb_lkr),
      60,
    );
    return Math.ceil(m / 20) * 20;
  }, [filteredPlans]);

  const xScale = (price: number) => pad.left + (price / maxPrice) * plotW;
  const yScale = (costPerGb: number) =>
    pad.top + plotH - (costPerGb / maxCostPerGb) * plotH;

  const yTicks = useMemo(() => {
    const step = maxCostPerGb <= 100 ? 20 : 50;
    const ticks: number[] = [];
    for (let v = 0; v <= maxCostPerGb; v += step) ticks.push(v);
    return ticks;
  }, [maxCostPerGb]);

  const xTicks = useMemo(() => {
    const step = maxPrice <= 5000 ? 1000 : 2000;
    const ticks: number[] = [];
    for (let v = 0; v <= maxPrice; v += step) ticks.push(v);
    return ticks;
  }, [maxPrice]);

  const sTierY = yScale(Math.min(34.5, maxCostPerGb));
  const goodTierY = yScale(Math.min(48, maxCostPerGb));

  const activePlan = hoveredPlan ?? filteredPlans[0] ?? null;

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Interactive Scatter Plot
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-card-foreground">
            Monthly Cost vs. Real Rs. per Anytime GB
          </h3>
          <p className="text-sm text-muted-foreground">
            Lower-left is better value. Hover or tap any dot to inspect the
            plan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOnlyUnlimitedCalls((v) => !v)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              onlyUnlimitedCalls
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-muted/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {onlyUnlimitedCalls
              ? "✓ Unlimited Calls Only"
              : "Unlimited Calls Only"}
          </button>
          <button
            type="button"
            onClick={() => setHideExtremeOutliers((v) => !v)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              hideExtremeOutliers
                ? "border-border bg-muted text-foreground"
                : "border-border bg-muted/40 text-muted-foreground hover:text-foreground",
            )}
          >
            {hideExtremeOutliers
              ? "Zoomed (< Rs. 150/GB)"
              : "Showing All (incl. Rs. 247/GB)"}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex flex-wrap gap-1.5">
          {(["All", ...OPERATORS] as const).map((op) => {
            const active = selectedOp === op;
            const meta = op === "All" ? null : OPERATOR_META[op];
            return (
              <button
                key={op}
                type="button"
                onClick={() => setSelectedOp(op)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  active
                    ? "border-foreground/30 bg-muted text-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {meta && (
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: meta.color }}
                  />
                )}
                {op}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["All", "All Segments"],
              ["prepaid", "Prepaid"],
              ["postpaid", "Postpaid"],
              ["prepaid_and_postpaid", "Pre & Post"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setSegmentFilter(val)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs transition-colors",
                segmentFilter === val
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Plot */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[560px] select-none"
          role="img"
          aria-label="Scatter plot of 30-day effective price versus cost per Anytime GB"
        >
          {/* S-Tier Zone */}
          <rect
            x={pad.left}
            y={sTierY}
            width={plotW}
            height={pad.top + plotH - sTierY}
            fill="#10b981"
            fillOpacity={0.08}
          />
          {/* Good Zone */}
          <rect
            x={pad.left}
            y={goodTierY}
            width={plotW}
            height={Math.max(0, sTierY - goodTierY)}
            fill="#0ea5e9"
            fillOpacity={0.05}
          />

          {/* Tier threshold lines */}
          <line
            x1={pad.left}
            x2={pad.left + plotW}
            y1={sTierY}
            y2={sTierY}
            stroke="#10b981"
            strokeOpacity={0.45}
            strokeDasharray="4 4"
          />
          <text
            x={pad.left + plotW - 6}
            y={sTierY - 5}
            textAnchor="end"
            className="fill-emerald-600 font-mono text-[10px] dark:fill-emerald-400/80"
          >
            S-Tier ≤ Rs. 34.50/GB
          </text>

          {/* Grid & Y ticks */}
          {yTicks.map((tick) => {
            const y = yScale(tick);
            return (
              <g key={tick}>
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
                  x={pad.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted-foreground font-mono text-[11px]"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Grid & X ticks */}
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
                  className="text-border"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={pad.top + plotH + 18}
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono text-[11px]"
                >
                  {tick === 0
                    ? "0"
                    : `${(tick / 1000).toFixed(tick % 1000 === 0 ? 0 : 1)}k`}
                </text>
              </g>
            );
          })}

          {/* Axis Labels */}
          <text
            x={pad.left + plotW / 2}
            y={height - 8}
            textAnchor="middle"
            className="fill-muted-foreground text-[11px] font-medium"
          >
            Effective 30-Day Price (LKR Incl. Tax)
          </text>
          <text
            x={16}
            y={pad.top + plotH / 2}
            textAnchor="middle"
            transform={`rotate(-90 16 ${pad.top + plotH / 2})`}
            className="fill-muted-foreground text-[11px] font-medium"
          >
            Rs. / Anytime GB
          </text>

          {/* Data Points */}
          {filteredPlans.map((plan) => {
            const cx = xScale(plan.effective_30d_price_incl_tax_lkr);
            const cy = yScale(plan.cost_per_anytime_gb_lkr);
            const isSelected = activePlan?.id === plan.id;
            const color = OPERATOR_META[plan.operator].color;

            return (
              <g key={plan.id}>
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={11}
                    fill={color}
                    fillOpacity={0.22}
                  />
                )}
                {/* biome-ignore lint/a11y/noStaticElementInteractions: interactive SVG scatter point */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 6.5 : 5}
                  fill={color}
                  fillOpacity={isSelected ? 1 : 0.85}
                  stroke={isSelected ? "currentColor" : "var(--background)"}
                  className={cn(
                    "cursor-pointer transition-all",
                    isSelected && "text-foreground",
                  )}
                  strokeWidth={isSelected ? 2 : 1.2}
                  onMouseEnter={() => setHoveredPlan(plan)}
                  onClick={() => setHoveredPlan(plan)}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Plan Readout */}
      {activePlan ? (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                  OPERATOR_META[activePlan.operator].bgClass,
                  OPERATOR_META[activePlan.operator].textClass,
                  OPERATOR_META[activePlan.operator].borderClass,
                )}
              >
                {activePlan.operator}
              </span>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                  getTierLabel(activePlan.cost_per_anytime_gb_lkr).className,
                )}
              >
                {getTierLabel(activePlan.cost_per_anytime_gb_lkr).label}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatSegment(activePlan.segment)} · {activePlan.validity_days}
                d
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {activePlan.trcsl_ref}
              </span>
            </div>
            <p className="font-semibold text-foreground">
              {activePlan.plan_name}
            </p>
            <p className="text-xs text-muted-foreground">
              Voice: {activePlan.voice_benefits}
              {activePlan.other_data_benefits !== "None" &&
                ` · Extras: ${activePlan.other_data_benefits}`}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-5 border-t border-border pt-3 sm:border-t-0 sm:pt-0">
            <div>
              <div className="text-[11px] uppercase text-muted-foreground">
                30d Cost
              </div>
              <div className="font-mono text-base font-bold text-foreground">
                Rs.{" "}
                {activePlan.effective_30d_price_incl_tax_lkr.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase text-muted-foreground">
                Anytime
              </div>
              <div className="font-mono text-base font-bold text-foreground">
                {activePlan.anytime_gb} GB
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase text-muted-foreground">
                Rs. / GB
              </div>
              <div className="font-mono text-base font-bold text-primary">
                Rs. {activePlan.cost_per_anytime_gb_lkr.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
          No plans match the current filters.
        </div>
      )}
    </div>
  );
}
