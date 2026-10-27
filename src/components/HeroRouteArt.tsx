/**
 * Decorative hero illustration: a wireframe globe with a single amber route.
 * Purely presentational — it does not represent live flight data.
 */
export default function HeroRouteArt() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <div className="absolute inset-8 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/[0.07]" />

      <svg
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="hero-route" x1="118" y1="410" x2="424" y2="132" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d97706" stopOpacity=".25" />
            <stop offset=".45" stopColor="#d97706" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Globe */}
        <g className="text-slate-300 dark:text-slate-700">
          <circle cx="260" cy="260" r="196" stroke="currentColor" strokeWidth="1.2" opacity=".75" />
          <circle cx="260" cy="260" r="144" stroke="currentColor" strokeWidth="1" strokeDasharray="3 8" opacity=".55" />
          <ellipse cx="260" cy="260" rx="80" ry="196" stroke="currentColor" strokeWidth="1.1" opacity=".65" />
          <ellipse cx="260" cy="260" rx="152" ry="196" stroke="currentColor" strokeWidth="1" opacity=".4" />
          <path d="M64 260h392" stroke="currentColor" strokeWidth="1.1" opacity=".65" />
          <path d="M92 186h336M92 334h336M110 138h300M110 382h300" stroke="currentColor" strokeWidth="1" opacity=".35" />
        </g>

        {/* Subtle landmass shapes */}
        <g className="text-sky-600 dark:text-sky-500" opacity=".18">
          <path d="M150 118c28 13 43 37 38 62-5 27-32 34-30 64 2 24 21 36 15 62-5 26-31 37-33 68" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
          <path d="M372 96c-24 21-25 46-10 66 15 21 43 21 47 50 4 27-17 41-12 70 4 22 22 33 26 56" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
        </g>

        {/* Route */}
        <path
          d="M118 410c52-88 112-158 196-213 37-24 80-48 128-66"
          stroke="#f59e0b"
          strokeOpacity=".12"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M118 410c52-88 112-158 196-213 37-24 80-48 128-66"
          stroke="url(#hero-route)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="1 10"
        />

        {/* Markers */}
        <g>
          <circle cx="118" cy="410" r="7" fill="#d97706" />
          <circle cx="118" cy="410" r="17" stroke="#d97706" strokeOpacity=".3" />
          <circle cx="442" cy="131" r="7" fill="#f59e0b" />
          <circle cx="442" cy="131" r="17" stroke="#f59e0b" strokeOpacity=".28" />
        </g>

        {/* Plane */}
        <g transform="translate(300 225) rotate(-35)">
          <path d="M0 15 40 0 20 35l-7-15L0 15Z" fill="#f59e0b" />
        </g>

        <text x="118" y="448" fill="currentColor" className="text-slate-500 dark:text-slate-400" fontFamily="Arial, Helvetica, sans-serif" fontSize="11" fontWeight="600" letterSpacing="3">
          LAHORE
        </text>
        <text x="394" y="112" fill="currentColor" className="text-slate-500 dark:text-slate-400" fontFamily="Arial, Helvetica, sans-serif" fontSize="11" fontWeight="600" letterSpacing="3">
          OUTBOUND
        </text>
      </svg>

      <div className="absolute bottom-2 left-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground shadow-sm backdrop-blur">
        Illustrative route
      </div>
    </div>
  );
}
