"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Plane, GraduationCap, IdCard, Users, Camera } from "lucide-react";

interface BrandMarkProps {
  className?: string;
  darkOnLight?: boolean;
}

function BrandMark({ className = "", darkOnLight = false }: BrandMarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      style={{ color: darkOnLight ? "var(--foreground)" : "#ffffff" }}
      aria-label="AUZBIZ Group"
    >
      <span
        aria-hidden="true"
        className="rounded-full flex h-7 w-7 items-center justify-center"
        style={{
          background: darkOnLight
            ? "rgba(11, 27, 58, 0.08)"
            : "rgba(255, 255, 255, 0.12)",
          color: darkOnLight ? "var(--navy, #0b1b3a)" : "#fbbf24",
          border: darkOnLight
            ? "1px solid rgba(11, 27, 58, 0.2)"
            : "1px solid rgba(255, 255, 255, 0.28)",
        }}
      >
        <Globe size={14} strokeWidth={2.2} />
      </span>
      <span className="inline-flex flex-col leading-tight tracking-tight">
        <span className="text-[0.72rem] font-semibold tracking-[0.24em] uppercase" style={{ color: darkOnLight ? "var(--navy, #0b1b3a)" : "#fbbf24" }}>
          AUZBIZ
        </span>
        <span
          className="text-[0.62rem] font-semibold tracking-[0.28em] uppercase"
          style={{
            color: darkOnLight
              ? "rgba(15, 23, 42, 0.82)"
              : "rgba(255, 255, 255, 0.82)",
          }}
        >
          — GROUP —
        </span>
      </span>
    </span>
  );
}

function BrandTagline({ darkOnLight = false }: { darkOnLight?: boolean }) {
  return (
    <span
      className="ml-1 rounded-full border px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.22em] uppercase"
      style={{
        color: darkOnLight ? "var(--navy, #0b1b3a)" : "#ffffff",
        backgroundColor: darkOnLight
          ? "rgba(11, 27, 58, 0.08)"
          : "rgba(255, 255, 255, 0.12)",
        borderColor: darkOnLight
          ? "rgba(11, 27, 58, 0.28)"
          : "rgba(255, 255, 255, 0.28)",
      }}
    >
      Dream Beyond Borders
    </span>
  );
}

function HeroBadge({ eyebrow, darkOnLight = false }: { eyebrow: string; darkOnLight?: boolean }) {
  return (
    <span
      className="rounded-md bg-[var(--accent)] px-2.5 py-0.5 text-[0.7rem] font-semibold tracking-[0.22em] uppercase"
      style={{
        color: darkOnLight ? "var(--navy, #0b1b3a)" : "#ffffff",
        backgroundColor: darkOnLight
          ? "var(--navy, #0b1b3a)"
          : "var(--accent, #fbbf24)",
      }}
    >
      {eyebrow}
    </span>
  );
}

function TierButton({
  label,
  href,
  variant = "gold",
  darkOnLight = false,
  external,
}: {
  label: string;
  href: string;
  variant?: "gold" | "navy" | "orange";
  darkOnLight?: boolean;
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full border-0 px-5 py-2.5 text-sm font-semibold transition-colors";
  const colors = {
    gold: {
      bg: darkOnLight ? "var(--navy, #0b1b3a)" : "#fbbf24",
      fg: darkOnLight ? "#ffffff" : "#3a2a00",
    },
    navy: {
      bg: "var(--navy, #0b1b3a)",
      fg: "#ffffff",
    },
    orange: {
      bg: "#f97316",
      fg: "#1f1300",
    },
  }[variant];
  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener noreferrer" : undefined;
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={base}
      style={{
        backgroundColor: colors.bg,
        color: colors.fg,
        boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
      }}
    >
      {label}
    </Link>
  );
}

function SmallIconRow({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="flex gap-2" style={{ color }}>
      {children}
    </div>
  );
}

export type BannerVariant =
  | "umrah"
  | "education"
  | "group"
  | "visa";

interface AUZPromoBannerProps {
  variant: BannerVariant;
  href: string;
  external?: boolean;
  darkOnLight?: boolean;
  className?: string;
  /**
   * Optional real 4K hero photo uploaded via the dashboard. When present,
   * renders as the promo background with the inline SVG layered behind a
   * subtle tint as a fallback/art direction layer.
   */
  heroImage?: string;
  heroAlt?: string;
}

