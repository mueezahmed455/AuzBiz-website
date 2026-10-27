"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Info,
  Luggage,
  MessageCircle,
  Plane,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui";

const WHATSAPP_NUMBER = "923464993122";

const CABIN_LABELS: Record<string, string> = {
  economy: "Economy",
  premium: "Premium economy",
  business: "Business",
  first: "First",
};

type Band = {
  id: string;
  name: string;
  tagline: string;
  lowFactor: number;
  highFactor: number;
  checks: string[];
  highlighted?: boolean;
};

const BANDS: Band[] = [
  {
    id: "nonstop",
    name: "Non-stop",
    tagline: "Shortest journey. Usually the highest fare band.",
    lowFactor: 1.12,
    highFactor: 1.3,
    checks: [
      "Cabin and checked baggage allowance",
      "Change and refund rules",
      "Seat selection cost",
    ],
  },
  {
    id: "gulf",
    name: "One stop via a Gulf hub",
    tagline: "The most common routing from Lahore. Mid-range band.",
    lowFactor: 0.98,
    highFactor: 1.12,
    checks: [
      "Total layover length",
      "Terminal change and baggage re-check",
      "Transit visa requirements",
    ],
    highlighted: true,
  },
  {
    id: "alt",
    name: "One stop via an alternative hub",
    tagline: "Often the lowest band, with a longer journey.",
    lowFactor: 0.86,
    highFactor: 1,
    checks: [
      "Total journey time",
      "Airline and aircraft type",
      "Overnight layover risk",
    ],
  },
];

function routeBase(origin: string, destination: string): number {
  const pk = new Set(["LHE", "KHI", "ISB"]);
  if (pk.has(origin) && pk.has(destination)) return 22_000;

  const gulf = new Set(["DXB", "JED", "MED", "RUH"]);
  if (gulf.has(destination) || gulf.has(origin)) return 58_000;

  const asia = new Set(["BKK", "KUL"]);
  if (asia.has(destination) || asia.has(origin)) return 98_000;

  const europe = new Set(["LHR", "IST", "SAW"]);
  if (europe.has(destination) || europe.has(origin)) return 175_000;

  return 85_000;
}

function cabinFactor(cabin: string): number {
  switch (cabin) {
    case "premium":
      return 1.65;
    case "business":
      return 3.1;
    case "first":
      return 4.6;
    default:
      return 1;
  }
}

function roundToThousand(value: number): number {
  return Math.round(value / 1000) * 1000;
}

function formatPkr(value: number): string {
  return `PKR ${new Intl.NumberFormat("en-PK").format(roundToThousand(value))}`;
}

function cabinLabel(cabin: string): string {
  return CABIN_LABELS[cabin] ?? cabin;
}

