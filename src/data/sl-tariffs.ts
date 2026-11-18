import rawTariffs from "./sl-tariffs-2026-11-18.json";

export type Operator = "Dialog" | "Hutch" | "Mobitel" | "Airtel (Dialog)";
export type Segment = "prepaid" | "postpaid" | "prepaid_and_postpaid";

export interface TariffPlan {
  id: string;
  operator: Operator;
  plan_name: string;
  segment: Segment;
  quoted_price_lkr: number;
  tax_status: "incl" | "excl";
  tax_multiplier_applied: number;
  effective_price_incl_tax_lkr: number;
  effective_30d_price_incl_tax_lkr: number;
  anytime_gb: number;
  cost_per_anytime_gb_lkr: number;
  other_data_benefits: string;
  voice_benefits: string;
  sms_benefits: string;
  validity_days: number;
  overage_rate: string;
  trcsl_ref: string;
  trcsl_pdf_url: string;
  live_source_url: string;
  verification_tier: string;
  fetched_at: string;
  operator_updated_at: string | null;
  notes: string;
}

export interface TariffDataset {
  schema_version: string;
  generated_at: string;
  as_of_date: string;
  currency: string;
  total_verified_active_plans: number;
  plans: TariffPlan[];
}

export const TARIFF_DATA = rawTariffs as TariffDataset;

export const OPERATOR_META: Record<
  Operator,
  { color: string; bgClass: string; textClass: string; borderClass: string }
> = {
  Dialog: {
    color: "#ef4444",
    bgClass: "bg-red-500/15",
    textClass: "text-red-700 dark:text-red-400",
    borderClass: "border-red-500/30",
  },
  Mobitel: {
    color: "#3b82f6",
    bgClass: "bg-blue-500/15",
    textClass: "text-blue-700 dark:text-blue-400",
    borderClass: "border-blue-500/30",
  },
  Hutch: {
    color: "#f97316",
    bgClass: "bg-orange-500/15",
    textClass: "text-orange-700 dark:text-orange-400",
    borderClass: "border-orange-500/30",
  },
  "Airtel (Dialog)": {
    color: "#ec4899",
    bgClass: "bg-pink-500/15",
    textClass: "text-pink-700 dark:text-pink-400",
    borderClass: "border-pink-500/30",
  },
};

export function getTierLabel(costPerGb: number): {
  tier: "S" | "A" | "B" | "C";
  label: string;
  className: string;
} {
  if (costPerGb <= 34.5) {
    return {
      tier: "S",
      label: "S-Tier",
      className:
        "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    };
  }
  if (costPerGb <= 48) {
    return {
      tier: "A",
      label: "Good",
      className:
        "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30",
    };
  }
  if (costPerGb <= 90) {
    return {
      tier: "B",
      label: "Overpriced",
      className:
        "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    };
  }
  return {
    tier: "C",
    label: "Decoy / Trap",
    className:
      "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
  };
}

export function formatSegment(segment: Segment): string {
  switch (segment) {
    case "prepaid":
      return "Prepaid";
    case "postpaid":
      return "Postpaid";
    case "prepaid_and_postpaid":
      return "Pre & Post";
  }
}
