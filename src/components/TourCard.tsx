import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";
import type { Tour } from "@/lib/content/types";
import TourArtwork from "./TourArtwork";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/group-tours/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {tour.coverImage ? (
          <Image
            src={tour.coverImage}
            alt={tour.coverAlt || tour.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <TourArtwork destination={tour.destination} region={tour.region} compact />
        )}
        {tour.coverImage && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300 backdrop-blur">
            {tour.region}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={11} /> {tour.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={11} /> {tour.departure}
          </span>
        </div>

        <h2 className="mt-2.5 text-lg font-semibold leading-snug text-foreground">{tour.title}</h2>
        <p className="mt-1 text-xs font-medium text-muted-foreground">{tour.destination}</p>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {tour.summary}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">From</p>
            <p className="text-base font-bold text-foreground">{tour.price}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
            View tour
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>

        {tour.groupSize && (
          <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Users size={11} /> {tour.groupSize}
          </p>
        )}
      </div>
    </Link>
  );
}
