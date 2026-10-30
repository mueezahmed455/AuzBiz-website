import Link from "next/link";
import {
  Plane, Globe, Hotel, IdCard, GraduationCap, Clock,
  ArrowRight, Shield, Compass, Heart,
  MessageCircle, BarChart, Phone, Mail, MapPin, Moon, ClipboardCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { SectionHeader, Card, Badge } from "@/components/ui";
import CTABar from "@/components/CTABar";
import QuoteBuilder from "@/components/QuoteBuilder";
import TourCard from "@/components/TourCard";
import { getContentSafe, sortPosts } from "@/lib/content/store";
import { BlogSection } from "@/sections/BlogSection";

export const dynamic = "force-dynamic";

const services = [
  {
    icon: Plane,
    title: "Air ticketing",
    desc: "Sample fare comparison and route guidance, then a confirmed quote for your dates.",
    href: "/ticket-analysis",
  },
  {
    icon: Globe,
    title: "Group tours",
    desc: "Curated departures across Central Asia, Southeast Asia and northern Pakistan.",
    href: "/group-tours",
  },
  {
    icon: Hotel,
    title: "Hotel bookings",
    desc: "Hotel sourcing worldwide — budget through luxury.",
    href: "/services#hotels",
  },
  {
    icon: IdCard,
    title: "Visa services",
    desc: "UAE, Schengen, UK, USA, Türkiye & more — honest timelines, no false promises.",
    href: "/visas",
  },
  {
    icon: GraduationCap,
    title: "Study abroad",
    desc: "University admissions guidance and student visa documentation for Türkiye, Malaysia and Europe.",
    href: "/services#study",
  },
  {
    icon: Moon,
    title: "Umrah",
    desc: "Flights, hotels near the Haram, ziyarat and documentation support.",
    href: "/contact?service=Umrah%20Package",
  },
  {
    icon: Compass,
    title: "Corporate MICE",
    desc: "Incentive tours, conferences, and team retreats for organisations.",
    href: "/services#corporate",
  },
  {
    icon: ClipboardCheck,
    title: "End-to-end management",
    desc: "One team coordinating flights, hotels, visas, transport and support.",
    href: "/services#management",
  },
];

const whyUs = [
  { icon: Compass, title: "Advice before booking", desc: "We explain the trade-offs between fare rules, hotels and dates before you commit." },
  { icon: Shield, title: "Clear inclusions", desc: "Written quotes list what is covered, what is not, and where the price can move." },
  { icon: Heart, title: "Built around you", desc: "Families, corporates and first-time travellers get an itinerary that fits their needs." },
  { icon: Clock, title: "Reachable support", desc: "One accountable team from enquiry through tickets, visas, hotels and return." },
];

const processSteps = [
  { step: "01", title: "Tell us the plan", desc: "Destination, dates, budget, travellers — WhatsApp or form." },
  { step: "02", title: "We structure it", desc: "Options for flights, tours and visas with clear inclusions and sample fare ranges." },
  { step: "03", title: "Confirm & depart", desc: "Documents, tickets, and briefings handled before you travel." },
];

export default async function HomePage() {
  const content = await getContentSafe();
  const posts = sortPosts(
    content.blogPosts.filter((post) => post.status === "published"),
  ).slice(0, 3);
  const tours = content.tours
    .filter((tour) => tour.status === "published")
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-section bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-24">
            <div>
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                Travel agency · Lahore
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-7xl lg:text-[6.4rem]">
                Go further.<br />
                <span className="text-amber-400">Travel better.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Flights, visas, hotels, Umrah and group tours arranged by a
                team that knows the details and stays available.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="/contact" size="lg" className="bg-amber-400 text-slate-950 hover:bg-amber-300">
                  Start an enquiry <ArrowRight size={18} />
                </Button>
                <a
                  href="https://wa.me/923464993122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-white transition-colors hover:text-amber-300"
                >
                  WhatsApp the desk <MessageCircle size={17} />
                </a>
              </div>
            </div>

            <div className="border-t border-white/15 lg:border-t-0">
              <p className="mb-5 pt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 lg:pt-0">
                We arrange
              </p>
              <div className="divide-y divide-white/15 border-y border-white/15">
                {[
                  ["01", "Air tickets & hotels", "/ticket-analysis"],
                  ["02", "Visas & Umrah", "/visas"],
                  ["03", "Group & corporate travel", "/group-tours"],
                ].map(([number, label, href]) => (
                  <Link
                    key={number}
                    href={href}
                    className="group flex items-center justify-between py-5 text-base font-medium text-slate-200 transition-colors hover:text-amber-300"
                  >
                    <span className="flex items-center gap-5">
                      <span className="text-xs text-slate-500">{number}</span>
                      {label}
                    </span>
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-sm leading-6 text-slate-400">
                DHA II (Rehbar), Lahore<br />
                Mon–Sat · 9am–8pm · +92 346 4993122
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What we do"
            title="Eight services. One accountable team."
            description="Book what you need — or let us run the full itinerary from enquiry to return."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((service) => (
              <Card key={service.title} hover padding="lg" className="group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-amber-50 dark:bg-amber-500/10 group-hover:bg-amber-600 dark:group-hover:bg-amber-600 transition-colors">
                  <service.icon size={20} strokeWidth={2} className="text-amber-600 dark:text-amber-400 group-hover:text-white dark:group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                <Link href={service.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:gap-3 transition-colors">
                  Learn more <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket analysis teaser */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Flight intelligence"
                title="A clearer view of what a fare is made of."
                description="Use our fare tool to compare sample prices across dates and routes. When you are ready to book, our ticketing desk confirms the real fare for your dates."
              />
              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                    <BarChart size={18} strokeWidth={2.5} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Route comparison</h4>
                    <p className="text-sm text-muted-foreground">Compare sample fares on the routes we ticket most often.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Clock size={18} strokeWidth={2.5} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Timing context</h4>
                    <p className="text-sm text-muted-foreground">See how weekdays, seasons, and cabin class change the sample price.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Plane size={18} strokeWidth={2.5} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">A real quote from a human</h4>
                    <p className="text-sm text-muted-foreground">Send your dates on WhatsApp and we will confirm availability and price.</p>
                  </div>
                </div>
              </div>
              <Button href="/ticket-analysis" className="mt-8">
                Open fare analysis <ArrowRight size={18} strokeWidth={2} />
              </Button>
            </div>
            <div className="relative h-64 lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-slate-900/20 rounded-2xl border border-border/50 dark:border-white/5" />
              <div className="absolute inset-4 bg-card dark:bg-slate-800 rounded-xl border border-card-border dark:border-white/5 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Plane size={16} strokeWidth={2} className="text-amber-600" />
                    <span className="font-semibold text-foreground">LHE → DXB</span>
                  </div>
                  <Badge variant="outline">Sample data</Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground">Outbound</p>
                      <p className="font-medium text-foreground">Fri, Dec 18 · 03:20</p>
                    </div>
                    <span className="font-bold text-lg text-foreground">PKR 42,000</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground">Return</p>
                      <p className="font-medium text-foreground">Sun, Dec 28 · 18:45</p>
                    </div>
                    <span className="font-bold text-lg text-foreground">Included</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-card-border dark:border-white/5">
                  <p className="text-xs text-muted-foreground">Example itinerary. Real fares depend on availability at the time of booking.</p>
                  <div className="w-full bg-amber-50 dark:bg-amber-500/10 rounded-lg h-2 mt-2 overflow-hidden">
                    <div className="bg-amber-600 h-full w-[65%] animate-pulse-soft" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-background dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps from enquiry to departure"
            description="Clear process on WhatsApp or in person."
            center
          />
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            {processSteps.map((s) => (
              <div key={s.step} className="rounded-2xl border border-card-border bg-card p-8 text-center">
                <span className="text-amber-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase">{s.step}</span>
                <h3 className="text-lg font-semibold text-foreground mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group tours */}
      {tours.length > 0 && (
        <section className="py-20 bg-background dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <SectionHeader
                eyebrow="Group tours"
                title="A departure already planned. A group already going."
                description="Group departures with the itinerary, inclusions and price shown on every listing."
              />
              <Link href="/group-tours" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:gap-3 transition-colors">
                See all tours <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why us */}
      <section className="py-20 bg-background dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why AUZBIZ"
            title="What you can expect when you book."
            description="Straight answers, written inclusions, and a team that stays reachable after the ticket is issued."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {whyUs.map((item) => (
              <div key={item.title} className="rounded-xl border border-card-border bg-card p-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-amber-50 dark:bg-amber-500/10">
                  <item.icon size={18} strokeWidth={2} className="text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogSection posts={posts} />

      {/* Contact */}
      <section className="py-20 bg-surface" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="Talk to us"
                title="One team, from the first question to the last boarding pass."
                description="Message us on WhatsApp for the fastest reply, or send the form and we will come back with a clear plan and a real quote."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
                >
                  Start an enquiry <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/923464993122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-emerald-500 hover:text-emerald-600"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">AUZBIZ Group</h3>
              <p className="mt-1 text-xs text-muted-foreground">DHA II (Rehbar), Lahore, Pakistan</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Phone / WhatsApp</dt>
                    <dd><a href="tel:+923464993122" className="font-medium text-foreground hover:text-amber-600 dark:hover:text-amber-400">+92 346 4993122</a></dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Email</dt>
                    <dd><a href="mailto:auzbizpak@gmail.com" className="font-medium text-foreground hover:text-amber-600 dark:hover:text-amber-400">auzbizpak@gmail.com</a></dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Office</dt>
                    <dd className="font-medium text-foreground">DHA II (Rehbar), Lahore</dd>
                  </div>
                </div>
              </dl>
              <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                Office visits are by appointment. WhatsApp is answered during office hours and for urgent travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <SectionHeader
              eyebrow="Custom quote"
              title="Build your own package"
              description="Share your preferences and we will reply with a tailored quote during office hours."
              center
              light
            />
            <div className="mt-10"><QuoteBuilder /></div>
          </div>
        </div>
      </section>

      <CTABar title="Ready to plan with AUZBIZ?" subtitle="Free consultation · No obligation · WhatsApp replies during office hours" />
    </>
  );
}
