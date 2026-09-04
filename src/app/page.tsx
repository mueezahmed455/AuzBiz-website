"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2, Plane, Globe, Moon, Hotel, IdCard, GraduationCap, ClipboardCheck,
  MapPin, Check, Trophy, Compass, Heart, ArrowRight, Shield, Clock, Phone,
} from "lucide-react";
import { SectionHeader, StaggerChildren, StaggerItem } from "@/components/ui";
import AnimatedCounter from "@/components/AnimatedCounter";
import SafeHeroBackground from "@/components/SafeHeroBackground";
import QuickActions from "@/components/QuickActions";
import CTABar from "@/components/CTABar";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import ReferralSection from "@/components/ReferralSection";
import QuoteBuilder from "@/components/QuoteBuilder";
import Button from "@/components/Button";
import { AboutSection } from "@/sections/AboutSection";
import { BlogSection } from "@/sections/BlogSection";
import { ContactSection } from "@/sections/ContactSection";

const stats = [
  { value: "500+", label: "Happy clients" },
  { value: "12+", label: "Years expertise" },
  { value: "30+", label: "Destinations" },
  { value: "8", label: "Core services" },
  { value: "2h", label: "Avg. response" },
];

const services = [
  { icon: Moon, title: "Umrah packages", desc: "5-star Makkah & Madinah stays, guided ziyarat, full ground support.", href: "/packages#umrah" },
  { icon: IdCard, title: "Visa services", desc: "UAE, Schengen, UK, USA, Türkiye & more — file prep and honest timelines.", href: "/visas" },
  { icon: Globe, title: "Group tours", desc: "Curated trips across Southeast Asia, Central Asia, Europe, and Pakistan.", href: "/packages" },
  { icon: Plane, title: "Air ticketing", desc: "Domestic and international fares for individuals, families, and groups.", href: "/services" },
  { icon: Building2, title: "Corporate MICE", desc: "Incentive tours, conferences, and team retreats for organisations.", href: "/services" },
  { icon: Hotel, title: "Hotel bookings", desc: "Verified properties worldwide — budget through luxury.", href: "/services" },
  { icon: GraduationCap, title: "Study abroad", desc: "University admissions and student visas for Türkiye, Malaysia, Europe.", href: "/services" },
  { icon: ClipboardCheck, title: "End-to-end management", desc: "One team from enquiry through tickets, visas, hotels, and return.", href: "/contact" },
];

const packages = [
  { destination: "Uzbekistan", region: "Central Asia", duration: "7N · 8D", price: "185,000", features: ["Return airfare", "4-star hotels", "Visa assistance", "Guided city tours"], href: "/packages" },
  { destination: "Thailand", region: "Southeast Asia", duration: "6N · 7D", price: "210,000", features: ["Return airfare", "Bangkok + Phuket", "4-star hotels", "Island excursion"], href: "/packages" },
  { destination: "Umrah", region: "Saudi Arabia", duration: "10N · 11D", price: "320,000", features: ["Return airfare", "5-star Makkah", "Madinah ziyarat", "Full guided support"], href: "/packages#umrah" },
  { destination: "Domestic", region: "Pakistan", duration: "3–5 days", price: "35,000", features: ["Murree & Galliyat", "Hunza & Skardu", "Hotel + transport", "Group rates"], href: "/packages" },
];

const popularVisas = [
  { flag: "🇦🇪", name: "UAE", price: "32,000", href: "/visas#uae" },
  { flag: "🇪🇺", name: "Schengen", price: "75,000", href: "/visas#schengen" },
  { flag: "🇬🇧", name: "UK", price: "95,000", href: "/visas#uk" },
  { flag: "🇹🇷", name: "Türkiye", price: "25,000", href: "/visas#turkey" },
  { flag: "🇲🇾", name: "Malaysia", price: "16,000", href: "/visas#malaysia" },
  { flag: "🇹🇭", name: "Thailand", price: "19,900", href: "/visas#thailand" },
];

