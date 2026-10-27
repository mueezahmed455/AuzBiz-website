import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Compass,
  GraduationCap,
  Handshake,
  MessageCircle,
  ScrollText,
  Target,
} from "lucide-react";
import CTABar from "@/components/CTABar";
import { SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "AUZBIZ is a Lahore-based travel, events and business facilitation agency. Meet founder Zubair Ahmad and the way we work.",
};

const principles = [
  {
    icon: Handshake,
    title: "Client-first, not commission-first",
    body: "We recommend the option that fits your dates and budget, and we say so when a cheaper route is the better one.",
  },
  {
    icon: CheckCircle2,
    title: "Confirm the details",
    body: "Hotel names, room categories, baggage rules and cancellation terms are shared before you pay — not after.",
  },
  {
    icon: Compass,
    title: "One accountable contact",
    body: "The person who plans your trip stays reachable while you travel, instead of handing you to a call centre.",
  },
  {
    icon: MessageCircle,
    title: "Straight answers",
    body: "If a visa is unlikely or a fare will not hold, we tell you early. Bad news is cheaper before a booking than after.",
  },
];

const experience = [
  {
    company: "AUZBIZ — Dream Beyond Borders",
    role: "Founder & Chief Executive",
    period: "Present · Lahore",
  },
  {
    company: "Alliance Digital Partners (ADP)",
    role: "Founder & Digital Marketing Lead",
    period: "Present · Lahore",
  },
  {
    company: "Four Brothers Group",
    role: "Senior Marketing Manager",
    period: "Prior · Agri-input",
  },
  {
    company: "Ali Akbar Group",
    role: "Senior Marketing Role",
    period: "Prior · FMCG & agri",
  },
  {
    company: "Nonprofit & development sector",
    role: "Marketing & Communications",
    period: "Multi-year tenure",
  },
];

const sectors = [
  "Travel & tourism",
  "Agriculture",
  "FMCG",
  "Corporate",
  "Digital marketing",
  "Nonprofit",
];

const credentials = [
  { icon: GraduationCap, label: "Qualification", value: "MBA in Marketing" },
  { icon: BookOpen, label: "Qualification", value: "MA English Literature" },
  { icon: ScrollText, label: "Diploma", value: "International Relations" },
  { icon: Calendar, label: "Experience", value: "12+ years" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber-500/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400">
            About AUZBIZ
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Dream beyond borders.
            <span className="block text-amber-400">Land without surprises.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            We are a Lahore-based travel, events and business facilitation agency.
            Flights, hotels, visas and logistics are handled by one team — with
            the details confirmed before you commit.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Talk to us <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              What we do
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Our story"
              title="Built around the details travellers actually worry about."
            />
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                AUZBIZ started with a simple observation: most travel problems are
                not dramatic. They are small, avoidable gaps — a hotel that is
                further from the Haram than advertised, a fare that excludes
                baggage, a visa document that was never checked.
              </p>
              <p>
                So we built the agency around closing those gaps. Every quote
                states what is included. Every hotel is named before payment.
                Every visa file is reviewed against the current checklist. And
                the person who plans your trip stays reachable while you travel.
              </p>
              <p>
                Today we handle Umrah, group tours, air ticketing, visas, hotel
                bookings, corporate MICE programmes and study-abroad guidance
                from our office in DHA II, Lahore.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <Target size={18} className="text-amber-600 dark:text-amber-400" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">Our mission</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Make premium travel and event management accessible to Pakistani
                  families and organisations, with clear pricing and honest timelines.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <Compass size={18} className="text-amber-600 dark:text-amber-400" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">How we measure it</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Fewer surprises on the road, repeat bookings, and clients who
                  send their family to us without asking for a discount first.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-surface p-7 sm:p-8">
            <p className="text-lg font-medium leading-relaxed text-foreground">
              &ldquo;We don&apos;t just book flights and hotels. We make sure the
              trip works when something changes.&rdquo;
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">
              Zubair Ahmad
            </p>
            <p className="text-xs text-muted-foreground">
              Founder &amp; Chief Executive, AUZBIZ
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Based in</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">Lahore, Pakistan</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Core services</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">Eight, one team</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Office hours</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">Mon–Sat, 9am–8pm</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Office</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">DHA II (Rehbar)</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeader
            eyebrow="How we work"
            title="Four rules we do not bend."
            description="They are not slogans. They are the checks that decide whether a booking leaves our desk."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <item.icon size={18} strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeader
          eyebrow="The founder"
          title="Zubair Ahmad"
          description="A marketing and business-development background, applied to travel and corporate events."
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="rounded-2xl border border-border bg-card p-7 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-amber-400 dark:bg-amber-500 dark:text-slate-950">
                ZA
              </span>
              <div>
                <h3 className="text-base font-bold text-foreground">Zubair Ahmad</h3>
                <p className="text-xs text-muted-foreground">
                  Founder &amp; Chief Executive — AUZBIZ
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Zubair has spent more than a decade in marketing and corporate
              roles across agriculture, FMCG and the development sector, and now
              leads AUZBIZ&apos;s travel and events work. His academic background
              combines an MBA in Marketing, an MA in English Literature and a
              postgraduate diploma in International Relations.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              That mix shows up in how the agency works: research-led itineraries,
              written quotes, and a bias toward explaining the trade-off instead
              of hiding it in a package price.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {credentials.map((credential) => (
                <div
                  key={credential.value}
                  className="rounded-xl border border-border bg-surface p-3.5"
                >
                  <credential.icon
                    size={16}
                    strokeWidth={1.8}
                    className="text-amber-600 dark:text-amber-400"
                  />
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {credential.label}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-foreground">
                    {credential.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Professional journey
            </h3>
            <ol className="mt-5 space-y-5">
              {experience.map((item) => (
                <li key={item.company} className="relative border-l border-border pl-5">
                  <span className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <p className="text-sm font-semibold text-foreground">{item.company}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                    {item.period}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">Work with the team</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Send your dates and destination. You will get a written quote with
                the inclusions spelled out.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-amber-600 dark:hover:text-amber-400"
              >
                Start an enquiry <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABar
        title="Ready to plan with AUZBIZ?"
        subtitle="Free consultation · No obligation · WhatsApp replies during office hours (Mon–Sat, 9am–8pm)"
        primaryLabel="Start an enquiry"
        primaryHref="/contact"
      />
    </>
  );
}
