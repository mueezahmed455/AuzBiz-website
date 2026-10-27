"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane, Search, Calendar, User, ChevronDown, Plus, Minus,
  MapPin, Ticket,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Label, Select, Badge, Card, CardContent, Divider } from "@/components/ui";

const CABINS = [
  { value: "economy", label: "Economy" },
  { value: "premium", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

const TRIP_TYPES = [
  { value: "round", label: "Round trip" },
  { value: "one-way", label: "One way" },
  { value: "multi-city", label: "Multi-city" },
];

export interface FlightSearchParams {
  tripType: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  cabin: string;
  flexDates: boolean;
}

interface FlightSearchFormProps {
  onSearch: (params: FlightSearchParams) => void;
  initial?: FlightSearchParams | null;
}

// ── Place suggestion (client-side fuzzy match over a curated airport list) ──
const AIRPORTS = [
  { label: "Allama Iqbal Intl. (LHE) — Lahore, PK", code: "LHE", city: "Lahore" },
  { label: "Jinnah Intl. (KHI) — Karachi, PK", code: "KHI", city: "Karachi" },
  { label: "Islamabad Intl. (ISB) — Islamabad, PK", code: "ISB", city: "Islamabad" },
  { label: "Dubai Intl. (DXB) — Dubai, AE", code: "DXB", city: "Dubai" },
  { label: "Jeddah King Abdulaziz (JED) — Jeddah, SA", code: "JED", city: "Jeddah" },
  { label: "Madinah Prince Mohammad (MED) — Madinah, SA", code: "MED", city: "Madinah" },
  { label: "Istanbul Airport (IST) — Istanbul, TR", code: "IST", city: "Istanbul" },
  { label: "London Heathrow (LHR) — London, GB", code: "LHR", city: "London" },
  { label: "Bangkok Suvarnabhumi (BKK) — Bangkok, TH", code: "BKK", city: "Bangkok" },
  { label: "Kuala Lumpur (KUL) — Kuala Lumpur, MY", code: "KUL", city: "Kuala Lumpur" },
  { label: "Türkiye Sabiha Gökçen (SAW) — Istanbul, TR", code: "SAW", city: "Istanbul" },
  { label: "Riyadh King Khalid (RUH) — Riyadh, SA", code: "RUH", city: "Riyadh" },
];

function fuzzyMatch(query: string, item: { label: string; code: string; city: string }): number {
  const q = query.toLowerCase();
  const haystack = `${item.label} ${item.code} ${item.city}`.toLowerCase();
  if (!q) return 0;
  if (haystack.includes(q)) return 1;
  let j = 0;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === q[j]) j++;
    if (j === q.length) break;
  }
  return j === q.length ? j : 0;
}

