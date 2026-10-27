"use client";

import { useEffect, useState } from "react";
import {
  Plane, Search, Clock, AlertTriangle, RefreshCw,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Input, Select } from "@/components/ui";

interface FlightState {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  time_position: number | null;
  last_contact: number;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  on_ground: boolean;
  velocity: number | null;
  true_track: number | null;
  vertical_rate: number | null;
  squawk: string | null;
}

const REGIONS: { label: string; bounds: { latMin: number; latMax: number; lonMin: number; lonMax: number } }[] = [
  { label: "Worldwide", bounds: { latMin: -90, latMax: 90, lonMin: -180, lonMax: 180 } },
  { label: "South Asia", bounds: { latMin: 5, latMax: 40, lonMin: 60, lonMax: 100 } },
  { label: "Middle East", bounds: { latMin: 10, latMax: 40, lonMin: 30, lonMax: 65 } },
  { label: "Europe", bounds: { latMin: 35, latMax: 72, lonMin: -10, lonMax: 40 } },
  { label: "North America", bounds: { latMin: 15, latMax: 72, lonMin: -130, lonMax: -50 } },
];

export default function PlaneTracking() {
  const [flights, setFlights] = useState<FlightState[]>([]);
  const [total, setTotal] = useState(0);
  const [airborne, setAirborne] = useState(0);
  const [onGround, setOnGround] = useState(0);
  const [observedAt, setObservedAt] = useState<number | null>(null);
  const [region, setRegion] = useState(REGIONS[0]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const { latMin, latMax, lonMin, lonMax } = region.bounds;
        const params = new URLSearchParams({
          lamin: String(latMin),
          lamax: String(latMax),
          lomin: String(lonMin),
          lomax: String(lonMax),
        });
        // The proxy avoids OpenSky's browser CORS restriction and shares one
        // cached upstream request between visitors.
        const res = await fetch(`/api/flights?${params.toString()}`, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch flight data");
        }
        if (cancelled) return;

        setFlights(Array.isArray(data.states) ? data.states : []);
        setTotal(typeof data.total === "number" ? data.total : 0);
        setAirborne(typeof data.airborne === "number" ? data.airborne : 0);
        setOnGround(typeof data.onGround === "number" ? data.onGround : 0);
        setObservedAt(typeof data.time === "number" ? data.time : null);

        const nextRefresh = Number(data.refreshAfter) || 900;
        timer = setTimeout(fetchFlights, nextRefresh * 1000);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unable to load live flights");
        timer = setTimeout(fetchFlights, 60_000);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchFlights();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [region, reloadToken]);

  const filtered = flights.filter((f) => {
    const q = search.toLowerCase();
    return (
      f.callsign?.toLowerCase().includes(q) ||
      f.icao24.toLowerCase().includes(q) ||
      f.origin_country.toLowerCase().includes(q)
    );
  });

  const altitudeKm = (m: number | null) => (m ? Math.round(m / 1000) : null);
  const velocityKmh = (mps: number | null) => (mps ? Math.round(mps * 3.6) : null);

  return (
    <section className="py-20 bg-background dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-amber-600 dark:text-amber-400 mb-3">
              Live radar
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Live plane tracking</h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Live aircraft positions from the OpenSky Network. Positions update
              automatically while this page is open.
            </p>
          </div>
          <div className="flex items-center gap-3 lg:w-[320px]">
            <Select value={region.label} onChange={(e) => setRegion(REGIONS.find((r) => r.label === e.target.value) || region)}>
              {REGIONS.map((r) => (
                <option key={r.label} value={r.label}>{r.label}</option>
              ))}
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReloadToken((token) => token + 1)}
              disabled={loading}
              className="hidden sm:flex"
            >
              {loading ? (
                "Refreshing…"
              ) : (
                <>
                  <RefreshCw size={16} strokeWidth={2} className="mr-2" />
                  Refresh
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
          <Card className="p-5 border-border dark:border-white/5">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aircraft in region</div>
            <div className="text-2xl font-bold text-foreground mt-1">{total}</div>
          </Card>
          <Card className="p-5 border-border dark:border-white/5">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Airborne</div>
            <div className="text-2xl font-bold text-foreground mt-1">{airborne}</div>
          </Card>
          <Card className="p-5 border-border dark:border-white/5">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">On ground</div>
            <div className="text-2xl font-bold text-foreground mt-1">{onGround}</div>
          </Card>
          <Card className="p-5 border-border dark:border-white/5">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Region</div>
            <div className="text-2xl font-bold text-foreground mt-1">{region.label}</div>
          </Card>
        </div>

        {error && (
          <Card className="mb-8 p-6 border-border dark:border-white/5 bg-red-50 dark:bg-red-500/5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} strokeWidth={2} className="text-red-600 mt-0.5" />
              <div>
                <p className="text-sm text-foreground">{error}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  OpenSky may rate-limit anonymous requests. This page retries
                  automatically, or you can select a smaller region.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Radar table */}
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Aircraft positions</CardTitle>
              <div className="relative w-64">
                <Search size={16} strokeWidth={2} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search flight, airline, or country…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 text-sm"
                />
              </div>
            </div>
            <CardDescription className="text-sm">
              Source: OpenSky Network. Positions are approximate and may be delayed. Not for navigation use.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border dark:border-white/5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 pr-4">Flight</th>
                    <th className="pb-3 pr-4">Origin</th>
                    <th className="pb-3 pr-4">Position</th>
                    <th className="pb-3 pr-4">Altitude</th>
                    <th className="pb-3 pr-4">Speed</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3">Last seen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-white/5">
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="h-32 text-center text-muted-foreground">
                        {loading ? "Loading live positions…" : "No aircraft found in this region."}
                      </td>
                    </tr>
                  )}
                  {filtered.map((f) => (
                    <tr key={f.icao24} className="group hover:bg-surface/50 dark:hover:bg-white/5 transition-colors">
                      <td className="pb-3 pr-4 align-middle">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md flex items-center justify-center bg-amber-100 dark:bg-amber-900/30">
                            <Plane size={12} strokeWidth={2} className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{f.callsign || f.icao24}</p>
                            <p className="text-xs text-muted-foreground">{f.icao24}</p>
                          </div>
                        </div>
                      </td>
                      <td className="pb-3 pr-4 align-middle text-muted-foreground">{f.origin_country}</td>
                      <td className="pb-3 pr-4 align-middle">
                        <span className="text-[10px] text-muted-foreground block">
                          {f.latitude?.toFixed(3)}, {f.longitude?.toFixed(3)}
                        </span>
                        <span className="text-xs font-medium text-foreground">
                          {f.on_ground ? "Ground" : "Air"}
                        </span>
                      </td>
                      <td className="pb-3 pr-4 align-middle text-muted-foreground">
                        {altitudeKm(f.baro_altitude) != null ? `${altitudeKm(f.baro_altitude)} km` : "—"}
                      </td>
                      <td className="pb-3 pr-4 align-middle text-muted-foreground">
                        {velocityKmh(f.velocity) != null ? `${velocityKmh(f.velocity)} km/h` : "—"}
                      </td>
                      <td className="pb-3 pr-4 align-middle">
                        <Badge
                          variant={f.on_ground ? "secondary" : "default"}
                          className="text-[10px] px-2 py-1"
                        >
                          {f.on_ground ? "Landed" : "In flight"}
                        </Badge>
                      </td>
                      <td className="pb-3 pr-4 align-middle text-muted-foreground text-[10px]">
                        {f.last_contact ? new Date(f.last_contact * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>
                  {filtered.length} of {flights.length} sampled aircraft shown
                  {total > flights.length ? ` · ${total} in region` : ""}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} strokeWidth={2} />
                  {observedAt
                    ? `Observed ${new Date(observedAt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                    : "Observation time unavailable"}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground">
            Live data provided by <a href="https://opensky-network.org" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">OpenSky Network</a>. Not for operational navigation.
          </p>
        </div>
      </div>
    </section>
  );
}
