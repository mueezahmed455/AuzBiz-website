import { ArrowRight, CalendarDays, Check, Plane } from "lucide-react";

/**
 * A quiet, editorial trip brief for the hero. It gives the site a concrete
 * travel cue without pretending to show live inventory or fabricated pricing.
 */
export default function HeroRouteArt() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[500px]">
      <div className="absolute -inset-8 rounded-[2.5rem] bg-amber-500/[0.08] blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#111827] shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
              A typical trip brief
            </p>
            <p className="mt-1 text-sm font-medium text-white">Lahore to Dubai</p>
          </div>
          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
            On request
          </span>
        </div>

        <div className="px-6 py-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-4xl font-semibold tracking-tight text-white">LHE</p>
              <p className="mt-1 text-xs text-slate-400">Lahore</p>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-amber-400/80 to-white/20" />
              <Plane className="shrink-0 rotate-90 text-amber-300" size={18} />
              <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-amber-400/80" />
            </div>
            <div className="text-right">
              <p className="text-4xl font-semibold tracking-tight text-white">DXB</p>
              <p className="mt-1 text-xs text-slate-400">Dubai</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <CalendarDays size={16} className="text-amber-300" />
              <p className="mt-3 text-xs text-slate-400">Dates</p>
              <p className="mt-1 text-sm font-medium text-white">Flexible</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <Check size={16} className="text-amber-300" />
              <p className="mt-3 text-xs text-slate-400">Planning style</p>
              <p className="mt-1 text-sm font-medium text-white">Clear options</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-6 py-4">
          <span className="text-xs text-slate-400">Flights · hotels · support</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300">
            Start with a brief <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </div>
  );
}
