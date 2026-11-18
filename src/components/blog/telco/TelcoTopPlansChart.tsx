"use client";

import { useMemo, useState } from "react";
import { formatSegment, OPERATOR_META, TARIFF_DATA } from "@/data/sl-tariffs";
import { cn } from "@/lib/utils";

type ViewMode = "best" | "worst";
type BudgetCap = "all" | 1500 | 2500 | 4000;

export function TelcoTopPlansChart() {
  const [mode, setMode] = useState<ViewMode>("best");
  const [budgetCap, setBudgetCap] = useState<BudgetCap>("all");
  const [unlimitedVoiceOnly, setUnlimitedVoiceOnly] = useState(false);

  const plans = useMemo(() => {
    const filtered = TARIFF_DATA.plans.filter((p) => {
      if (
        budgetCap !== "all" &&
        p.effective_30d_price_incl_tax_lkr > budgetCap
      ) {
        return false;
      }
      if (
        unlimitedVoiceOnly &&
        !p.voice_benefits.toLowerCase().includes("unlimited")
      ) {
        return false;
      }
      return true;
    });

    const sorted = [...filtered].sort((a, b) =>
      mode === "best"
        ? a.cost_per_anytime_gb_lkr - b.cost_per_anytime_gb_lkr
        : b.cost_per_anytime_gb_lkr - a.cost_per_anytime_gb_lkr,
    );

    return sorted.slice(0, 10);
  }, [mode, budgetCap, unlimitedVoiceOnly]);

  const maxVal = useMemo(() => {
    return Math.max(...plans.map((p) => p.cost_per_anytime_gb_lkr), 40);
  }, [plans]);

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Value Ranking
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-card-foreground">
            {mode === "best"
              ? "Top 10 Lowest Rs. / Anytime GB Plans"
              : "Top 10 Highest Rs. / Anytime GB Plans"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Filter by monthly budget or voice requirement to see what wins.
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-border bg-muted p-1">
          <button
            type="button"
            onClick={() => setMode("best")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              mode === "best"
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Best Value
          </button>
          <button
            type="button"
            onClick={() => setMode("worst")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              mode === "worst"
                ? "bg-rose-500/20 text-rose-700 dark:text-rose-400"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Most Expensive / GB
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-border pb-4">
        <span className="mr-1 text-xs text-muted-foreground">30d Budget:</span>
        {(
          [
            ["all", "Any"],
            [1500, "≤ Rs. 1,500"],
            [2500, "≤ Rs. 2,500"],
            [4000, "≤ Rs. 4,000"],
          ] as const
        ).map(([cap, label]) => (
          <button
            key={String(cap)}
            type="button"
            onClick={() => setBudgetCap(cap)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              budgetCap === cap
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setUnlimitedVoiceOnly((v) => !v)}
          className={cn(
            "ml-auto rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            unlimitedVoiceOnly
              ? "border-primary bg-primary/15 text-primary"
              : "border-border bg-background text-muted-foreground hover:text-foreground",
          )}
        >
          {unlimitedVoiceOnly ? "✓ Unlimited Calls" : "Unlimited Calls"}
        </button>
      </div>

      {/* Horizontal Bars */}
      <div className="space-y-3">
        {plans.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No plans match this budget + voice combination.
          </p>
        ) : (
          plans.map((plan, idx) => {
            const pct = Math.max(
              4,
              (plan.cost_per_anytime_gb_lkr / maxVal) * 100,
            );
            const meta = OPERATOR_META[plan.operator];
            return (
              <div key={plan.id} className="group space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="w-5 font-mono text-muted-foreground">
                      #{idx + 1}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium",
                        meta.bgClass,
                        meta.textClass,
                      )}
                    >
                      {plan.operator}
                    </span>
                    <span className="truncate font-medium text-foreground">
                      {plan.plan_name}
                    </span>
                    <span className="hidden text-muted-foreground sm:inline">
                      ({formatSegment(plan.segment)})
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 font-mono">
                    <span className="text-muted-foreground">
                      Rs.{" "}
                      {Math.round(
                        plan.effective_30d_price_incl_tax_lkr,
                      ).toLocaleString()}{" "}
                      · {plan.anytime_gb} GB
                    </span>
                    <span
                      className={cn(
                        "w-20 text-right font-bold",
                        mode === "best"
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-rose-700 dark:text-rose-400",
                      )}
                    >
                      Rs. {plan.cost_per_anytime_gb_lkr.toFixed(2)}/GB
                    </span>
                  </div>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: meta.color,
                      opacity: mode === "best" ? 0.85 : 0.75,
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
