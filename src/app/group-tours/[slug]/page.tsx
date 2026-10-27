import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { getPublishedTours, getTourBySlug } from "@/lib/content/store";
import RichText from "@/components/RichText";
import Gallery from "@/components/Gallery";
import TourArtwork from "@/components/TourArtwork";
import TourCard from "@/components/TourCard";

export const dynamic = "force-dynamic";

const SITE = "https://www.auzbizgroup.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Tour not found" };

  return {
    title: tour.title,
    description: tour.summary,
    openGraph: {
      title: `${tour.title} — AUZBIZ Group`,
      description: tour.summary,
      type: "website",
      images: tour.coverImage ? [{ url: tour.coverImage, alt: tour.coverAlt || tour.title }] : undefined,
    },
    alternates: { canonical: `${SITE}/group-tours/${tour.slug}` },
  };
}

function parsePrice(price: string): { amount: string; currency: string } | null {
  const match = price.match(/^([A-Z]{3})\s*([\d,]+)/);
  if (!match) return null;
  return { currency: match[1], amount: match[2].replace(/,/g, "") };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const allTours = await getPublishedTours();
  const related = allTours
    .filter((entry) => entry.slug !== tour.slug)
    .sort((a, b) => {
      const aScore = a.region === tour.region ? 1 : 0;
      const bScore = b.region === tour.region ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, 3);

  const price = parsePrice(tour.price);
  const shareUrl = `${SITE}/group-tours/${tour.slug}`;
  const whatsappText = `Assalam o Alaikum, I'm interested in the ${tour.title} (${tour.duration}). Could you share the next available dates and final price?`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    touristType: "Group tour",
    provider: { "@type": "TravelAgency", name: "AUZBIZ Group", url: SITE },
    offers: price
      ? { "@type": "Offer", price: price.amount, priceCurrency: price.currency, url: shareUrl }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-border bg-surface">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[11px] text-muted-foreground sm:px-6 lg:px-8"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/group-tours" className="transition-colors hover:text-foreground">
            Group tours
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-foreground">{tour.title}</span>
        </nav>
      </div>

      <header className="relative overflow-hidden bg-slate-950 pb-28 pt-14 text-white sm:pb-32 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-32 h-[30rem] w-[30rem] rounded-full bg-amber-500/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-bold uppercase tracking-[0.16em] text-amber-300">
              {tour.region}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/60">
              <CalendarDays size={12} /> {tour.departure}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/60">
              <Clock size={12} /> {tour.duration}
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            {tour.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg">
            {tour.summary}
          </p>
          <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-white/60">
            <MapPin size={13} /> {tour.destination}
          </p>
        </div>
      </header>

      <div className="relative mx-auto -mt-16 max-w-5xl px-4 sm:-mt-20 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:rounded-3xl">
          {tour.coverImage ? (
            <Image
              src={tour.coverImage}
              alt={tour.coverAlt || tour.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          ) : (
            <TourArtwork destination={tour.destination} region={tour.region} showRegion={false} />
          )}
        </div>
      </div>

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
          <div className="min-w-0">
            <RichText blocks={tour.description} />

            {tour.highlights.length > 0 && (
              <div className="mt-10 rounded-2xl border border-border bg-card p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-foreground">What&apos;s included</h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {tour.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.gallery.length > 0 && (
              <div className="mt-10">
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                      Photo gallery
                    </p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                      From this group
                    </h2>
                  </div>
                  <span className="text-xs text-muted-foreground">{tour.gallery.length} photos</span>
                </div>
                <Gallery images={tour.gallery} label={`${tour.title} photo`} />
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <Link
                href="/group-tours"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft size={15} /> All group tours
              </Link>
              <p className="text-xs text-muted-foreground">
                Final pricing depends on departure date and group size.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Starting from
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{tour.price}</p>

              <dl className="mt-5 space-y-3 border-t border-border pt-4 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <CalendarDays size={12} /> Departure
                  </dt>
                  <dd className="text-right font-medium text-foreground">{tour.departure}</dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={12} /> Duration
                  </dt>
                  <dd className="text-right font-medium text-foreground">{tour.duration}</dd>
                </div>
                {tour.groupSize && (
                  <div className="flex items-start justify-between gap-3">
                    <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Users size={12} /> Group size
                    </dt>
                    <dd className="text-right font-medium text-foreground">{tour.groupSize}</dd>
                  </div>
                )}
                <div className="flex items-start justify-between gap-3">
                  <dt className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <MapPin size={12} /> Route
                  </dt>
                  <dd className="text-right font-medium text-foreground">{tour.destination}</dd>
                </div>
              </dl>

              <a
                href={`https://wa.me/923464993122?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                <MessageCircle size={16} /> Check availability
              </a>
              <Link
                href={`/contact?tour=${encodeURIComponent(tour.title)}`}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-amber-400"
              >
                Request an itinerary <ArrowRight size={14} />
              </Link>

              <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
                <ShieldCheck size={13} className="mt-0.5 shrink-0 text-emerald-500" />
                No payment is taken on this website. We confirm dates and pricing with you
                before anything is booked.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                  More journeys
                </p>
                <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">
                  You might also like
                </h2>
              </div>
              <Link
                href="/group-tours"
                className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((entry) => (
                <TourCard key={entry.id} tour={entry} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
