"use client";

import Button from "@/components/Button";

interface CTAProps {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showWhatsApp?: boolean;
}

export default function CTABar({
  title,
  subtitle,
  primaryLabel = "View Packages",
  primaryHref = "/packages",
  secondaryLabel = "Chat on WhatsApp",
  secondaryHref = "https://wa.me/923464993122",
  showWhatsApp = true,
}: CTAProps) {
  return (
    <div className="bg-gold-500 py-8 relative overflow-hidden">
      {/* Decorative floating circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10 animate-float" />
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10 animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white/5 animate-float" style={{ animationDelay: "0.8s" }} />
      </div>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
        <div>
          <p className="text-navy-800 font-semibold text-base sm:text-lg">{title}</p>
          {subtitle && (
            <p className="text-navy-800/60 text-sm mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button href={primaryHref} size="md">
            {primaryLabel}
          </Button>
          {showWhatsApp && (
            <Button href={secondaryHref} variant="whatsapp" size="md">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
