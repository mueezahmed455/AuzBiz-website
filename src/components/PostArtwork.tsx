import { Newspaper } from "lucide-react";

const palettes = [
  "from-slate-950 via-slate-900 to-sky-950",
  "from-slate-950 via-slate-900 to-amber-950",
  "from-slate-950 via-slate-900 to-emerald-950",
  "from-slate-950 via-slate-900 to-violet-950",
  "from-slate-950 via-slate-900 to-rose-950",
];

function pick(seed: string): string {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 997;
  }
  return palettes[hash % palettes.length];
}

/** Designed fallback for articles that do not have a cover photo yet. */
export default function PostArtwork({
  title,
  category,
  className = "",
  compact = false,
}: {
  title: string;
  category: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br ${pick(
        `${category}-${title}`,
      )} ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 20%, rgba(251,191,36,0.5) 0, transparent 30%), radial-gradient(circle at 15% 85%, rgba(255,255,255,0.25) 0, transparent 35%)",
        }}
      />
      <Newspaper
        aria-hidden="true"
        className="absolute -right-8 -bottom-8 text-white/10"
        size={compact ? 110 : 190}
        strokeWidth={0.7}
      />
      <p className="relative p-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
        {category}
      </p>
      <p
        className={`relative line-clamp-3 px-4 pb-4 font-semibold leading-snug text-white ${
          compact ? "text-sm" : "text-xl sm:text-2xl"
        }`}
      >
        {title}
      </p>
    </div>
  );
}
