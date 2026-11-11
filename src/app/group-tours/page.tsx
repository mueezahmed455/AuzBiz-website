import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, Compass, MapPin, MessageCircle } from "lucide-react";
import { getPublishedTours } from "@/lib/content/store";
import type { TourRegion } from "@/lib/content/types";
import TourCard from "@/components/TourCard";
import Gallery from "@/components/Gallery";
import AUZPromoBanner from "@/components/promo/AUZPromoBanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Group tours",
  description:
    "Real group departures from Lahore — Uzbekistan, Thailand, Umrah, Hunza and more. See the photos, itinerary, and inclusions before you book.",
};

const regions: (TourRegion | "All")[] = ["All", "International", "Umrah", "Domestic", "Corporate"];

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default async function GroupToursPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const params = await searchParams;
  const active = regions.find((region) => slug(region) === params.region) ?? "All";

  const tours = await getPublishedTours();
  const filtered = active === "All" ? tours : tours.filter((tour) => tour.region === active);
  const photos = tours.flatMap((tour) => [
    ...(tour.coverImage ? [tour.coverImage] : []),
    ...tour.gallery,
  ]);
  const uniquePhotos = Array.from(new Set(photos)).slice(0, 12);

  const counts = regions.reduce((map, region) => {
    map[region] =
      region === "All" ? tours.length : tours.filter((tour) => tour.region === region).length;
    return map;
  }, {} as Record<string, number>);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-amber-500/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-0 h-[24rem] w-[24rem] rounded-full bg-sky-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">
            <Camera size={12} /> Group departures
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Journeys you take<br />
                <span className="text-amber-400">with good company.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Small-group departures from Lahore, planned end to end. Every listing shows
                what is included, what it costs, and the photos from the trip itself.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                Not sure which one?
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                Tell us the month, budget, and who is travelling. We will shortlist two or
                three options — no obligation.
              </p>
              <a
                href="https://wa.me/923464993122?text=Assalam%20o%20Alaikum%2C%20I%27d%20like%20help%20choosing%20a%20group%20tour."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
              >
                <MessageCircle size={15} /> Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Group tours promo — AUZBIZ 2×2 identity, wired into the revenue surface */}
      <section className="bg-background dark:bg-slate-950 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AUZPromoBanner
            variant="group"
            href="/group-tours"
            className="max-w-3xl"
          />
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {regions.map((region) => (
                <Link
                  key={region}
                  href={region === "All" ? "/group-tours" : `/group-tours?region=${slug(region)}`}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    active === region
                      ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950"
                      : "border border-border bg-card text-muted-foreground hover:border-amber-400 hover:text-foreground"
                  }`}
                >
                  {region}
                  <span className={`ml-1.5 ${active === region ? "text-white/60 dark:text-slate-950/60" : "text-muted-foreground/60"}`}>
                    {counts[region] ?? 0}
                  </span>
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {filtered.length} tour{filtered.length === 1 ? "" : "s"} available
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-muted-foreground">
                <Compass size={24} />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-foreground">No tours in this category yet</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                New departures are added as they are confirmed. Ask us for the current
                schedule and we will send what is open.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/group-tours"
                  className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-amber-400"
                >
                  All tours
                </Link>
                <a
                  href="https://wa.me/923464993122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-amber-500 dark:text-slate-950"
                >
                  Ask about dates
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>

      {uniquePhotos.length > 0 && (
        <section className="border-t border-border bg-surface py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                  From the road
                </p>
                <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Photos from AUZBIZ departures
                </h2>
                <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                  Uploaded by the team after each group returns. Tap any photo to open it.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <MapPin size={12} /> Real trips, not stock photography
              </span>
            </div>
            <Gallery images={uniquePhotos} label="AUZBIZ group tour photo" />
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
              Group of 10 or more?
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              We will build the departure around your group.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
              Family reunions, corporate retreats, university groups, and Eid trips — custom
              dates, hotels, and transport.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Plan a private group <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
