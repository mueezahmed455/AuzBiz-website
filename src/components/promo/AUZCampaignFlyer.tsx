"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import AUZPromoBanner from "@/components/promo/AUZPromoBanner";

interface AUZCampaignFlyerProps {
  variant:
    | "umrah"
    | "education"
    | "group"
    | "visa";
  whatsappPrefix?: string;
  className?: string;
}

const DEFAULT_WHATSAPP_PREFIX = {
  umrah: "Assalam o Alaikum, I'd like help with an Umrah package.",
  education:
    "Hello, I'd like guidance on studying abroad.",
  group: "Assalam o Alaikum, I'd like help choosing a group tour.",
  visa: "Hello, I'd like help with a visa application.",
};

export default function AUZCampaignFlyer({
  variant,
  whatsappPrefix,
  className = "",
}: AUZCampaignFlyerProps) {
  const prefix =
    whatsappPrefix ?? DEFAULT_WHATSAPP_PREFIX[variant];
  const encoded = encodeURIComponent(prefix);

  return (
    <section
      className={`mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-lg ${className}`}
      aria-label={`AUZBIZ ${variant} campaign flyer`}
    >
      <AUZPromoBanner
        variant={variant}
        href={
          variant === "visa"
            ? "/contact?service=Visa%20Services"
            : variant === "education"
              ? "/services#study"
              : variant === "group"
                ? "/group-tours"
                : "/visas"
        }
        className="w-full"
      />

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
        <p className="text-xs text-muted-foreground">
          Prefer WhatsApp? Tap below and the desk will reply with a tailored
          quote during office hours.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://wa.me/923464993122?text=${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
          >
            <MessageCircle size={15} />
            Chat on WhatsApp
          </a>
          <Link
            href={
              variant === "visa"
                ? "/contact?service=Visa%20Services"
                : variant === "education"
                  ? "/services#study"
                  : variant === "group"
                    ? "/group-tours"
                    : "/visas"
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-amber-400"
          >
            View details <ArrowRight size={15} />
          </Link>
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Sample wording only. Change the message before sending.
        </p>
      </div>
    </section>
  );
}