const whyUs = [
  { icon: Trophy, title: "Expert-led advisory", desc: "Led by Zubair Ahmad — 12+ years across tourism, FMCG, and corporate facilitation." },
  { icon: Compass, title: "Truly end-to-end", desc: "Tickets, hotels, visas, tours, and events handled by one accountable team." },
  { icon: Shield, title: "Transparent pricing", desc: "Clear starting prices, realistic timelines, and no false visa guarantees." },
  { icon: Heart, title: "Personalised care", desc: "Families, corporates, and first-time travellers — itineraries built around you." },
];

const processSteps = [
  { step: "01", title: "Tell us the plan", desc: "Destination, dates, budget, and travellers — WhatsApp or form." },
  { step: "02", title: "We structure it", desc: "Options for packages, visas, and flights with clear inclusions." },
  { step: "03", title: "Confirm & depart", desc: "Documents, tickets, and briefings handled before you travel." },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-navy-800 dark:bg-[#0a0a1a] relative overflow-hidden">
        <SafeHeroBackground enable3D={false} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="pt-14 pb-12 sm:pt-20 sm:pb-16">
            <p className="text-gold-500 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-4">
              Travel · Events · Visas — Lahore, Pakistan
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight mb-4 max-w-2xl">
              <span className="hero-title-solid">Dream Beyond Borders™</span>
              <span className="block text-white mt-1.5 text-[0.92em] font-semibold text-white/95">
                One team for Umrah, visas, tours &amp; corporate travel
              </span>
            </h1>
            <p className="text-white/55 text-sm sm:text-[15px] leading-relaxed max-w-xl mb-5">
              Practical planning from DHA Lahore — transparent package pricing, visa file support, and end-to-end management for families and corporates.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/50 mb-8">
              <span className="trust-pill"><MapPin size={12} className="text-gold-500" /> DHA II (Rehbar), Lahore</span>
              <span className="trust-pill"><Clock size={12} className="text-gold-500" /> Reply within ~2 hours</span>
              <span className="trust-pill"><Phone size={12} className="text-gold-500" /> +92 346 4993122</span>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
              <Button href="/packages" variant="gold" size="lg">View packages</Button>
              <Button href="/visas" variant="secondary" size="lg">Visa services</Button>
              <Button href="https://wa.me/923464993122?text=Hi%20AUZBIZ%2C%20I%20need%20help%20with%20travel%20planning" variant="whatsapp" size="lg">WhatsApp us</Button>
            </div>
            <p className="text-[11px] font-semibold tracking-wider uppercase text-white/35 mb-3">Start with what you need</p>
            <QuickActions />
          </div>
        </div>
        <div className="relative -mb-px">
          <svg className="w-full h-5 sm:h-6 text-gold-500" viewBox="0 0 1200 30" preserveAspectRatio="none" aria-hidden>
            <path d="M0,30 L0,12 Q150,0 300,12 T600,12 T900,12 T1200,12 L1200,30 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      <section className="bg-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-3 sm:gap-y-0 sm:divide-x divide-navy-800/15">
            {stats.map((stat) => (
              <div key={stat.label} className="py-4 sm:py-5 text-center">
                <AnimatedCounter target={parseInt(stat.value.replace(/\D/g, "")) || 0} suffix={stat.value.replace(/[\d.]/g, "")} prefix="" className="text-xl sm:text-2xl font-bold text-navy-800" />
                <div className="text-[10px] sm:text-xs text-navy-800/65 mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
            <div>
              <p className="text-gold-500 text-xs font-semibold tracking-[0.18em] uppercase mb-1.5">Visa services</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-800 dark:text-white tracking-tight">Popular visas from Pakistan</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Starting assistance fees · Document checklists on each country page</p>
            </div>
            <Link href="/visas" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 dark:text-gold-500">All visas <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularVisas.map((v) => (
              <Link key={v.name} href={v.href} className="visa-chip rounded-xl border p-4 text-center" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <span className="text-2xl block mb-1.5" aria-hidden>{v.flag}</span>
                <span className="text-sm font-semibold text-navy-800 dark:text-white block">{v.name}</span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 block">from PKR {v.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />

      <section className="py-14" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What we offer" title="Eight services. One accountable team." description="Book what you need — or let us run the full itinerary from enquiry to return." />
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-9">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <Link href={service.href} className="service-tile block border rounded-2xl p-5 h-full group" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="w-11 h-11 icon-box-premium rounded-xl flex items-center justify-center mb-3.5 text-navy-800 dark:text-gold-500">
                    <service.icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-semibold text-[15px] text-navy-800 dark:text-white mb-1.5">{service.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{service.desc}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Featured packages" title="Clear inclusions. Honest pricing." description="Starting prices per person — final quotes depend on dates, airline, and room category." />
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
            {packages.map((pkg) => (
              <StaggerItem key={pkg.destination}>
                <Link href={pkg.href} className="package-card block group border rounded-2xl overflow-hidden h-full" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="bg-navy-800 dark:bg-[#12122a] px-5 py-4">
                    <p className="text-[10px] font-semibold tracking-wider uppercase text-gold-500/80 mb-1">{pkg.region}</p>
                    <h3 className="text-gold-500 font-bold text-base">{pkg.destination}</h3>
                    <p className="text-white/45 text-xs mt-0.5">{pkg.duration}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-lg font-bold text-navy-800 dark:text-white mb-3">PKR {pkg.price} <span className="text-xs text-gray-400 font-normal">/ person</span></p>
                    <ul className="space-y-1.5 mb-4">
                      {pkg.features.map((f) => (
                        <li key={f} className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2">
                          <Check size={12} className="text-emerald-600 mt-0.5 shrink-0" strokeWidth={2.5} />{f}
                        </li>
                      ))}
                    </ul>
                    <span className="text-xs font-semibold text-navy-800 dark:text-gold-500">View details →</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <div className="mt-8 text-center">
            <Button href="/packages" variant="outline" size="md" icon={ArrowRight} iconPosition="right">Browse all packages</Button>
          </div>
        </div>
      </section>

      <section className="py-14" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="How it works" title="Three steps from enquiry to departure" description="Clear process on WhatsApp or in person." center />
          <div className="grid md:grid-cols-3 gap-5 mt-10 max-w-4xl mx-auto">
            {processSteps.map((s) => (
              <div key={s.step} className="rounded-2xl border p-6 text-center" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <span className="text-gold-500 text-xs font-bold tracking-widest">{s.step}</span>
                <h3 className="text-navy-800 dark:text-white font-semibold mt-2 mb-1.5">{s.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Why AUZBIZ" title="Why clients book with us — and return" description="Industry networks, realistic advice, and care after the ticket is issued." />
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-9">
            {whyUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="border rounded-xl p-5 h-full" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="w-10 h-10 icon-box rounded-lg flex items-center justify-center mb-3.5"><item.icon size={20} strokeWidth={1.6} /></div>
                  <h3 className="font-semibold text-sm text-navy-800 dark:text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <BlogSection />

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Client feedback" title="Trusted by travellers and corporate teams" />
          <div className="mt-9"><Testimonials /></div>
        </div>
      </section>

      <section className="py-12" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Corporate clients" title="Trusted by leading organisations" center />
          <div className="mt-8"><Partners /></div>
        </div>
      </section>

      <ReferralSection />

      <section className="py-14" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <SectionHeader eyebrow="Custom quote" title="Build your own package" description="Share preferences and get a tailored quote within ~2 hours." center />
            <div className="mt-8"><QuoteBuilder /></div>
          </div>
        </div>
      </section>

      <ContactSection />
      <CTABar title="Ready to plan with AUZBIZ?" subtitle="Free consultation · No obligation · Response within ~2 hours" />
    </>
  );
}
