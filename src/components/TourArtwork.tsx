import { Compass, MapPin } from "lucide-react";
import type { TourRegion } from "@/lib/content/types";

const palettes: Record<TourRegion, string> = {
  International: "from-slate-950 via-slate-900 to-sky-950",
  Umrah: "from-slate-950 via-emerald-950 to-teal-900",
  Domestic: "from-slate-950 via-amber-950 to-orange-900",
  Corporate: "from-slate-950 via-indigo-950 to-violet-950",
};

/**
 * Honest fallback when a tour has no photo yet: a designed gradient plate
 * rather than a stock image that misrepresents the trip.
 */
export default function TourArtwork({
  destination,
  region,
  className = "",
  compact = false,
  showRegion = true,
}: {
  destination: string;
  region: TourRegion;
  className?: string;
  compact?: boolean;
  showRegion?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br ${palettes[region]} ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.55) 0, transparent 32%), radial-gradient(circle at 80% 85%, rgba(255,255,255,0.35) 0, transparent 38%)",
        }}
      />
      <Compass
        aria-hidden="true"
        className="absolute -right-10 -top-8 text-white/10"
        size={compact ? 120 : 220}
        strokeWidth={0.8}
      />
      {showRegion && (
        <div className="relative flex items-center gap-1.5 p-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
          <MapPin size={11} />
          {region}
        </div>
      )}
      <p
        className={`relative mt-auto px-4 pb-4 font-semibold leading-snug text-white ${
          compact ? "text-sm" : "text-2xl sm:text-4xl"
        }`}
      >
        {destination}
      </p>
    </div>
  );
}
