import rawData from "./sl-used-cars-2026-11-23.json";

export type CarModel =
  | "Toyota Raize"
  | "Honda Vezel"
  | "Suzuki Wagon R"
  | "Suzuki Alto";

export type CarPlatform = "Ikman" | "CarMarket" | "HitAd";

export type SellerType =
  | "member_dealer"
  | "stealth_dealer"
  | "private"
  | "unknown";

export type PriceStatus =
  | "priced"
  | "negotiable"
  | "dummy_price"
  | "typo_or_bait"
  | "lease_hand_price";

export interface CarListing {
  id: string;
  platform: CarPlatform;
  model: CarModel;
  title: string;
  priceLkr: number | null;
  priceStatus: PriceStatus;
  isNegotiable: boolean;
  modelYear: number | null;
  mileageKm: number | null;
  condition: string | null;
  fuel: string | null;
  district: string;
  sellerType: SellerType;
  sellerLabel: string;
  isMember: boolean;
  isVerified: boolean;
  isBumped: boolean;
  views: number | null;
  enriched: boolean;
  baitSnippet: string | null;
  url: string;
}

export interface YearMedian {
  year: number;
  count: number;
  medianLkr: number;
}

export interface DistrictMedian {
  district: string;
  count: number;
  medianLkr: number;
}

export interface ModelSummary {
  ikmanTotalLive: number;
  ikmanSampled: number;
  ikmanEnriched: number;
  ikmanStealthDealersInFreeSample: number;
  ikmanFreeSampleCount: number;
  ikmanMedianLkr: number | null;
  ikmanMemberMedianLkr: number | null;
  ikmanPrivateMedianLkr: number | null;
  ikmanBaitCount: number;
  carMarketSampled: number;
  carMarketMedianLkr: number | null;
  carMarketNegotiableCount: number;
  carMarketBaitCount: number;
  hitAdMatched: number;
  overallCleanMedianLkr: number | null;
  yearMedians: YearMedian[];
  districtMedians: DistrictMedian[];
}

export interface UsedCarDataset {
  metadata: {
    collectedAt: string;
    collectionDate: string;
    schemaVersion: string;
    platformsAccessible: string[];
    platformsExcluded: { name: string; reason: string }[];
    totalListingsStored: number;
  };
  volumeRanking: { model: string; ikmanTotal: number }[];
  platformAudit: {
    carmarketTotalCarsHeadline: number;
    carmarketTotalSuvsHeadline: number;
    hitAd: {
      totalPages: number;
      totalCars: number;
      pricedCount: number;
      priceHiddenCount: number;
      priceHiddenPct: number;
    };
    autoLanka: {
      totalCars: number;
      brands: Record<string, number>;
    };
  };
  modelSummary: Record<CarModel, ModelSummary>;
  listings: CarListing[];
}

export const USED_CAR_DATA = rawData as unknown as UsedCarDataset;

export const CAR_MODELS: CarModel[] = [
  "Toyota Raize",
  "Honda Vezel",
  "Suzuki Wagon R",
  "Suzuki Alto",
];

export const CAR_PLATFORMS: CarPlatform[] = ["Ikman", "CarMarket", "HitAd"];

export const PLATFORM_META: Record<
  CarPlatform,
  { color: string; badge: string }
> = {
  Ikman: {
    color: "#10b981",
    badge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  CarMarket: {
    color: "#3b82f6",
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
  HitAd: {
    color: "#f59e0b",
    badge:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
};

export function formatMillions(lkr: number | null): string {
  if (lkr === null) return "Negotiable";
  if (lkr >= 1_000_000) return `Rs. ${(lkr / 1_000_000).toFixed(2)}M`;
  return `Rs. ${lkr.toLocaleString("en-US")}`;
}

export function formatLkr(lkr: number | null): string {
  if (lkr === null) return "Negotiable";
  return `Rs. ${Math.round(lkr).toLocaleString("en-US")}`;
}

export function formatSellerType(s: SellerType): string {
  if (s === "member_dealer") return "Member Dealer";
  if (s === "stealth_dealer") return "Stealth Dealer";
  if (s === "private") return "Private";
  return "Unclassified";
}
