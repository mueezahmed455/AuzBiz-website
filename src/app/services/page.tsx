import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  ClipboardCheck,
  Globe,
  GraduationCap,
  Hotel,
  IdCard,
  Moon,
  Plane,
} from "lucide-react";
import CTABar from "@/components/CTABar";
import { SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Corporate MICE, air ticketing, group tours, Umrah, hotels, visas, study abroad and end-to-end trip management from AUZBIZ in Lahore.",
};

type Service = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  icon: typeof Plane;
  includes: string[];
  tags: string[];
  idealFor: string;
  cta: { label: string; href: string };
};

const services: Service[] = [
  {
    id: "corporate",
    eyebrow: "Corporate & MICE",
    title: "Meetings, incentives, conferences and exhibitions",
    summary:
      "We plan and run corporate travel programmes — incentive trips, leadership retreats, conferences, gala dinners and award nights. One team handles the venue, flights, hotel block, transport and on-ground coordination so your people can focus on the event.",
    icon: Building2,
    includes: [
      "Incentive tour and retreat planning",
      "Conference venue sourcing and booking",
      "Group air ticketing and hotel blocks",
      "Airport transfers and ground transport",
      "Event decor, branding and AV coordination",
      "On-ground event management",
    ],
    tags: ["Incentive tours", "Team retreats", "Conferences", "Gala dinners"],
    idealFor:
      "HR, admin and marketing teams planning offsites, reward trips or client events.",
    cta: { label: "Request a proposal", href: "/contact?service=Corporate%20Events%20%26%20MICE" },
  },
  {
    id: "ticketing",
    eyebrow: "Air ticketing",
    title: "Domestic and international air tickets",
    summary:
      "We ticket across major scheduled carriers serving Pakistan, including PIA, Turkish Airlines, Emirates, Qatar Airways, Air Arabia and flydubai. Send your route and dates and we come back with options, baggage rules and the real fare — not a teaser price.",
    icon: Plane,
    includes: [
      "Individual, family and group ticketing",
      "Group block requests for 10+ passengers",
      "Umrah and Hajj flight arrangements",
      "Business and premium cabin requests",
      "Rebooking and refund assistance, subject to airline rules",
      "Fare rules explained before you pay",
    ],
    tags: ["Economy", "Business class", "Group bookings", "Umrah flights"],
    idealFor:
      "Travellers who want the fare, baggage allowance and change rules confirmed before booking.",
    cta: { label: "Get a fare quote", href: "/contact?service=Air%20Ticketing" },
  },
  {
    id: "tours",
    eyebrow: "Group tours",
    title: "Curated group departures",
    summary:
      "Our published catalogue covers Uzbekistan, Thailand, Umrah, Hunza and Skardu, with more destinations added as departures are confirmed. Itineraries are built for travellers from Pakistan — halal food, Muslim-friendly hotels and a guide who stays with the group.",
    icon: Globe,
    includes: [
      "Return airfare where the package lists it",
      "Hotel accommodation in the stated category",
      "Airport and inter-city transfers",
      "Guided sightseeing and entrance fees where listed",
      "Halal meal arrangements",
      "Departure dates and group sizes as published",
    ],
    tags: ["Uzbekistan", "Thailand", "Umrah", "Hunza", "Skardu"],
    idealFor:
      "Families and friend groups who want a fixed itinerary with the logistics handled.",
    cta: { label: "Browse group tours", href: "/group-tours" },
  },
  {
    id: "umrah",
    eyebrow: "Umrah",
    title: "Umrah, without the guesswork",
    summary:
      "Economy to premium Umrah arrangements from Lahore: flights, hotels near the Haram, ziyarat, transfers and documentation support. Ask for the hotel names and walking distances with your quote so you know exactly what you are booking.",
    icon: Moon,
    includes: [
      "Return flights from Lahore to Jeddah or Madinah",
      "3-star to 5-star hotel options in Makkah and Madinah",
      "Ziyarat tours in both cities",
      "Umrah visa and documentation support",
      "Airport transfers and inter-city transport",
      "Ramadan departures on request",
    ],
    tags: ["Economy", "Standard", "Premium", "Ramadan"],
    idealFor:
      "Individuals, couples and families who want the hotel and transfer details confirmed up front.",
    cta: { label: "Ask about Umrah", href: "/contact?service=Umrah%20Package" },
  },
  {
    id: "hotels",
    eyebrow: "Hotel bookings",
    title: "Hotel reservations worldwide",
    summary:
      "Individual stays, family rooms or group blocks. We source properties across the Middle East, Southeast Asia, Central Asia and Europe, and confirm the room type, cancellation policy and total price before you commit.",
    icon: Hotel,
    includes: [
      "Individual, family and group reservations",
      "Budget through luxury property options",
      "Haram-view and Haram-proximity stays",
      "Domestic sourcing in Lahore, Murree, Hunza and Skardu",
      "Corporate room blocks",
      "Cancellation and amendment coordination",
    ],
    tags: ["3-star", "4-star", "5-star", "Group blocks"],
    idealFor:
      "Travellers and corporate teams who need the property, room type and policy confirmed in writing.",
    cta: { label: "Request a hotel quote", href: "/contact?service=Hotel%20Bookings" },
  },
  {
    id: "visas",
    eyebrow: "Visa services",
    title: "Visa documentation and advisory",
    summary:
      "Visa rules for Pakistani passport holders change often. We prepare the document set, check it before submission and tell you honestly where an application is weak. The decision always rests with the embassy or consulate, not with us.",
    icon: IdCard,
    includes: [
      "Schengen tourist, business and transit documentation",
      "UAE, Saudi Arabia, Malaysia and Thailand assistance",
      "UK and Europe advisory and document preparation",
      "Student visa support for Türkiye, Malaysia and Europe",
      "Appointment scheduling",
      "Checklist preparation and pre-submission review",
    ],
    tags: ["Tourist", "Business", "Student", "Umrah"],
    idealFor:
      "Applicants who want their paperwork checked against the current checklist before they pay a fee.",
    cta: { label: "See visa catalogue", href: "/visas" },
  },
  {
    id: "study",
    eyebrow: "Study abroad",
    title: "University admissions and student visas",
    summary:
      "Guidance for Pakistani students through university shortlisting, applications, student visa documentation and pre-departure planning. We work on destinations with clear admission pathways and realistic costs.",
    icon: GraduationCap,
    includes: [
      "University and programme shortlisting",
      "Undergraduate and postgraduate applications",
      "Scholarship identification and application support",
      "Student visa documentation and interview preparation",
      "Accommodation sourcing at the destination",
      "Pre-departure briefing and travel booking",
    ],
    tags: ["Undergraduate", "Postgraduate", "Scholarships", "Student visa"],
    idealFor:
      "Students and families comparing destinations on cost, admission requirements and visa pathway.",
    cta: { label: "Book a consultation", href: "/contact?service=Study%20Abroad" },
  },
  {
    id: "management",
    eyebrow: "End-to-end management",
    title: "One point of contact, start to finish",
    summary:
      "Our flagship way of working: one dedicated contact who coordinates flights, hotels, visas, transport and activities from the first planning call to your return. No juggling vendors and no gaps between bookings.",
    icon: ClipboardCheck,
    includes: [
      "Single point of contact for the whole trip",
      "Needs assessment, itinerary design and budget planning",
      "Flights, hotels, visas, transport and activities",
      "WhatsApp support while you are travelling",
      "Rebooking and disruption assistance",
      "Post-trip review and repeat-trip planning",
    ],
    tags: ["Planning", "Booking", "Coordination", "On-trip support"],
    idealFor:
      "Corporates, large families and first-time travellers who want one team accountable for the whole trip.",
    cta: { label: "Start an enquiry", href: "/contact?service=End-to-End%20Management" },
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber-500/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400">
            Services
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Eight services.
            <span className="block text-amber-400">One accountable team.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Ticketing, tours, Umrah, visas, hotels, corporate events and study
            abroad — planned from Lahore, with the details confirmed before you
            pay.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Talk to the travel desk <ArrowRight size={16} />
            </Link>
            <Link
              href="/group-tours"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              See current departures
            </Link>
          </div>
        </div>
      </section>

      <nav
        aria-label="Services on this page"
        className="border-b border-border bg-surface"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-3.5 sm:px-6 lg:px-8">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-amber-500 hover:text-foreground"
            >
              {service.eyebrow}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-heading`}
            className={`border-b border-border py-14 sm:py-16 ${
              index === services.length - 1 ? "border-b-0" : ""
            }`}
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    <service.icon size={18} strokeWidth={2} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    0{index + 1} · {service.eyebrow}
                  </span>
                </div>

                <h2
                  id={`${service.id}-heading`}
                  className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {service.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={service.cta.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {service.cta.label}
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  What is included
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                    >
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">
                    Ideal for
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {service.idealFor}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="py-14 sm:py-16">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <SectionHeader
              eyebrow="How we work"
              title="A quote you can check, then a booking you can track."
              description="Send your route, dates and traveller details. We reply with options, inclusions and the total. Nothing is booked until you confirm."
            />
            <ol className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Send the brief",
                  body: "Destination, dates, travellers and budget — by WhatsApp or the enquiry form.",
                },
                {
                  step: "02",
                  title: "Compare the options",
                  body: "We show what each option includes, what it excludes and where the price can move.",
                },
                {
                  step: "03",
                  title: "Confirm and travel",
                  body: "Documents, tickets and briefings are handled before departure, with WhatsApp support on the road.",
                },
              ].map((item) => (
                <li key={item.step} className="border-t border-border pt-4">
                  <span className="text-[11px] font-bold tracking-[0.16em] text-amber-600 dark:text-amber-400">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <CTABar
        title="Not sure which service you need?"
        subtitle="Describe the trip and we will point you to the right desk — no obligation."
        primaryLabel="Start an enquiry"
        primaryHref="/contact"
      />
    </>
  );
}
