"use client";

import { useEffect, useId, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const serviceOptions = [
  "Corporate Events & MICE",
  "Air Ticketing",
  "Group Tours",
  "Umrah Package",
  "Hotel Bookings",
  "Visa Services",
  "Study Abroad",
  "End-to-End Management",
  "Custom / Other",
];

const serviceAliases: Record<string, string> = {
  visa: "Visa Services",
  "visa services": "Visa Services",
  umrah: "Umrah Package",
  "umrah package": "Umrah Package",
  "air ticketing": "Air Ticketing",
  "group tours": "Group Tours",
  "hotel bookings": "Hotel Bookings",
  "hotel booking": "Hotel Bookings",
  "study abroad": "Study Abroad",
  "corporate mice": "Corporate Events & MICE",
  "corporate events & mice": "Corporate Events & MICE",
  "end-to-end management": "End-to-End Management",
};

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  service: "",
  destination: "",
  travelDates: "",
  groupSize: "",
  message: "",
};

type FormState = typeof initialForm;

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:bg-slate-900";

const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";

export default function ContactForm() {
  const baseId = useId();
  const [form, setForm] = useState<FormState>(initialForm);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  // The visa catalogue and service pages link here with a service preset.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawService = params.get("service")?.slice(0, 100).trim() ?? "";
    const destination = params.get("destination")?.slice(0, 200).trim() ?? "";
    if (!rawService && !destination) return;

    const normalised =
      serviceOptions.find(
        (option) => option.toLowerCase() === rawService.toLowerCase(),
      ) ?? serviceAliases[rawService.toLowerCase()] ?? "";

    window.setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        service: normalised || prev.service,
        destination: destination || prev.destination,
      }));
    }, 0);
  }, []);

  const handleChange = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.firstName.trim() || !form.phone.trim()) {
      setFormError("First name and phone number are required.");
      return;
    }
    setFormStatus("loading");
    setFormError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setFormStatus("success");
      setForm(initialForm);
    } catch {
      setFormStatus("error");
      setFormError("Could not send. Please WhatsApp us directly.");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-slate-950 px-6 py-5 dark:border-white/5">
        <h2 className="text-base font-semibold text-white">Send an enquiry</h2>
        <p className="mt-1 text-xs text-white/60">
          Tell us the trip and we will reply on WhatsApp with options.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor={`${baseId}-first`} className={labelClass}>
                First name <span aria-hidden="true">*</span>
              </label>
              <input
                id={`${baseId}-first`}
                type="text"
                autoComplete="given-name"
                required
                placeholder="Ahmed"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-last`} className={labelClass}>
                Last name
              </label>
              <input
                id={`${baseId}-last`}
                type="text"
                autoComplete="family-name"
                placeholder="Khan"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor={`${baseId}-phone`} className={labelClass}>
                WhatsApp / phone <span aria-hidden="true">*</span>
              </label>
              <input
                id={`${baseId}-phone`}
                type="tel"
                autoComplete="tel"
                required
                placeholder="+92 3XX XXXXXXX"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-email`} className={labelClass}>
                Email
              </label>
              <input
                id={`${baseId}-email`}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${baseId}-service`} className={labelClass}>
              Service
            </label>
            <select
              id={`${baseId}-service`}
              value={form.service}
              onChange={(e) => handleChange("service", e.target.value)}
              className={fieldClass}
            >
              <option value="">Select a service…</option>
              {serviceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${baseId}-destination`} className={labelClass}>
              Destination
            </label>
            <input
              id={`${baseId}-destination`}
              type="text"
              placeholder="e.g. Uzbekistan, Thailand, Umrah"
              value={form.destination}
              onChange={(e) => handleChange("destination", e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor={`${baseId}-dates`} className={labelClass}>
                Travel dates (approx.)
              </label>
              <input
                id={`${baseId}-dates`}
                type="text"
                placeholder="e.g. August 2026"
                value={form.travelDates}
                onChange={(e) => handleChange("travelDates", e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-group`} className={labelClass}>
                Group size
              </label>
              <input
                id={`${baseId}-group`}
                type="text"
                placeholder="e.g. 4 persons"
                value={form.groupSize}
                onChange={(e) => handleChange("groupSize", e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${baseId}-message`} className={labelClass}>
              Message / requirements
            </label>
            <textarea
              id={`${baseId}-message`}
              rows={4}
              placeholder="Budget, hotel preference, special requirements"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`${fieldClass} resize-none`}
            />
          </div>

          {formStatus === "success" && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/10"
            >
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">
                Enquiry sent. We&apos;ll reply on WhatsApp during office hours.
              </p>
            </div>
          )}

          {formError && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10"
            >
              <p className="text-xs text-red-700 dark:text-red-300">{formError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={formStatus === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
          >
            {formStatus === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            ) : (
              "Send enquiry"
            )}
          </button>

          <p className="text-center text-[10px] leading-relaxed text-muted-foreground">
            By submitting this form you agree to be contacted by AUZBIZ on
            WhatsApp or email about this enquiry.
          </p>
        </div>
      </form>
    </div>
  );
}
