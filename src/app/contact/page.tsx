import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import CTABar from "@/components/CTABar";
import FAQAccordion from "@/components/FAQAccordion";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AUZBIZ in DHA II (Rehbar), Lahore. WhatsApp +92 346 4993122 or send an enquiry about Umrah, group tours, visas, ticketing or corporate events.",
};

const faqs = [
  {
    q: "How quickly do you reply?",
    a: "WhatsApp messages are answered during office hours (Monday to Saturday, 9am–8pm). Messages sent outside those hours are picked up the next working morning. For urgent travel, WhatsApp is the fastest channel.",
  },
  {
    q: "Do you build custom itineraries?",
    a: "Yes. Send your destination, dates, group size and budget. We will suggest options and explain what each one includes before you commit.",
  },
  {
    q: "Which visas do you assist with?",
    a: "We prepare documentation for Schengen, UAE, UK, Malaysia, Thailand and Saudi Arabia (Umrah), among others. The embassy or consulate makes the final decision, so we do not promise approval.",
  },
  {
    q: "Can you handle a large corporate group?",
    a: "Yes. We plan corporate group movements including flights, hotel blocks, transport and on-ground coordination. Share the headcount and dates for a written proposal.",
  },
  {
    q: "Is the first consultation free?",
    a: "Yes. There is no charge and no obligation to book. Message us on WhatsApp or use the form on this page.",
  },
  {
    q: "How do payments work?",
    a: "Payment terms depend on the booking. We confirm the accepted methods, deposit amount and cancellation terms in writing before you pay anything.",
  },
];

const officeHours = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
  { day: "Saturday", time: "9:00 AM – 8:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+92 346 4993122",
    href: "https://wa.me/923464993122",
    note: "Fastest during office hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 346 4993122",
    href: "tel:+923464993122",
    note: "Mon–Sat, 9am–8pm",
  },
  {
    icon: Mail,
    label: "Email",
    value: "auzbizpak@gmail.com",
    href: "mailto:auzbizpak@gmail.com",
    note: "Replies the same working day",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "DHA II (Rehbar), Lahore",
    href: "https://www.google.com/maps/search/?api=1&query=DHA+Phase+2+Rehbar+Lahore+Pakistan",
    note: "Visits by appointment",
  },
];

const MAPS_DIR_URL =
  "https://www.google.com/maps/search/?api=1&query=DHA+Phase+2+Rehbar+Lahore+Pakistan";

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber-500/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400">
            Contact
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Tell us the trip.
            <span className="block text-amber-400">We&apos;ll handle the details.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            One team for ticketing, tours, Umrah, visas and corporate travel.
            Message us on WhatsApp or send the form — you will get options and a
            written quote, not a runaround.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/923464993122"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              <MessageCircle size={16} /> WhatsApp the travel desk
            </a>
            <a
              href="tel:+923464993122"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <Phone size={16} /> +92 346 4993122
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-amber-500/60"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                <channel.icon size={17} strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                  {channel.label}
                </span>
                <span className="mt-0.5 block break-words text-xs font-semibold text-foreground">
                  {channel.value}
                </span>
                <span className="mt-0.5 block text-[10px] text-muted-foreground">
                  {channel.note}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <ContactForm />

          <div className="space-y-4">
            <a
              href="https://wa.me/923464993122"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-[#25D366] p-6 text-white transition-colors hover:bg-[#20bd5a]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                <MessageCircle size={24} strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-sm font-bold">Chat on WhatsApp</span>
                <span className="mt-0.5 block text-xs text-white/80">
                  The fastest way to reach the desk
                </span>
                <span className="mt-1.5 block text-sm font-semibold">+92 346 4993122</span>
              </span>
            </a>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border bg-surface px-5 py-3">
                <MapPin size={14} className="text-amber-600 dark:text-amber-400" />
                <h2 className="text-xs font-semibold text-foreground">Office</h2>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-foreground">
                  DHA Phase II (Rehbar), Lahore
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Office visits are by appointment. Message us first and we will
                  share the exact address and a time.
                </p>
                <a
                  href={MAPS_DIR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                >
                  Open the area in Google Maps
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Clock size={14} className="text-amber-600 dark:text-amber-400" />
                Office hours
              </h2>
              <dl className="mt-4 space-y-2.5">
                {officeHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between border-b border-border pb-2.5 text-xs last:border-0 last:pb-0"
                  >
                    <dt className="text-muted-foreground">{item.day}</dt>
                    <dd
                      className={`font-semibold ${
                        item.time === "Closed"
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {item.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                <User size={12} /> Your host
              </div>
              <p className="mt-1.5 text-sm font-semibold text-foreground">Zubair Ahmad</p>
              <p className="text-xs text-muted-foreground">
                Founder &amp; Chief Executive, AUZBIZ
              </p>
              <Link
                href="/about"
                className="mt-3 inline-block text-xs font-semibold text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                About AUZBIZ
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Questions before you book
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              If your question is not answered here, WhatsApp is the quickest
              route to a real answer.
            </p>
            <a
              href="https://wa.me/923464993122"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-amber-600 dark:hover:text-amber-400"
            >
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTABar
        title="Ready to start planning?"
        subtitle="Send your dates and destination. We will reply with options and a written quote."
        primaryLabel="Enquire on WhatsApp"
        primaryHref="https://wa.me/923464993122"
        secondaryLabel="Browse group tours"
        secondaryHref="/group-tours"
      />
    </>
  );
}