export default function FlightSearchForm({ onSearch, initial }: FlightSearchFormProps) {
  const [tripType, setTripType] = useState<typeof TRIP_TYPES[number]["value"]>(
    initial?.tripType ?? "round",
  );
  const [origin, setOrigin] = useState(initial?.origin ?? "");
  const [originCode, setOriginCode] = useState(initial?.originCode ?? "");
  const [destination, setDestination] = useState(initial?.destination ?? "");
  const [destinationCode, setDestinationCode] = useState(initial?.destinationCode ?? "");
  const [departDate, setDepartDate] = useState(initial?.departDate ?? "");
  const [returnDate, setReturnDate] = useState(initial?.returnDate ?? "");
  const [adults, setAdults] = useState(initial?.adults ?? 1);
  const [children, setChildren] = useState(initial?.children ?? 0);
  const [infants, setInfants] = useState(initial?.infants ?? 0);
  const [cabin, setCabin] = useState(initial?.cabin ?? "economy");
  const [flexDates, setFlexDates] = useState(initial?.flexDates ?? false);
  const [travellersOpen, setTravellersOpen] = useState(false);

  // Place suggestion dropdown state
  const [originFocus, setOriginFocus] = useState(false);
  const [destFocus, setDestFocus] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState<typeof AIRPORTS[number][]>([]);
  const [destSuggestions, setDestSuggestions] = useState<typeof AIRPORTS[number][]>([]);

  const originInputRef = useRef<HTMLInputElement>(null);
  const destInputRef = useRef<HTMLInputElement>(null);
  const travellersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (originInputRef.current && !originInputRef.current.contains(e.target as Node)) setOriginFocus(false);
      if (destInputRef.current && !destInputRef.current.contains(e.target as Node)) setDestFocus(false);
      if (travellersRef.current && !travellersRef.current.contains(e.target as Node)) setTravellersOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleOriginChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setOrigin(v);
    setOriginCode("");
    setOriginFocus(true);
    if (v.trim()) {
      const scored = AIRPORTS.map((a) => ({ a, s: fuzzyMatch(v, a) })).filter((x) => x.s > 0).sort((x, y) => y.s - x.s);
      setOriginSuggestions(scored.map((x) => x.a).slice(0, 6));
    } else {
      setOriginSuggestions([]);
    }
  }, []);

  const handleDestChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setDestination(v);
    setDestinationCode("");
    setDestFocus(true);
    if (v.trim()) {
      const scored = AIRPORTS.map((a) => ({ a, s: fuzzyMatch(v, a) })).filter((x) => x.s > 0).sort((x, y) => y.s - x.s);
      setDestSuggestions(scored.map((x) => x.a).slice(0, 6));
    } else {
      setDestSuggestions([]);
    }
  }, []);

  const selectOrigin = (a: typeof AIRPORTS[number]) => {
    setOrigin(a.label);
    setOriginCode(a.code);
    setOriginSuggestions([]);
    setOriginFocus(false);
    originInputRef.current?.blur();
  };

  const selectDest = (a: typeof AIRPORTS[number]) => {
    setDestination(a.label);
    setDestinationCode(a.code);
    setDestSuggestions([]);
    setDestFocus(false);
    destInputRef.current?.blur();
  };

  const handleDepartChange = (value: string) => {
    setDepartDate(value);
    if (returnDate && value && returnDate < value) setReturnDate("");
  };

  const totalTravellers = adults + children + infants;
  const routeReady =
    Boolean(originCode && destinationCode) && originCode !== destinationCode;
  const canSearch = routeReady && Boolean(departDate) && (tripType !== "round" || Boolean(returnDate));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOriginFocus(false);
    setDestFocus(false);
    setTravellersOpen(false);
    if (!canSearch) return;
    onSearch({
      tripType,
      origin,
      originCode,
      destination,
      destinationCode,
      departDate,
      returnDate,
      adults,
      children,
      infants,
      cabin,
      flexDates,
    });
  };

  return (
    <Card className="mx-auto max-w-5xl shadow-lg ring-1 ring-border/50 dark:ring-white/5">
      <CardContent className="pb-7 pt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="w-full lg:w-48">
              <Label htmlFor="trip-type">Trip type</Label>
              <Select
                id="trip-type"
                value={tripType}
                onChange={(e) => setTripType(e.target.value as typeof tripType)}
                className="text-sm"
              >
                {TRIP_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </Select>
            </div>

            <div className="relative flex-1">
              <Label htmlFor="origin">From</Label>
              <div className="relative">
                <MapPin size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="origin"
                  ref={originInputRef}
                  placeholder="e.g. Lahore (LHE)"
                  value={origin}
                  onChange={handleOriginChange}
                  onFocus={() => setOriginFocus(true)}
                  onBlur={() => setTimeout(() => setOriginFocus(false), 150)}
                  className="pl-10"
                  autoComplete="off"
                />
                <AnimatePresence>
                  {originFocus && originSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-card-border bg-card shadow-xl"
                    >
                      {originSuggestions.map((a) => (
                        <button
                          key={a.code}
                          type="button"
                          onClick={() => selectOrigin(a)}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-surface hover:text-amber-600 dark:hover:text-amber-400"
                        >
                          <span className="flex-1 text-left">{a.label}</span>
                          <Badge variant="outline" className="text-[10px]">{a.code}</Badge>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="hidden self-center lg:block">
              <div className="flex items-center text-sm text-muted-foreground">
                <Plane size={14} strokeWidth={2} className="mr-1.5 text-amber-600 dark:text-amber-400" />
                {tripType === "round" ? "Round trip" : tripType === "one-way" ? "One way" : "Multi-city"}
              </div>
            </div>

            <div className="relative flex-1">
              <Label htmlFor="destination">To</Label>
              <div className="relative">
                <MapPin size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="destination"
                  ref={destInputRef}
                  placeholder="e.g. Dubai (DXB)"
                  value={destination}
                  onChange={handleDestChange}
                  onFocus={() => setDestFocus(true)}
                  onBlur={() => setTimeout(() => setDestFocus(false), 150)}
                  className="pl-10"
                  autoComplete="off"
                />
                <AnimatePresence>
                  {destFocus && destSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-card-border bg-card shadow-xl"
                    >
                      {destSuggestions.map((a) => (
                        <button
                          key={a.code}
                          type="button"
                          onClick={() => selectDest(a)}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-surface hover:text-amber-600 dark:hover:text-amber-400"
                        >
                          <span className="flex-1 text-left">{a.label}</span>
                          <Badge variant="outline" className="text-[10px]">{a.code}</Badge>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <Divider className="my-1" />

          <div className="grid grid-cols-2 items-end gap-4 sm:grid-cols-4 lg:grid-cols-6">
            <div className="relative col-span-2">
              <Label htmlFor="depart-date">Depart</Label>
              <div className="relative">
                <Calendar size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="depart-date"
                  type="date"
                  required
                  value={departDate}
                  onChange={(e) => handleDepartChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {tripType === "round" && (
              <div className="relative col-span-2">
                <Label htmlFor="return-date">Return</Label>
                <div className="relative">
                  <Calendar size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="return-date"
                    type="date"
                    required
                    min={departDate || undefined}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="col-span-1">
              <Label htmlFor="cabin">Cabin</Label>
              <Select id="cabin" value={cabin} onChange={(e) => setCabin(e.target.value)} className="text-sm">
                {CABINS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </Select>
            </div>

            <div className="col-span-1">
              <Label htmlFor="flex-dates">Flexibility</Label>
              <label
                htmlFor="flex-dates"
                className="flex h-[42px] cursor-pointer items-center gap-2 rounded-lg border border-input bg-surface px-3 text-xs text-foreground dark:bg-slate-900"
              >
                <input
                  id="flex-dates"
                  type="checkbox"
                  checked={flexDates}
                  onChange={() => setFlexDates((v) => !v)}
                  className="rounded border-input text-accent focus:ring-ring"
                />
                ±3 days
              </label>
            </div>

            <div ref={travellersRef} className="relative col-span-2">
              <Label htmlFor="travellers">Travellers</Label>
              <button
                id="travellers"
                type="button"
                aria-expanded={travellersOpen}
                aria-haspopup="dialog"
                onClick={() => setTravellersOpen((v) => !v)}
                className="flex h-[42px] w-full items-center justify-between gap-2 rounded-lg border border-input bg-surface px-3 text-sm text-foreground outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:bg-slate-900"
              >
                <span className="flex items-center gap-2">
                  <User size={15} strokeWidth={2} className="text-muted-foreground" />
                  {totalTravellers} traveller{totalTravellers === 1 ? "" : "s"}
                </span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>

              <AnimatePresence>
                {travellersOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    role="dialog"
                    aria-label="Traveller counts"
                    className="absolute right-0 top-full z-50 mt-1 w-64 rounded-xl border border-card-border bg-card p-4 shadow-xl"
                  >
                    {[
                      { label: "Adults", hint: "12+", value: adults, set: setAdults, min: 1 },
                      { label: "Children", hint: "2–11", value: children, set: setChildren, min: 0 },
                      { label: "Infants", hint: "Under 2", value: infants, set: setInfants, min: 0 },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between border-b border-border py-2.5 last:border-0"
                      >
                        <div>
                          <p className="text-xs font-semibold text-foreground">{row.label}</p>
                          <p className="text-[10px] text-muted-foreground">{row.hint}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => row.set((v) => Math.max(row.min, v - 1))}
                            disabled={row.value === row.min}
                            aria-label={`Decrease ${row.label.toLowerCase()}`}
                            className="flex h-7 w-7 items-center justify-center rounded border border-border text-foreground hover:bg-surface disabled:opacity-40"
                          >
                            <Minus size={12} strokeWidth={2} />
                          </button>
                          <span className="w-5 text-center text-xs font-semibold text-foreground">
                            {row.value}
                          </span>
                          <button
                            type="button"
                            onClick={() => row.set((v) => Math.min(9, v + 1))}
                            aria-label={`Increase ${row.label.toLowerCase()}`}
                            className="flex h-7 w-7 items-center justify-center rounded border border-border text-foreground hover:bg-surface"
                          >
                            <Plus size={12} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="col-span-2 flex items-end">
              <Button type="submit" size="lg" className="w-full" disabled={!canSearch}>
                <Search size={18} strokeWidth={2} className="mr-2" />
                {canSearch ? "Compare sample fares" : "Select route & dates"}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Plane size={12} strokeWidth={2} /> Sample fare bands, not live prices
            </span>
            <span className="flex items-center gap-1.5">
              <Ticket size={12} strokeWidth={2} /> Route, cabin and date aware
            </span>
            <span className="flex items-center gap-1.5">
              <User size={12} strokeWidth={2} /> Desk confirms the real quote
            </span>
          </div>
          {originCode && destinationCode && originCode === destinationCode && (
            <p role="alert" className="text-xs text-red-600 dark:text-red-400">
              Origin and destination need to be different airports.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
