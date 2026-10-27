"use client";

import { useId, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";

const REASONS = [
  "Ticket issuance",
  "Payment confirmation",
  "Visa or documents",
  "Schedule change",
  "Hotel or transfer",
  "Something else",
];

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:bg-slate-900";

const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";

export default function TripStatusForm() {
  const baseId = useId();
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState(REASONS[0]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const canSubmit = reference.trim().length > 0 && name.trim().length > 0 && phone.trim().length > 0;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) {
      setError("Add your booking reference, name and phone number.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name,
          phone,
          service: "Booking status request",
          destination: "",
          travelDates: "",
          groupSize: "",
          message: [
            `Booking reference: ${reference}`,
            `Status request: ${reason}`,
            notes ? `Notes: ${notes}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setNotes("");
    } catch {
      setStatus("error");
      setError("Could not send the request. Please WhatsApp the desk directly.");
    }
  };

  const whatsappHref = `https://wa.me/923464993122?text=${encodeURIComponent(
    `Hi AUZBIZ! I'd like a status check on booking ${reference || "[reference]"}. My name is ${name || "[name]"}.`,
  )}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-slate-950 px-6 py-5 dark:border-white/5">
        <h2 className="text-base font-semibold text-white">Request a status check</h2>
        <p className="mt-1 text-xs text-white/60">
          A person reads this and replies on WhatsApp during office hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4 p-6">
          <div>
            <label htmlFor={`${baseId}-reference`} className={labelClass}>
              Booking reference <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${baseId}-reference`}
              type="text"
              required
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="e.g. AUZ-2026-0842"
              className={fieldClass}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor={`${baseId}-name`} className={labelClass}>
                Full name <span aria-hidden="true">*</span>
              </label>
              <input
                id={`${baseId}-name`}
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ahmed Khan"
                className={fieldClass}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-phone`} className={labelClass}>
                WhatsApp / phone <span aria-hidden="true">*</span>
              </label>
              <input
                id={`${baseId}-phone`}
                type="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+92 3XX XXXXXXX"
                className={fieldClass}
                autoComplete="tel"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${baseId}-reason`} className={labelClass}>
              What do you need to know?
            </label>
            <select
              id={`${baseId}-reason`}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className={fieldClass}
            >
              {REASONS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${baseId}-notes`} className={labelClass}>
              Anything else?
            </label>
            <textarea
              id={`${baseId}-notes`}
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Travel date, flight number, or the question you need answered"
              className={`${fieldClass} resize-none`}
            />
          </div>

          {status === "success" && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/10"
            >
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">
                Request received. The desk will confirm your booking status on
                WhatsApp during office hours.
              </p>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10"
            >
              <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !canSubmit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send size={16} /> Send status request
              </>
            )}
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-amber-500"
          >
            <MessageCircle size={14} /> Or message the desk on WhatsApp
          </a>

          <p className="text-center text-[10px] leading-relaxed text-muted-foreground">
            Your reference is used only to look up this booking. We do not
            publish booking data or share it with other travellers.
          </p>
        </div>
      </form>
    </div>
  );
}