export default function AUZPromoBanner({
  variant,
  href,
  external,
  darkOnLight = false,
  className = "",
  heroImage,
  heroAlt,
}: AUZPromoBannerProps) {
  const muted = darkOnLight
    ? "var(--muted-foreground)"
    : "rgba(255,255,255,0.86)";
  const titleColor = darkOnLight
    ? "var(--foreground)"
    : "#ffd966";

  const layouts = {
    umrah: {
      eyebrow: "Sacred",
      title: "SACRED UMRAH JOURNEY",
      sub: "Perform Umrah 2024–25 · Packages to Makkah & Medina · Dedicated Services",
      cta: "BOOK YOUR UMRAH",
      ctaVariant: "gold" as const,
      icon: <SmallIconRow color={darkOnLight ? "#ffd966" : "#ffd966"}><Plane size={18} strokeWidth={2.2} /><Globe size={18} strokeWidth={2.2} /></SmallIconRow>,
    },
    education: {
      eyebrow: undefined,
      title: "YOUR GLOBAL EDUCATION BEGINS",
      sub: "Study Abroad · UK, USA, Canada, Australia · Expert University Admissions & Visa Guidance",
      cta: "STUDY ABROAD NOW",
      ctaVariant: "navy" as const,
      icon: <SmallIconRow color={darkOnLight ? "#0b1b3a" : "#0b1b3a"}><Globe size={18} strokeWidth={2.2} /><GraduationCap size={18} strokeWidth={2.2} /></SmallIconRow>,
    },
    group: {
      eyebrow: undefined,
      title: "EXPLORE THE WORLD TOGETHER",
      sub: "Guided Group Tours · Europe, Asia, Africa · Memorable Travel Experiences · Hassle-Free Bookings",
      cta: "VIEW GROUP TOURS",
      ctaVariant: "orange" as const,
      icon: <SmallIconRow color={darkOnLight ? "#ffffff" : "#ffffff"}><Users size={18} strokeWidth={2.2} /><Camera size={18} strokeWidth={2.2} /></SmallIconRow>,
    },
    visa: {
      eyebrow: "Experienced",
      title: "EXPERIENCED VISA SOLUTIONS",
      sub: "Visa Application Support · US, UK, Schengen, Canada · Work, Study, Visit, Immigration",
      cta: "GET A VISA CONSULTATION",
      ctaVariant: "gold" as const,
      icon: <SmallIconRow color={darkOnLight ? "var(--muted-foreground)" : "#cfe0ff"}><IdCard size={16} strokeWidth={2.2} /></SmallIconRow>,
    },
  };

  const layout = layouts[variant];

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-border/40 bg-[var(--navy)] text-white shadow-xl ${className}`}
      aria-label={`AUZBIZ ${variant} promo`}
      style={{
        position: "relative",
        background: "var(--navy, #0b1b3a)",
      }}
    >
      {/* Promo background art — real 4K photo when the desk has uploaded one,
        otherwise the inline SVG hero art. */}
      {heroImage ? (
        <div
          className="absolute inset-0 overflow-hidden"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={heroImage}
            alt={heroAlt || `AUZBIZ ${variant} promo photo`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,27,58,0.35) 0%, rgba(11,27,58,0.55) 100%)",
            }}
          />
          <AUZPromoBackground variant={variant} darkOnLight={true} />
        </div>
      ) : (
        <AUZPromoBackground variant={variant} darkOnLight={darkOnLight} />
      )}

      {/* Brand lockup */}
      <div
        className="relative z-10 mx-5 mb-3 flex items-center justify-between"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <BrandMark darkOnLight={darkOnLight} />
        <BrandTagline darkOnLight={darkOnLight} />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-5 flex flex-col justify-between rounded-2xl p-5"
        style={{
          position: "relative",
          zIndex: 1,
          background: darkOnLight
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.55)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="flex flex-wrap items-start gap-3">
          {layout.eyebrow && (
            <HeroBadge eyebrow={layout.eyebrow} darkOnLight={darkOnLight} />
          )}
          <h2
            className="text-2xl font-extrabold leading-tight tracking-tight"
            style={{ color: titleColor }}
          >
            {layout.title}
          </h2>
        </div>

        <p
          className="mt-3 max-w-[88%] leading-relaxed text-sm"
          style={{ color: muted }}
        >
          {layout.sub}
        </p>

        <div
          className="flex flex-wrap items-center justify-between gap-3 mt-4"
          style={{ color: darkOnLight ? "var(--muted-foreground)" : muted }}
        >
          <div className="flex flex-wrap gap-2">
            {layout.icon}
          </div>
          <TierButton
            label={layout.cta}
            href={href}
            variant={layout.ctaVariant}
            darkOnLight={darkOnLight}
            external={external}
          />
        </div>
      </div>
    </section>
  );
}

function AUZPromoBackground({
  variant,
  darkOnLight,
}: {
  variant: BannerVariant;
  darkOnLight: boolean;
}) {
  if (darkOnLight) {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-[28rem] w-[28rem] rounded-full"
        style={{
          background: "radial-gradient(circle at 75% 20%, rgba(245,158,11,0.18), rgba(11,27,58,0) 65%)",
        }}
      />
    );
  }

  // Variant-specific abstract art, purely decorative.
  const art = {
    umrah: (
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="umrahSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2c3a55" />
            <stop offset="0.45" stopColor="#1a2740" />
            <stop offset="0.75" stopColor="#0b1b3a" />
            <stop offset="1" stopColor="#020617" />
          </linearGradient>
          <radialGradient id="umrahGlow" cx="0.78" cy="0.24" r="0.55">
            <stop offset="0" stopColor="#fbbf24" stopOpacity="0.32" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#umrahSky)" />
        <rect width="1200" height="600" fill="url(#umrahGlow)" />

        {/* Mosque silhouette */}
        <g fill="#080d1a" stroke="#0b1b3a" strokeWidth="1" strokeLinejoin="round">
          <path d="M140 420 L140 280 L152 274 L152 270 L140 270 Z" />
          <path d="M330 420 L330 250 L346 242 L346 238 L330 238 Z" />
          <path d="M820 420 L820 278 L834 272 L834 268 L820 268 Z" />
          <path d="M940 420 L940 252 L956 246 L956 242 L940 242 Z" />
        </g>

        {/* central dome */}
        <path
          d="M520 420 L520 320 Q520 260 610 260 Q700 260 700 320 L700 420 Z"
          fill="#11233f"
        />
        <path
          d="M550 320 Q550 274 610 274 Q670 274 670 320 Z"
          fill="#1a2d4f"
        />
        <circle cx="610" cy="274" r="11" fill="#fbbf24" />

        {/* mosque base / horizon */}
        <rect x="500" y="420" width="220" height="30" fill="#080d1a" />
        <rect x="0" y="450" width="1200" height="150" fill="#020617" />
      </svg>
    ),
    education: (
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="eduSky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dbeafe" />
            <stop offset="0.5" stopColor="#eaf4ff" />
            <stop offset="1" stopColor="#f7fbff" />
          </linearGradient>
          <linearGradient id="eduOverlay" x1="0" y1="0" x2="1" y2="0.2">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#0b1b3a" stopOpacity="0.82" />
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#eduSky)" />
        <rect width="1200" height="600" fill="url(#eduOverlay)" />

        {/* gothic silhouette */}
        <g fill="#0b1b3a" opacity="0.85">
          <rect x="80" y="240" width="460" height="360" />
          <rect x="80" y="200" width="460" height="40" />
          <rect x="160" y="120" width="30" height="120" />
          <rect x="460" y="100" width="30" height="160" />
          <circle cx="250" cy="180" r="120" fill="#06122a" />
        </g>

        {/* tower lines */}
        <g stroke="#0b1b3a" strokeWidth="3" fill="none">
          <path d="M120 240 v18 M180 240 v18 M240 240 v18 M300 240 v18 M500 240 v18 M560 240 v18 M620 240 v18" />
        </g>

        {/* sunny figure cutout-style */}
        <g transform="translate(760 360)">
          <circle cx="0" cy="-78" r="22" fill="#f3d9a8" />
          <path d="M-26 10 q28 34 52 0 z" fill="#9aa7b4" />
          <path d="M-30 6 q22 14 44 0 z" fill="#2c4a8c" />
          <path d="M-22 -52 q24 22 48 0 z" fill="#f3e3c4" />
          <path d="M-12 -100 q8 -18 16 -20 q8 2 10 10 q12 8 21 2 z" fill="#f3e3c4" />
        </g>

        {/* book + passport props */}
        <g transform="translate(880 400)">
          <rect width="16" height="22" fill="#edf2f8" stroke="#0b1b3a" strokeWidth="1.5" />
          <rect x="6" y="2" width="8" height="2" fill="#0b1b3a" />
          <rect x="6" y="6" width="8" height="2" fill="#0b1b3a" />
          <rect x="6" y="10" width="8" height="2" fill="#0b1b3a" />
        </g>
        <g transform="translate(912 420)">
          <rect width="26" height="18" fill="#1d4ed8" />
          <rect x="2" y="2" width="4" height="3" fill="#e6eef9" />
          <text x="8" y="13" fontSize="5" fill="#ffffff" fontFamily="ui-sans-serif, system-ui, sans-serif">PK</text>
        </g>
      </svg>
    ),
    group: (
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="valleySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9ad3ff" />
            <stop offset="0.45" stopColor="#cfe9ff" />
            <stop offset="0.75" stopColor="#d6ecd9" />
            <stop offset="1" stopColor="#f2f7f2" />
          </linearGradient>
          <linearGradient id="valleyOverlay" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000000" stopOpacity="0" />
            <stop offset="0.55" stopColor="#000000" stopOpacity="0" />
            <stop offset="1" stopColor="#0b1b3a" stopOpacity="0.82" />
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#valleySky)" />
        <rect width="1200" height="600" fill="url(#valleyOverlay)" />

        {/* mountains */}
        <path d="M0 380 L180 280 L300 380 Z" fill="#0b1b3a" />
        <path d="M240 380 L470 220 L660 380 Z" fill="#0b1b3a" />
        <path d="M590 380 L820 260 L1200 380 Z" fill="#0b1b3a" />

        {/* snow caps */}
        <path d="M430 260 L470 220 L510 260 Z" fill="#ffffff" />
        <path d="M770 295 L820 260 L870 295 Z" fill="#ffffff" />

        {/* sun */}
        <circle cx="200" cy="160" r="75" fill="#fff5c2" opacity="0.85" />
        <circle cx="200" cy="160" r="46" fill="#fff8dc" />

        {/* trail */}
        <path
          d="M100 450 Q260 380 380 420 T580 430 T760 440"
          stroke="#7c5a2e"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* hikers */}
        <g fill="#0b1b3a">
          <circle cx="320" cy="410" r="6" />
          <path d="M308 410 l12 14 l12-14 z" />
          <circle cx="380" cy="416" r="6" />
          <path d="M368 416 l12 14 l12-14 z" />
          <circle cx="450" cy="414" r="6" />
          <path d="M438 414 l12 14 l12-14 z" />
        </g>

        {/* trees */}
        <g fill="#0b1b3a" opacity="0.7">
          <path d="M140 450 L135 490 L145 490 Z" />
          <path d="M120 490 L160 490 L140 465 Z" />
          <path d="M900 450 L895 490 L905 490 Z" />
          <path d="M880 490 L920 490 L900 465 Z" />
        </g>
      </svg>
    ),
    visa: (
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="visaBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a3a8a" />
            <stop offset="0.5" stopColor="#0b1b3a" />
            <stop offset="1" stopColor="#030918" />
          </linearGradient>
          <radialGradient id="visaGlobeGlow" cx="0.5" cy="0.42" r="0.45">
            <stop offset="0" stopColor="#5aa0ff" stopOpacity="0.9" />
            <stop offset="0.7" stopColor="#2f5fb0" stopOpacity="0.4" />
            <stop offset="1" stopColor="#0b1b3a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#visaBg)" />
        <circle cx="600" cy="260" r="190" fill="url(#visaGlobeGlow)" />

        {/* 3D-style globe */}
        <circle cx="600" cy="260" r="128" fill="#06122a" stroke="#5aa0ff" strokeWidth="2" />
        <g stroke="#5aa0ff" strokeWidth="1.4" fill="none" opacity="0.9">
          <ellipse cx="600" cy="260" rx="128" ry="36" />
          <ellipse cx="600" cy="260" rx="128" ry="19" transform="rotate(40 600 260)" />
          <ellipse cx="600" cy="260" rx="128" ry="19" transform="rotate(-40 600 260)" />
          <ellipse cx="600" cy="260" rx="36" ry="128" />
          <ellipse cx="600" cy="260" rx="19" ry="128" transform="rotate(40 600 260)" />
          <ellipse cx="600" cy="260" rx="19" ry="128" transform="rotate(-40 600 260)" />
        </g>
        <g fill="#5aa0ff">
          <path d="M520 240 q22 -14 44 0 q14 11 -7 20 q-22 9 -44 0 Z" />
          <path d="M590 240 q22 -11 42 3 q11 13 -5 20 q-24 7 -42 3 Z" />
        </g>

        {/* landmarks */}
        <g transform="translate(0 -24)" opacity="0.5" fill="#cfe0ff">
          <path d="M140 360 l18 -24 h22 l18 24 v32 h-78 Z" />
          <rect x="140" y="328" width="80" height="6" fill="#cfe0ff" />
          <rect x="176" y="316" width="7" height="44" fill="#cfe0ff" />
          <circle cx="179" cy="314" r="4" fill="#ffd966" />

          <path d="M340 360 l12 -24 h16 l12 24 v32 h-52 Z" />
          <rect x="340" y="330" width="56" height="6" fill="#cfe0ff" />
          <rect x="364" y="318" width="5" height="42" fill="#cfe0ff" />
          <circle cx="366" cy="316" r="3.5" fill="#ffd966" />

          <path d="M800 360 l14 -24 h18 l14 24 v32 h-60 Z" />
          <rect x="800" y="330" width="60" height="6" fill="#cfe0ff" />
          <rect x="832" y="318" width="6" height="42" fill="#cfe0ff" />
          <circle cx="835" cy="316" r="3.5" fill="#ffd966" />
        </g>

        {/* passports fan */}
        <g transform="translate(430 460)">
          <g transform="rotate(-18)">
            <rect width="62" height="88" rx="6" fill="#fff8e6" stroke="#b45309" strokeWidth="2" />
            <rect x="7" y="11" width="48" height="13" fill="#1a3a8a" />
            <text x="7" y="25" fontSize="9" fill="#1a3a8a" fontFamily="ui-sans-serif, system-ui, sans-serif">PASSPORT</text>
          </g>
          <g transform="rotate(-3)">
            <rect x="46" y="0" width="64" height="92" rx="6" fill="#f8f3ff" stroke="#1a3a8a" strokeWidth="2" />
            <rect x="52" y="13" width="48" height="13" fill="#1a3a8a" />
            <text x="52" y="27" fontSize="9" fill="#1a3a8a" fontFamily="ui-sans-serif, system-ui, sans-serif">visa</text>
          </g>
          <g transform="rotate(15)">
            <rect x="92" y="2" width="60" height="84" rx="6" fill="#fff8e6" stroke="#b45309" strokeWidth="2" />
            <rect x="98" y="11" width="48" height="13" fill="#1a3a8a" />
            <text x="98" y="25" fontSize="9" fill="#1a3a8a" fontFamily="ui-sans-serif, system-ui, sans-serif">TOUR</text>
          </g>
        </g>

        {/* document overlays */}
        <g transform="translate(780 320)" opacity="0.85">
          <rect width="64" height="42" rx="2" fill="#ffffff" stroke="#cfe0ff" />
          <rect x="7" y="9" width="50" height="3" fill="#cfe0ff" />
          <rect x="7" y="16" width="32" height="3" fill="#cfe0ff" />
        </g>
      </svg>
    ),
  };

  return art[variant];
}

export type PromoHeroImage = {
  /**
   * Real 4K promo photo URL, uploaded via the dashboard tour editor.
   * When present for a variant, the promo banner shows the photo; otherwise
   * it falls back to the inline SVG hero art.
   */
  url?: string;
  alt?: string;
};

export interface PromoHeroImages {
  umrah?: PromoHeroImage;
  education?: PromoHeroImage;
  group?: PromoHeroImage;
  visa?: PromoHeroImage;
}

export function AUZPromoGrid({
  heroImages,
}: {
  heroImages?: PromoHeroImages;
} = {}) {
  return (
    <div
      className="grid gap-5"
      style={{
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      }}
      role="list"
      aria-label="AUZBIZ service promos"
    >
      <AUZPromoBanner
        variant="umrah"
        href="/visas"
        key="umrah"
        heroImage={heroImages?.umrah?.url}
        heroAlt={heroImages?.umrah?.alt}
      />
      <AUZPromoBanner
        variant="education"
        href="/services#study"
        key="education"
        heroImage={heroImages?.education?.url}
        heroAlt={heroImages?.education?.alt}
      />
      <AUZPromoBanner
        variant="group"
        href="/group-tours"
        key="group"
        heroImage={heroImages?.group?.url}
        heroAlt={heroImages?.group?.alt}
      />
      <AUZPromoBanner
        variant="visa"
        href="/contact?service=Visa%20Services"
        key="visa"
        heroImage={heroImages?.visa?.url}
        heroAlt={heroImages?.visa?.alt}
      />
    </div>
  );
}
