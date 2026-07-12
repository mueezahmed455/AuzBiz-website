"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";

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
  { value: "international", label: "🌍 International Tour", desc: "Thailand, Uzbekistan, Türkiye, Malaysia, Bali, Europe" },
  { value: "umrah", label: "🕌 Umrah Package", desc: "Makkah & Madinah — economy to luxury" },
  { value: "domestic", label: "🏔️ Domestic Tour", desc: "Hunza, Skardu, Swat, Murree, Naran" },
  { value: "corporate", label: "💼 Corporate / MICE", desc: "Incentive tours, conferences, team retreats" },
  { value: "study", label: "🎓 Study Abroad", desc: "University admissions & student visas" },
];

const popularDestinations: Record<string, string[]> = {
  international: ["Uzbekistan", "Thailand", "Malaysia", "Bali", "Türkiye", "Dubai", "Europe (Multi-city)"],
  umrah: ["Makkah + Madinah (Economy)", "Makkah + Madinah (Standard)", "Makkah + Madinah (Premium 5-Star)", "Ramadan Umrah Special"],
  domestic: ["Hunza Valley", "Skardu & Deosai", "Swat & Kalam", "Murree & Galliyat", "Naran & Kaghan"],
  corporate: ["Incentive Tour", "Team Retreat", "Conference", "Gala Dinner", "Custom Event"],
  study: ["Türkiye", "Malaysia", "Hungary", "Azerbaijan", "China"],
};

const serviceOptions = [
  "Air Ticketing", "Hotel Bookings", "Visa Services", "Transport & Transfers",
  "Guided Tours", "Travel Insurance", "Halal Meal Planning", "24/7 Support",
];

interface QuoteBuilderProps {
  onClose?: () => void;
}