function buildQuoteHref({
  origin,
  destination,
  departDate,
  returnDate,
  cabin,
  travellers,
  band,
  low,
  high,
}: {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  cabin: string;
  travellers: string;
  band: string;
  low: number;
  high: number;
}): string {
  const dates = returnDate
    ? `from ${departDate} to ${returnDate}`
    : `on ${departDate}`;
  const message = [
    "Hi AUZBIZ! I used the sample fare comparison on your website and would like a real quote.",
    "",
    `Route: ${origin} → ${destination}`,
    `Dates: ${dates}`,
    `Travellers: ${travellers}`,
    `Cabin: ${cabinLabel(cabin)}`,
    `Option: ${band} (sample range ${formatPkr(low)} – ${formatPkr(high)} per person)`,
    "",
    "Please confirm the live fare, baggage and change rules.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface FareResultsProps {
  originCode: string;
  destinationCode: string;
  departDate: string;
  returnDate?: string;
  cabin: string;
  adults: number;
  childrenCount: number;
}

export default function FareResults({
  originCode,
  destinationCode,
  departDate,
  returnDate,
  cabin,
  adults,
  childrenCount,
}: FareResultsProps) {
  const roundTrip = Boolean(returnDate);
  const base =
    routeBase(originCode, destinationCode) *
    cabinFactor(cabin) *
    (roundTrip ? 1.85 : 1);
  const travellers = `${adults} adult${adults === 1 ? "" : "s"}${
    childrenCount > 0
      ? `, ${childrenCount} child${childrenCount === 1 ? "" : "ren"}`
      : ""
  }`;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Sample fare bands
            </h2>
            <Badge variant="outline">Illustrative, not live</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {originCode} → {destinationCode} ·{" "}
            {roundTrip ? "return" : "one way"} · {cabinLabel(cabin)}
          </p>
        </div>

        <a
          href={buildQuoteHref({
            origin: originCode,
            destination: destinationCode,
            departDate,
            returnDate,
            cabin,
            travellers,
            band: "Any option",
            low: Math.min(...BANDS.map((band) => base * band.lowFactor)),
            high: Math.max(...BANDS.map((band) => base * band.highFactor)),
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
        >
          <MessageCircle size={14} /> Ask for the real fare
        </a>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 dark:border-amber-500/20 dark:bg-amber-500/10">
        <p className="flex gap-2 text-[11px] leading-relaxed text-amber-900 dark:text-amber-200">
          <Info size={14} className="mt-0.5 shrink-0" />
          These are illustrative bands based on route tier, cabin and
          one-way/return travel — not airline inventory. Real prices depend on
          dates, availability and fare rules. The desk confirms the live fare
          before anything is booked.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {BANDS.map((band, index) => {
          const low = base * band.lowFactor;
          const high = base * band.highFactor;
          return (
            <motion.article
              key={band.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.3 }}
              className={`flex flex-col rounded-2xl border bg-card p-5 ${
                band.highlighted
                  ? "border-amber-400 shadow-lg shadow-amber-500/10 dark:border-amber-500/40"
                  : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <Plane size={16} strokeWidth={2} />
                </span>
                {band.highlighted && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                    Most common
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {band.name}
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {band.tagline}
              </p>

              <p className="mt-4 text-lg font-bold tracking-tight text-foreground">
                {formatPkr(low)} – {formatPkr(high)}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                per person, sample range
              </p>

              <div className="mt-4 border-t border-border pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Ask before booking
                </p>
                <ul className="mt-2 space-y-1.5">
                  {band.checks.map((check) => (
                    <li
                      key={check}
                      className="flex gap-1.5 text-[11px] leading-relaxed text-muted-foreground"
                    >
                      <Check
                        size={11}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                      />
                      {check}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={buildQuoteHref({
                  origin: originCode,
                  destination: destinationCode,
                  departDate,
                  returnDate,
                  cabin,
                  travellers,
                  band: band.name,
                  low,
                  high,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors ${
                  band.highlighted
                    ? "bg-slate-950 text-white hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
                    : "border border-border text-foreground hover:border-amber-500"
                }`}
              >
                Quote this option <ArrowRight size={13} />
              </a>
            </motion.article>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: Luggage,
            title: "Baggage is part of the price",
            body: "A cheaper fare can cost more once you add a checked bag. Ask for the allowance in writing.",
          },
          {
            icon: RefreshCw,
            title: "Change rules matter",
            body: "If your dates might move, a flexible fare can be cheaper than changing a restrictive one.",
          },
          {
            icon: Plane,
            title: "Routing changes the day",
            body: "One stop can add hours. Check the total journey time, not just the departure time.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <item.icon
              size={15}
              strokeWidth={2}
              className="text-amber-600 dark:text-amber-400"
            />
            <p className="mt-2 text-xs font-semibold text-foreground">
              {item.title}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Prefer to compare a specific airline or a group booking?{" "}
          <Link
            href="/contact?service=Air%20Ticketing"
            className="font-semibold text-foreground underline decoration-amber-500/50 underline-offset-2 hover:text-amber-700 dark:hover:text-amber-400"
          >
            Send the route to the ticketing desk
          </Link>{" "}
          and we will reply with real options during office hours.
        </p>
      </div>
    </div>
  );
}
