import Link from "next/link";
import {
  Plane, Globe, Hotel, IdCard, GraduationCap, Clock,
  ArrowRight, Shield, Compass, Heart, Search,
  MessageCircle, BarChart, Phone, Mail, MapPin, Moon, ClipboardCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { SectionHeader, Card, Badge } from "@/components/ui";
import HeroRouteArt from "@/components/HeroRouteArt";
import CTABar from "@/components/CTABar";
import QuoteBuilder from "@/components/QuoteBuilder";
import TourCard from "@/components/TourCard";
import { getContentSafe, sortPosts } from "@/lib/content/store";
import { BlogSection } from "@/sections/BlogSection";

export const dynamic = "force-dynamic";

const heroFeatures = [
  { icon: BarChart, label: "Sample fare comparison" },
  { icon: Plane, label: "Live plane radar" },
  { icon: IdCard, label: "Visa requirements catalogue" },
  { icon: Clock, label: "WhatsApp travel desk" },
];

const operatingFacts = [
  { value: "8", label: "Services, one team" },
  { value: "1", label: "Point of contact" },
  { value: "Mon–Sat", label: "9am – 8pm office hours" },
  { value: "Lahore", label: "DHA II (Rehbar) office" },
];

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
      <section className="relative bg-surface dark:bg-slate-950 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-64 h-[44rem] w-[44rem] rounded-full bg-amber-500/[0.08] blur-3xl dark:bg-amber-500/[0.05]"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid items-center gap-14 pt-16 sm:pt-24 pb-20 sm:pb-28 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400 mb-6 animate-fade-in">
                <Plane size={14} strokeWidth={2} />
                Fare comparison &amp; live plane radar
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[4rem] font-bold tracking-tight leading-[1.05] mb-6 max-w-3xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Travel planned with<br />
                <span className="bg-gradient-to-r from-slate-900 via-amber-600 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-amber-400 dark:to-white">precision.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
                End-to-end travel from Lahore — Umrah, visas, group tours, corporate MICE, and practical flight tools. Clear inclusions, one accountable desk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <Button href="/ticket-analysis" size="lg" className="w-full sm:w-auto">
                  <Search size={18} /> Explore fare analysis
                </Button>
                <Button href="https://wa.me/923464993122" variant="outline" size="lg" className="w-full sm:w-auto">
                  <MessageCircle size={18} strokeWidth={2} /> Chat on WhatsApp
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground animate-slide-up" style={{ animationDelay: "0.4s" }}>
                {heroFeatures.map((f) => (
                  <div key={f.label} className="flex items-center gap-2">
                    <f.icon size={14} strokeWidth={2} className="text-slate-600 dark:text-slate-400" />
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden xl:block">
              <HeroRouteArt />
            </div>
          </div>
        </div>

        {/* Operating facts */}
        <div className="border-y border-border bg-surface/50 dark:border-white/5 dark:bg-slate-950/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
              {operatingFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <span className="block text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {fact.value}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {fact.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
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