export default function QuoteBuilder({ onClose }: QuoteBuilderProps) {
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
          service: `Quote Builder: ${data.destType} - ${data.destination}`,
          destination: data.destination,
          travelDates: data.duration,
          groupSize: `${data.groupSize} persons, budget: ${data.budget}`,
          message: `Custom Package Request\nDestination Type: ${data.destType}\nDestination: ${data.destination}\nDuration: ${data.duration}\nGroup Size: ${data.groupSize}\nBudget: PKR ${data.budget}\nServices: ${data.services.join(", ")}\nNotes: ${data.notes || "None"}`,
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

  return (
    <div className="bg-white dark:bg-[#1a1a3e] border border-gray-100 dark:border-[#2a2a5e] rounded-2xl overflow-hidden shadow-xl">
      {/* Progress header */}
      <div className="bg-navy-800 dark:bg-[#0a0a1a] px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-sm">Build Your Own Package ✨</h3>
            <p className="text-white/50 text-[10px] mt-0.5">Step {["destination", "details", "services", "contact", "complete"].indexOf(step) + 1} of 4</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={18} strokeWidth={2} />
            </button>
          )}
        </div>
        {/* Progress dots */}
        <div className="flex gap-1.5">
          {["destination", "details", "services", "contact"].map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                ["destination", "details", "services", "contact"].indexOf(step) >= i
                  ? "bg-gold-500 w-6"
                  : "bg-white/10 w-3"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {step === "destination" && (
            <motion.div key="dest" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs font-semibold text-navy-800 dark:text-white mb-3">What type of trip are you planning?</p>
              <div className="space-y-2">
                {destTypes.map((dt) => (
                  <button
                    key={dt.value}
                    onClick={() => { update({ destType: dt.value, destination: "" }); setStep("details"); }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 ${
                      data.destType === dt.value
                        ? "border-gold-500 bg-gold-500/5 shadow-sm"
                        : "border-gray-100 dark:border-[#2a2a5e] hover:border-gold-500/30"
                    }`}
                  >
                    <div className="text-sm font-semibold text-navy-800 dark:text-white">{dt.label}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{dt.desc}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setStep("details")} className="ml-auto text-xs text-gray-400 hover:text-navy-800 transition-colors">
                  Skip → Custom
                </button>
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-4">
              <p className="text-xs font-semibold text-navy-800 dark:text-white">Tell us about your trip</p>

              {data.destType && (
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">Destination</label>
                  <div className="flex flex-wrap gap-1.5">
                    {popularDestinations[data.destType]?.map((d) => (
                      <button
                        key={d}
                        onClick={() => update({ destination: d })}
                        className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                          data.destination === d
                            ? "bg-navy-800 text-gold-500 border-navy-800"
                            : "bg-gray-50 dark:bg-[#12122a] text-gray-500 border-gray-100 dark:border-[#2a2a5e] hover:border-gold-500"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                    <input
                      type="text"
                      placeholder="Other..."
                      value={popularDestinations[data.destType]?.includes(data.destination) ? "" : data.destination}
                      onChange={(e) => update({ destination: e.target.value })}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-gray-100 dark:border-[#2a2a5e] bg-transparent text-gray-500 max-w-[120px] focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">Duration</label>
                  <select
                    value={data.duration}
                    onChange={(e) => update({ duration: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-100 dark:border-[#2a2a5e] bg-gray-50 dark:bg-[#12122a] text-gray-500 focus:outline-none focus:border-gold-500"
                  >
                    <option value="">Select...</option>
                    <option>2–3 Days</option>
                    <option>4–5 Days</option>
                    <option>6–7 Days</option>
                    <option>8–10 Days</option>
                    <option>11–14 Days</option>
                    <option>15+ Days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">Group Size</label>
                  <select
                    value={data.groupSize}
                    onChange={(e) => update({ groupSize: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-100 dark:border-[#2a2a5e] bg-gray-50 dark:bg-[#12122a] text-gray-500 focus:outline-none focus:border-gold-500"
                  >
                    <option value="">Select...</option>
                    <option>1 (Solo)</option>
                    <option>2 (Couple)</option>
                    <option>3–4 (Family)</option>
                    <option>5–8 (Small Group)</option>
                    <option>9–15 (Medium Group)</option>
                    <option>16+ (Large Group)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">Budget Range (PKR)</label>
                <select
                  value={data.budget}
                  onChange={(e) => update({ budget: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-100 dark:border-[#2a2a5e] bg-gray-50 dark:bg-[#12122a] text-gray-500 focus:outline-none focus:border-gold-500"
                >
                  <option value="">Select budget...</option>
                  <option>Under 50,000</option>
                  <option>50,000 – 100,000</option>
                  <option>100,000 – 200,000</option>
                  <option>200,000 – 350,000</option>
                  <option>350,000 – 500,000</option>
                  <option>Above 500,000</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => setStep("destination")} className="text-xs text-gray-400 hover:text-navy-800 px-3 py-2 transition-colors">
                  ← Back
                </button>
                <button onClick={() => setStep("services")} disabled={!canProceed()} className="ml-auto bg-navy-800 text-gold-500 text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {step === "services" && (
            <motion.div key="services" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="text-xs font-semibold text-navy-800 dark:text-white mb-1">What services do you need?</p>
              <p className="text-[10px] text-gray-400 mb-3">Select all that apply</p>
              <div className="grid grid-cols-2 gap-2">
                {serviceOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleService(s)}
                    className={`text-xs text-left px-3.5 py-3 rounded-xl border transition-all duration-200 ${
                      data.services.includes(s)
                        ? "border-gold-500 bg-gold-500/5 text-navy-800 dark:text-white font-semibold"
                        : "border-gray-100 dark:border-[#2a2a5e] text-gray-500 hover:border-gold-500/30"
                    }`}
                  >
                    {data.services.includes(s) ? "✓ " : ""}{s}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-50 dark:border-[#2a2a5e]">
                <button onClick={() => setStep("details")} className="text-xs text-gray-400 hover:text-navy-800 px-3 py-2 transition-colors">
                  ← Back
                </button>
                <button onClick={() => setStep("contact")} disabled={!canProceed()} className="ml-auto bg-navy-800 text-gold-500 text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {step === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-3.5">
              <p className="text-xs font-semibold text-navy-800 dark:text-white">Where should we send your quote?</p>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Your name *</label>
                <input type="text" value={data.name} onChange={(e) => update({ name: e.target.value })} placeholder="e.g. Ahmed Khan" className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a5e] bg-gray-50 dark:bg-[#12122a] focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">WhatsApp / Phone *</label>
                <input type="text" value={data.phone} onChange={(e) => update({ phone: e.target.value })} placeholder="+92 3XX XXXXXXX" className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a5e] bg-gray-50 dark:bg-[#12122a] focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Email address</label>
                <input type="email" value={data.email} onChange={(e) => update({ email: e.target.value })} placeholder="your@email.com" className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a5e] bg-gray-50 dark:bg-[#12122a] focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Notes / special requests</label>
                <textarea rows={2} value={data.notes} onChange={(e) => update({ notes: e.target.value })} placeholder="Any special requirements..." className="w-full text-sm px-3.5 py-2 rounded-lg border border-gray-200 dark:border-[#2a2a5e] bg-gray-50 dark:bg-[#12122a] focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all resize-none" />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <div className="flex gap-2 pt-1">
                <button onClick={() => setStep("services")} className="text-xs text-gray-400 hover:text-navy-800 px-3 py-2 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={submitQuote}
                  disabled={!canProceed() || submitting}
                  className="ml-auto bg-gold-500 text-navy-800 text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all inline-flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Get My Quote ✨"
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === "complete" && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center py-6">
              <div className="w-16 h-16 bg-[#1D9E75]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={28} stroke="#1D9E75" strokeWidth={2.5} />
              </div>
              <h4 className="text-navy-800 dark:text-white font-bold text-base mb-1">Quote Request Sent! 🎉</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto mb-5">
                We&apos;ll review your requirements and respond within 2 hours on WhatsApp.
              </p>
              <button
                onClick={() => window.open("https://wa.me/923464993122?text=Hi%20AUZBIZ!%20I%20just%20submitted%20a%20quote%20request%20on%20your%20website.%20Following%20up%20here.", "_blank")}
                className="bg-[#25D366] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-2"
              >
                💬 Follow up on WhatsApp
              </button>
              <p className="text-[10px] text-gray-400 mt-3">You can also call us at <span className="font-semibold">+92 346 4993122</span></p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
