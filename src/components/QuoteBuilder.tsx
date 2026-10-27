"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, MessageCircle, X } from "lucide-react";

type Step = "destination" | "details" | "services" | "contact" | "complete";

interface QuoteData {
  destType: string;
  destination: string;
  duration: string;
  groupSize: string;
  budget: string;
  services: string[];
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const destTypes = [
  { value: "international", label: "International tour", desc: "Thailand, Uzbekistan, Türkiye, Malaysia, Bali, Europe" },
  { value: "umrah", label: "Umrah", desc: "Makkah & Madinah — economy to premium" },
  { value: "domestic", label: "Domestic tour", desc: "Hunza, Skardu, Swat, Murree, Naran" },
  { value: "corporate", label: "Corporate / MICE", desc: "Incentive tours, conferences, team retreats" },
  { value: "study", label: "Study abroad", desc: "University admissions & student visas" },
];

const popularDestinations: Record<string, string[]> = {
  international: ["Uzbekistan", "Thailand", "Malaysia", "Bali", "Türkiye", "Dubai", "Europe (multi-city)"],
  umrah: ["Makkah + Madinah (economy)", "Makkah + Madinah (standard)", "Makkah + Madinah (premium 5-star)", "Ramadan Umrah"],
  domestic: ["Hunza Valley", "Skardu & Deosai", "Swat & Kalam", "Murree & Galliyat", "Naran & Kaghan"],
  corporate: ["Incentive tour", "Team retreat", "Conference", "Gala dinner", "Custom event"],
  study: ["Türkiye", "Malaysia", "Hungary", "Azerbaijan", "China"],
};

const serviceOptions = [
  "Air ticketing", "Hotel bookings", "Visa services", "Transport & transfers",
  "Guided tours", "Travel insurance", "Halal meal planning", "On-trip support",
];

const steps: { id: Step; label: string }[] = [
  { id: "destination", label: "Trip type" },
  { id: "details", label: "Details" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:bg-slate-900";

const labelClass = "mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground";

interface QuoteBuilderProps {
  onClose?: () => void;
}

export default function QuoteBuilder({ onClose }: QuoteBuilderProps) {
  const fieldId = useId();
  const [step, setStep] = useState<Step>("destination");
  const [data, setData] = useState<QuoteData>({
    destType: "",
    destination: "",
    duration: "",
    groupSize: "",
    budget: "",
    services: [],
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (fields: Partial<QuoteData>) => setData((prev) => ({ ...prev, ...fields }));

  const toggleService = (s: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case "destination": return !!data.destType;
      case "details": return !!data.destination && !!data.duration && !!data.groupSize;
      case "services": return data.services.length > 0;
      case "contact": return !!data.name && !!data.phone;
      default: return true;
    }
  };

  const submitQuote = async () => {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.name,
          phone: data.phone,
          email: data.email,
          service: `Quote builder: ${data.destType} - ${data.destination}`,
          destination: data.destination,
          travelDates: data.duration,
          groupSize: `${data.groupSize} persons, budget: ${data.budget}`,
          message: `Custom package request\nDestination type: ${data.destType}\nDestination: ${data.destination}\nDuration: ${data.duration}\nGroup size: ${data.groupSize}\nBudget: PKR ${data.budget}\nServices: ${data.services.join(", ")}\nNotes: ${data.notes || "None"}`,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStep("complete");
    } catch {
      setError("Something went wrong. Please try again or message us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const activeIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-slate-900/5 dark:shadow-black/30">
      {/* Header */}
      <div className="border-b border-border bg-slate-950 px-5 py-4 sm:px-6 dark:border-white/5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Build your own package</h3>
            <p className="mt-0.5 text-[11px] text-white/60">
              {step === "complete" ? "Request received" : `Step ${activeIndex + 1} of ${steps.length}`}
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quote builder"
              className="-m-1.5 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} strokeWidth={2} />
            </button>
          )}
        </div>
        <ol className="flex gap-1.5" aria-label="Quote progress">
          {steps.map((s, i) => (
            <li key={s.id} className="flex-1">
              <span
                aria-current={s.id === step ? "step" : undefined}
                className={`block h-1 rounded-full transition-colors ${
                  step === "complete" || i <= activeIndex ? "bg-amber-500" : "bg-white/10"
                }`}
              >
                <span className="sr-only">{s.label}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="p-5 sm:p-6">
        <AnimatePresence mode="wait" initial={false}>
          {step === "destination" && (
            <motion.div key="dest" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <p className="mb-3 text-xs font-semibold text-foreground">
                What kind of trip are you planning?
              </p>
              <div className="space-y-2">
                {destTypes.map((dt) => {
                  const selected = data.destType === dt.value;
                  return (
                    <button
                      key={dt.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => { update({ destType: dt.value, destination: "" }); setStep("details"); }}
                      className={`w-full rounded-xl border p-3.5 text-left transition-colors ${
                        selected
                          ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10"
                          : "border-border hover:border-amber-500/50 hover:bg-surface"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-foreground">{dt.label}</span>
                      <span className="mt-0.5 block text-[11px] text-muted-foreground">{dt.desc}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Skip — describe it myself
                </button>
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div key="details" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }} className="space-y-4">
              <p className="text-xs font-semibold text-foreground">Tell us about your trip</p>

              {data.destType && (
                <div>
                  <span className={labelClass}>Destination</span>
                  <div className="flex flex-wrap gap-1.5">
                    {popularDestinations[data.destType]?.map((d) => {
                      const selected = data.destination === d;
                      return (
                        <button
                          key={d}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => update({ destination: d })}
                          className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
                            selected
                              ? "border-slate-950 bg-slate-950 text-white dark:border-amber-500 dark:bg-amber-500 dark:text-slate-950"
                              : "border-border bg-surface text-muted-foreground hover:border-amber-500/60 hover:text-foreground"
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                    <input
                      type="text"
                      aria-label="Other destination"
                      placeholder="Other…"
                      value={popularDestinations[data.destType]?.includes(data.destination) ? "" : data.destination}
                      onChange={(e) => update({ destination: e.target.value })}
                      className="max-w-[130px] rounded-full border border-border bg-transparent px-3 py-1.5 text-[11px] text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`${fieldId}-duration`} className={labelClass}>Duration</label>
                  <select
                    id={`${fieldId}-duration`}
                    value={data.duration}
                    onChange={(e) => update({ duration: e.target.value })}
                    className={`${fieldClass} text-xs`}
                  >
                    <option value="">Select…</option>
                    <option>2–3 days</option>
                    <option>4–5 days</option>
                    <option>6–7 days</option>
                    <option>8–10 days</option>
                    <option>11–14 days</option>
                    <option>15+ days</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`${fieldId}-group`} className={labelClass}>Group size</label>
                  <select
                    id={`${fieldId}-group`}
                    value={data.groupSize}
                    onChange={(e) => update({ groupSize: e.target.value })}
                    className={`${fieldClass} text-xs`}
                  >
                    <option value="">Select…</option>
                    <option>1 (solo)</option>
                    <option>2 (couple)</option>
                    <option>3–4 (family)</option>
                    <option>5–8 (small group)</option>
                    <option>9–15 (medium group)</option>
                    <option>16+ (large group)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor={`${fieldId}-budget`} className={labelClass}>Budget range (PKR)</label>
                <select
                  id={`${fieldId}-budget`}
                  value={data.budget}
                  onChange={(e) => update({ budget: e.target.value })}
                  className={`${fieldClass} text-xs`}
                >
                  <option value="">Select budget…</option>
                  <option>Under 50,000</option>
                  <option>50,000 – 100,000</option>
                  <option>100,000 – 200,000</option>
                  <option>200,000 – 350,000</option>
                  <option>350,000 – 500,000</option>
                  <option>Above 500,000</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setStep("destination")} className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <ArrowLeft size={14} /> Back
                </button>
                <button type="button" onClick={() => setStep("services")} disabled={!canProceed()} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400">
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === "services" && (
            <motion.div key="services" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <p className="mb-1 text-xs font-semibold text-foreground">What services do you need?</p>
              <p className="mb-3 text-[10px] text-muted-foreground">Select all that apply</p>
              <div className="grid grid-cols-2 gap-2">
                {serviceOptions.map((s) => {
                  const selected = data.services.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleService(s)}
                      className={`rounded-xl border px-3.5 py-3 text-left text-xs transition-colors ${
                        selected
                          ? "border-amber-500 bg-amber-50 font-semibold text-foreground dark:bg-amber-500/10"
                          : "border-border text-muted-foreground hover:border-amber-500/50 hover:text-foreground"
                      }`}
                    >
                      {selected ? <Check size={12} strokeWidth={3} className="mr-1 inline text-amber-600 dark:text-amber-400" /> : null}
                      {s}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex gap-2 border-t border-border pt-3">
                <button type="button" onClick={() => setStep("details")} className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <ArrowLeft size={14} /> Back
                </button>
                <button type="button" onClick={() => setStep("contact")} disabled={!canProceed()} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400">
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }} className="space-y-3.5">
              <p className="text-xs font-semibold text-foreground">Where should we send your quote?</p>

              <div>
                <label htmlFor={`${fieldId}-name`} className={labelClass}>Your name <span aria-hidden="true">*</span></label>
                <input
                  id={`${fieldId}-name`}
                  type="text"
                  required
                  value={data.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="e.g. Ahmed Khan"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor={`${fieldId}-phone`} className={labelClass}>WhatsApp / phone <span aria-hidden="true">*</span></label>
                <input
                  id={`${fieldId}-phone`}
                  type="tel"
                  required
                  value={data.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  placeholder="+92 3XX XXXXXXX"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor={`${fieldId}-email`} className={labelClass}>Email address</label>
                <input
                  id={`${fieldId}-email`}
                  type="email"
                  value={data.email}
                  onChange={(e) => update({ email: e.target.value })}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor={`${fieldId}-notes`} className={labelClass}>Notes / special requests</label>
                <textarea
                  id={`${fieldId}-notes`}
                  rows={2}
                  value={data.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                  placeholder="Dates, dietary needs, anything else we should know"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              {error && <p role="alert" className="text-xs text-red-600 dark:text-red-400">{error}</p>}

              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setStep("services")} className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  type="button"
                  onClick={submitQuote}
                  disabled={!canProceed() || submitting}
                  className="ml-auto inline-flex items-center gap-2 rounded-lg bg-slate-950 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Request my quote"
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === "complete" && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }} className="py-6 text-center" role="status">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
                <Check size={26} strokeWidth={2.5} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="mb-1 text-base font-bold text-foreground">Quote request sent</h4>
              <p className="mx-auto mb-5 max-w-xs text-xs leading-relaxed text-muted-foreground">
                We&apos;ll review your requirements and reply on WhatsApp with options and a real quote.
              </p>
              <a
                href="https://wa.me/923464993122?text=Hi%20AUZBIZ!%20I%20just%20submitted%20a%20quote%20request%20on%20your%20website.%20Following%20up%20here."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#20bd5a]"
              >
                <MessageCircle size={14} /> Follow up on WhatsApp
              </a>
              <p className="mt-3 text-[10px] text-muted-foreground">
                Or call us at <span className="font-semibold text-foreground">+92 346 4993122</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
