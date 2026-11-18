"use client";

import {
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Search,
} from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import {
  formatSegment,
  getTierLabel,
  OPERATOR_META,
  type Operator,
  type Segment,
  TARIFF_DATA,
} from "@/data/sl-tariffs";
import { cn } from "@/lib/utils";

type SortKey =
  | "cost_per_anytime_gb_lkr"
  | "effective_30d_price_incl_tax_lkr"
  | "anytime_gb"
  | "validity_days"
  | "plan_name"
  | "operator";

const OPERATORS: Operator[] = ["Dialog", "Mobitel", "Hutch", "Airtel (Dialog)"];

export function TelcoTariffTable() {
  const [query, setQuery] = useState("");
  const [operatorFilter, setOperatorFilter] = useState<Operator | "All">("All");
  const [segmentFilter, setSegmentFilter] = useState<Segment | "All">("All");
  const [voiceOnly, setVoiceOnly] = useState(false);
  const [maxBudget, setMaxBudget] = useState<number | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("cost_per_anytime_gb_lkr");
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(key !== "anytime_gb");
    }
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = TARIFF_DATA.plans.filter((p) => {
      if (operatorFilter !== "All" && p.operator !== operatorFilter) {
        return false;
      }
      if (segmentFilter !== "All" && p.segment !== segmentFilter) return false;
      if (voiceOnly && !p.voice_benefits.toLowerCase().includes("unlimited")) {
        return false;
      }
      if (
        maxBudget !== "all" &&
        p.effective_30d_price_incl_tax_lkr > maxBudget
      ) {
        return false;
      }
      if (q) {
        const hay =
          `${p.plan_name} ${p.operator} ${p.trcsl_ref} ${p.other_data_benefits} ${p.voice_benefits} ${p.notes}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv));
      }
      return sortAsc ? cmp : -cmp;
    });
  }, [
    query,
    operatorFilter,
    segmentFilter,
    voiceOnly,
    maxBudget,
    sortKey,
    sortAsc,
  ]);

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Complete Database ({TARIFF_DATA.total_verified_active_plans} Plans)
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-card-foreground">
            Filterable &amp; Sortable Tariff Explorer
          </h3>
          <p className="text-sm text-muted-foreground">
            Click any row to inspect tax multipliers, TRCSL PDF filings, and
            live source URLs.
          </p>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{rows.length}</span>{" "}
          of {TARIFF_DATA.plans.length} plans
        </div>
      </div>

      {/* Search + Filters */}
      <div className="mb-4 space-y-3 border-b border-border pb-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search plan name, TRCSL ref, AI bundle, rollover..."
              className="w-full rounded-lg border border-border bg-background py-2 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <select
            value={segmentFilter}
            onChange={(e) =>
              setSegmentFilter(e.target.value as Segment | "All")
            }
            aria-label="Filter by segment"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
          >
            <option value="All">All Segments</option>
            <option value="prepaid">Prepaid Only</option>
            <option value="postpaid">Postpaid Only</option>
            <option value="prepaid_and_postpaid">Prepaid &amp; Postpaid</option>
          </select>

          <select
            value={String(maxBudget)}
            onChange={(e) =>
              setMaxBudget(
                e.target.value === "all" ? "all" : Number(e.target.value),
              )
            }
            aria-label="Filter by 30-day budget"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
          >
            <option value="all">Any 30d Budget</option>
            <option value="1500">≤ Rs. 1,500 / 30d</option>
            <option value="2500">≤ Rs. 2,500 / 30d</option>
            <option value="4000">≤ Rs. 4,000 / 30d</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["All", ...OPERATORS] as const).map((op) => {
            const active = operatorFilter === op;
            const meta = op === "All" ? null : OPERATOR_META[op];
            return (
              <button
                key={op}
                type="button"
                onClick={() => setOperatorFilter(op)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
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

          <button
            type="button"
            onClick={() => setVoiceOnly((v) => !v)}
            className={cn(
              "ml-auto rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              voiceOnly
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            {voiceOnly ? "✓ Unlimited Calls Only" : "Unlimited Calls Only"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th className="w-8 py-3 pr-2" />
              <th className="py-3 pr-3">
                <button
                  type="button"
                  onClick={() => handleSort("operator")}
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  Operator
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="py-3 pr-3">
                <button
                  type="button"
                  onClick={() => handleSort("plan_name")}
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  Plan
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="py-3 pr-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort("effective_30d_price_incl_tax_lkr")}
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  30d Cost
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="py-3 pr-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort("anytime_gb")}
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  Anytime
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="py-3 pr-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort("cost_per_anytime_gb_lkr")}
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  Rs. / GB
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="py-3 text-right">Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-muted-foreground"
                >
                  No plans match your filters.
                </td>
              </tr>
            ) : (
              rows.map((plan) => {
                const isExpanded = expandedId === plan.id;
                const opMeta = OPERATOR_META[plan.operator];
                const tier = getTierLabel(plan.cost_per_anytime_gb_lkr);
                return (
                  <Fragment key={plan.id}>
                    <tr
                      onClick={() => setExpandedId(isExpanded ? null : plan.id)}
                      className={cn(
                        "cursor-pointer transition-colors hover:bg-muted/50",
                        isExpanded && "bg-muted/60",
                      )}
                    >
                      <td className="py-3 pr-2 text-muted-foreground">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </td>
                      <td className="py-3 pr-3 whitespace-nowrap">
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-xs font-medium",
                            opMeta.bgClass,
                            opMeta.textClass,
                            opMeta.borderClass,
                          )}
                        >
                          {plan.operator}
                        </span>
                      </td>
                      <td className="py-3 pr-3">
                        <div className="font-medium text-foreground">
                          {plan.plan_name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatSegment(plan.segment)} · {plan.validity_days}d
                          ·{" "}
                          {plan.voice_benefits === "None"
                            ? "Data-only"
                            : plan.voice_benefits}
                        </div>
                      </td>
                      <td className="py-3 pr-3 font-mono whitespace-nowrap text-right text-foreground">
                        Rs.{" "}
                        {Math.round(
                          plan.effective_30d_price_incl_tax_lkr,
                        ).toLocaleString()}
                      </td>
                      <td className="py-3 pr-3 font-mono whitespace-nowrap text-right text-foreground">
                        {plan.anytime_gb} GB
                      </td>
                      <td className="py-3 pr-3 font-mono font-semibold whitespace-nowrap text-right text-foreground">
                        Rs. {plan.cost_per_anytime_gb_lkr.toFixed(2)}
                      </td>
                      <td className="py-3 whitespace-nowrap text-right">
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                            tier.className,
                          )}
                        >
                          {tier.label}
                        </span>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-muted/30">
                        <td colSpan={7} className="px-4 py-4">
                          <div className="grid gap-3 text-xs text-foreground/90 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                              <span className="block text-muted-foreground">
                                Quoted Price &amp; Tax
                              </span>
                              <span className="font-mono">
                                Rs. {plan.quoted_price_lkr.toLocaleString()} (
                                {plan.tax_status === "excl"
                                  ? `×${plan.tax_multiplier_applied} → Rs. ${plan.effective_price_incl_tax_lkr.toFixed(2)}`
                                  : "Incl. Tax"}
                                )
                              </span>
                            </div>
                            <div>
                              <span className="block text-muted-foreground">
                                Extra Data / Perks
                              </span>
                              <span>{plan.other_data_benefits}</span>
                            </div>
                            <div>
                              <span className="block text-muted-foreground">
                                Overage &amp; SMS
                              </span>
                              <span>
                                {plan.overage_rate} · SMS: {plan.sms_benefits}
                              </span>
                            </div>
                            <div>
                              <span className="block text-muted-foreground">
                                Verification &amp; Filing
                              </span>
                              <span className="font-mono text-muted-foreground">
                                {plan.trcsl_ref}
                              </span>
                            </div>
                          </div>
                          {plan.notes && (
                            <p className="mt-2.5 text-xs text-amber-700 dark:text-amber-300/90">
                              Note: {plan.notes}
                            </p>
                          )}
                          <div className="mt-3 flex flex-wrap gap-3 text-xs">
                            {plan.live_source_url && (
                              <a
                                href={plan.live_source_url.split(" ")[0]}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:underline"
                              >
                                Live Operator Source
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                            {plan.trcsl_pdf_url?.startsWith("http") && (
                              <a
                                href={plan.trcsl_pdf_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
                              >
                                TRCSL Filing PDF
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
