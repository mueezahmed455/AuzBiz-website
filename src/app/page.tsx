"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Plane,
  Globe,
  Moon,
  Hotel,
  IdCard,
  GraduationCap,
  ClipboardCheck,
  MapPin,
  Phone,
  Mail,
  User,
  Check,
  Trophy,
  Compass,
  Heart,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { SectionHeader, FadeInView, StaggerChildren, StaggerItem } from "@/components/ui";
import AnimatedCounter from "@/components/AnimatedCounter";
import TiltCard from "@/components/TiltCard";
import HeroParticles from "@/components/HeroParticles";
import CityGlobe from "@/components/3d/CityGlobe";
import CTABar from "@/components/CTABar";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import ReferralSection from "@/components/ReferralSection";
import QuoteBuilder from "@/components/QuoteBuilder";
import Button from "@/components/Button";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "12+", label: "Years Expertise" },
  { value: "30+", label: "Destinations" },
  { value: "8", label: "Core Services" },
  { value: "100%", label: "End-to-End" },
];

const services = [
  {
    icon: Building2,
    title: "Corporate Events & MICE",
    desc: "Incentive tours, team retreats, conferences, and corporate dinners for leading organisations.",
  },
  {
    icon: Plane,
    title: "Air Ticketing",
    desc: "Domestic and international air tickets at best-available fares for individuals and groups.",
  },
  {
    icon: Globe,
    title: "Group Tours",
    desc: "Curated group travel to Southeast Asia, Central Asia, Europe, and domestic destinations.",
  },
  {
    icon: Moon,
    title: "Umrah Packages",
    desc: "Spiritually enriching Umrah journeys with 5-star hotels, guided Ziyarat, and full support.",
  },
  {
    icon: Hotel,
    title: "Hotel Bookings",
    desc: "Verified hotel reservations worldwide — from budget-friendly stays to luxury properties.",
  },
  {
    icon: IdCard,
    title: "Visa Services",
    desc: "Schengen, UAE, UK, Malaysia, and other visa documentation with expert advisory.",
  },
  {
    icon: GraduationCap,
    title: "Study Abroad",
    desc: "University admissions, student visas, and guidance for Türkiye, Malaysia, and Europe.",
  },
  {
    icon: ClipboardCheck,
    title: "End-to-End Management",
    desc: "Full-cycle travel and event management — from first enquiry to safe return home.",
  },
];

const packages = [
  {
    destination: "Uzbekistan",
    duration: "7 Nights · 8 Days",
    price: "PKR 185,000",
    features: ["Return airfare", "4-star hotel", "Visa assistance", "Guided city tours"],
    href: "/packages",
  },
  {
    destination: "Thailand",
    duration: "6 Nights · 7 Days",
    price: "PKR 210,000",
    features: ["Return airfare", "4-star hotel", "Bangkok + Phuket", "Island excursion"],
    href: "/packages",
  },
  {
    destination: "Umrah",
    duration: "10 Nights · 11 Days",
    price: "PKR 320,000",
    features: ["Return airfare", "5-star Makkah hotel", "Madinah ziyarat", "Full guided support"],
    href: "/packages",
  },
  {
    destination: "Domestic Tours",
    duration: "3–5 Days",
    price: "PKR 35,000",
    features: ["Murree & Galliyat", "Hunza & Skardu", "Hotel + transport", "Group discounts"],
    href: "/packages",
  },
];

const whyUs = [
  {
    icon: Trophy,
    title: "Expert-Led Advisory",
    desc: "Led by Zubair Ahmad, CEO with 12+ years across FMCG, agriculture, and tourism sectors.",
  },
  {
    icon: Compass,
    title: "Truly End-to-End",
    desc: "Air tickets, hotels, visas, tours, events — every detail handled by one trusted team.",
  },
  {
    icon: Building2,
    title: "Corporate Specialists",
    desc: "Trusted MICE partner for agri-input, FMCG, pharma, and financial sector companies.",
  },
  {
    icon: Heart,
    title: "Personalised Care",
    desc: "Every trip is tailored to your needs — no cookie-cutter packages, no hidden costs.",
  },
];

export default function HomePage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleFormChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setFormError("Please fill in your name and phone number.");
      return;
    }
    setFormStatus("loading");
    setFormError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: formData.name, phone: formData.phone, email: formData.email, service: formData.service, message: formData.message }),
      });
      if (!res.ok) throw new Error();
      setFormStatus("success");
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    } catch {
      setFormStatus("error");
      setFormError("Could not send. Please WhatsApp us directly.");
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "AUZBIZ — Dream Beyond Borders",
    url: "https://www.auzbizgroup.com",
    logo: "https://www.auzbizgroup.com/og-image.jpg",
    image: "https://www.auzbizgroup.com/og-image.jpg",
    telephone: "+92-346-4993122",
    email: "auzbizpak@gmail.com",
    description:
      "Pakistan's most trusted travel, events, and business facilitation agency. Umrah packages, corporate MICE events, group tours, air ticketing, visa services, hotel bookings, and study abroad consultancy.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "DHA II (Rehbar) Lahore-Pakistan",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs: [
      "https://www.facebook.com/auzbizpak",
      "https://www.linkedin.com/company/auzbiz",
      "https://wa.me/923464993122",
    ],
    founder: {
      "@type": "Person",
      name: "Zubair Ahmad",
      jobTitle: "Chief Executive Officer (CEO)",
    },
    areaServed: ["PK", "SA", "AE", "TH", "UZ", "TR", "MY"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Travel & Events Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Events & MICE" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air Ticketing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Group Tours" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Umrah Packages" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hotel Bookings" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Visa Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Study Abroad" } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HERO ── */}
      <section className="bg-navy-800 dark:bg-[#0a0a1a] relative overflow-hidden">
        {/* Enhanced 3D particle field */}
        <HeroParticles />
        {/* 3D City Globe with flight routes and city markers */}
        <div className="absolute right-0 top-0 w-3/5 h-full hidden lg:block">
          <CityGlobe />
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gold-500/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="pt-16 pb-14 sm:pt-24 sm:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                Your One-Stop Travel & Events Partner — Lahore, Pakistan
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 max-w-2xl"
            >
              <span className="gradient-text-animated">Dream Beyond Borders™</span>
              <motion.span
                className="block text-gold-500 mt-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                With Pakistan&apos;s Most Trusted Travel & Events Agency
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl mb-3"
            >
              From soul-enriching Umrah journeys and international group tours to corporate
              MICE events, air ticketing, hotel bookings, visa services, and study abroad
              consultancy — we deliver end-to-end excellence for individuals, families, and
              corporates alike.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-2 text-gold-500/70 text-xs mb-7"
            >
              <MapPin size={14} fill="currentColor" />
              DHA II (Rehbar) Lahore-Pakistan
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Button href="/packages" size="lg" className="text-center">
                Explore Packages
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="text-center">
                Free Consultation
              </Button>
              <Button
                href="https://wa.me/923464993122"
                variant="whatsapp"
                size="lg"
                className="text-center justify-center"
              >
                WhatsApp Us
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Wave divider to stats */}
        <div className="relative -mb-px">
          <svg className="w-full h-6 text-gold-500" viewBox="0 0 1200 30" preserveAspectRatio="none">
            <path d="M0,30 L0,12 Q150,0 300,12 T600,12 T900,12 T1200,12 L1200,30 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-3 sm:gap-y-0 sm:divide-x divide-navy-800/15">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="py-5 text-center"
              >
                <AnimatedCounter
                  target={parseInt(stat.value.replace(/\D/g, "")) || 0}
                  suffix={stat.value.replace(/\d/g, "")}
                  prefix={stat.value.match(/^\D+/) ? stat.value.match(/^\D+/)![0] : ""}
                  className="text-xl sm:text-2xl font-bold text-navy-800"
                />
                <div className="text-[10px] sm:text-xs text-navy-800/60 mt-0.5 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-16 sm:py-20 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who We Are"
            title="Pakistan's premium travel & business facilitation agency"
            description="AUZBIZ — Dream Beyond Borders is a Lahore-based premium agency led by Zubair Ahmad, Chief Executive Officer (CEO) with 12+ years of expertise across travel, FMCG, and the corporate sector. We specialise in crafting seamless, memorable experiences — whether it's a spiritual Umrah journey, an adventurous group tour, a high-impact corporate event, or a life-changing study abroad opportunity."
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-100" />
      </div>

      {/* ── SERVICES ── */}
      <section className="py-16 sm:py-20 transition-colors duration-400" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Offer"
            title="8 services. One trusted partner."
            description="Everything you need — under one roof — handled with precision and care."
          />
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <TiltCard tiltAmount={4} scale={1.015}>
                  <div className="border rounded-xl p-5 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5 transition-all duration-300 group h-full" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="w-10 h-10 icon-box rounded-lg flex items-center justify-center mb-4 text-navy-800 group-hover:bg-navy-800 group-hover:text-gold-500 transition-colors duration-300">
                    <service.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-sm text-navy-800 mb-2">{service.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{service.desc}</p>                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-16 sm:py-20 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured Packages"
            title="Travel the world with AUZBIZ"
            description="Handcrafted itineraries combining value, comfort, and unforgettable experiences."
          />
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {packages.map((pkg) => (
              <StaggerItem key={pkg.destination}>
                <TiltCard tiltAmount={5} scale={1.02}>
                <Link
                  href={pkg.href}
                  className="block group border rounded-xl overflow-hidden hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-300"
                  style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                >
                  <div className="bg-navy-800 dark:bg-[#12122a] px-5 py-5">
                    <h3 className="text-gold-500 font-bold text-base mb-1">{pkg.destination}</h3>
                    <p className="text-white/50 text-xs">{pkg.duration}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-lg font-bold text-navy-800 mb-1">
                      {pkg.price}{" "}
                      <span className="text-xs text-gray-400 font-normal">/ person</span>
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {pkg.features.map((f) => (
                        <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
                          <Check size={12} stroke="#1D9E75" strokeWidth={2.5} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="text-xs font-semibold text-navy-800 group-hover:text-gold-500 transition-colors duration-200">
                      View details →
                    </span>
                  </div>
                </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 sm:py-20 transition-colors duration-400" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Choose AUZBIZ"
            title="Why clients trust us — and return to us"
            description="We combine deep industry networks, marketing expertise, and genuine care to deliver experiences that exceed expectations every time."
          />
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {whyUs.map((item) => (
              <StaggerItem key={item.title}>
                <TiltCard tiltAmount={4} scale={1.015}>
                  <div className="border rounded-xl p-5 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300 h-full" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="w-10 h-10 icon-box rounded-lg flex items-center justify-center mb-4 text-navy-800 group-hover:bg-navy-800 group-hover:text-gold-500 transition-colors duration-300">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-sm text-navy-800 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-16 sm:py-20 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Contact Us"
            title="Let's plan your next journey"
          />
          <FadeInView className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Info */}
            <div>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Whether it&apos;s a group tour, corporate event, Umrah package, or study abroad
                guidance — our team is ready. Reach out for a free, no-obligation consultation.
              </p>
              <div className="space-y-5">
                {[
                  {
                    icon: User,
                    label: "Your Host",
                    value: "Zubair Ahmad — Chief Executive Officer (CEO)",
                  },
                  {
                    icon: Phone,
                    label: "Phone / WhatsApp",
                    value: "+92 346 4993122",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "auzbizpak@gmail.com",
                  },
                  {
                    icon: MapPin,
                    label: "Office Address",
                    value: "DHA II (Rehbar) Lahore-Pakistan",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="w-10 h-10 icon-box rounded-lg flex items-center justify-center flex-shrink-0 text-navy-800">
                      <item.icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-sm font-semibold text-navy-800">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-7">
                <Button
                  href="https://wa.me/923464993122"
                  variant="whatsapp"
                  size="sm"
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Form */}
            <div className="border rounded-xl p-6 shadow-sm" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <h3 className="font-semibold text-navy-800 mb-1">Send an inquiry</h3>
              <p className="text-xs text-gray-400 mb-5">We respond within 2 hours on WhatsApp.</p>
              <form className="space-y-3.5" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">                  Full name
                </label>
                  <input
                    type="text"
                    placeholder="e.g. Ahmed Khan"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all dark:bg-[#12122a] dark:border-[#2a2a5e] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Phone / WhatsApp number</label>
                  <input
                    type="text"
                    placeholder="+92 3XX XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all dark:bg-[#12122a] dark:border-[#2a2a5e] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all dark:bg-[#12122a] dark:border-[#2a2a5e] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Service required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => handleFormChange("service", e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all text-gray-500 dark:bg-[#12122a] dark:border-[#2a2a5e] dark:text-white"
                  >
                    <option value="">Select a service...</option>
                    <option>Corporate Events & MICE</option>
                    <option>Air Ticketing</option>
                    <option>Group Tours</option>
                    <option>Umrah Package</option>
                    <option>Hotel Bookings</option>
                    <option>Visa Services</option>
                    <option>Study Abroad</option>
                    <option>End-to-End Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Your message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your travel plans, group size, dates..."
                    value={formData.message}
                    onChange={(e) => handleFormChange("message", e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all resize-none dark:bg-[#12122a] dark:border-[#2a2a5e] dark:text-white"
                  />
                </div>
                {formStatus === "success" && (
                  <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-lg p-3 text-center">
                    <p className="text-xs text-[#1D9E75] font-semibold">✓ Inquiry sent! We'll respond on WhatsApp within 2 hours.</p>
                  </div>
                )}
                {formError && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                    <p className="text-xs text-red-500">{formError}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full bg-navy-800 text-gold-500 text-sm font-semibold py-3 rounded-lg hover:bg-navy-700 transition-colors duration-200 dark:bg-gold-500 dark:text-navy-800 dark:hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {formStatus === "loading" ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    "Send Inquiry — auzbizgroup.com"
                  )}
                </button>
              </form>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 sm:py-20 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Our Clients Say"
            title="Trusted by hundreds of happy travellers"
            description="From corporate groups to families — hear from clients who experienced the AUZBIZ difference."
          />
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="py-12 sm:py-16 transition-colors duration-400" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Corporate Clients"
            title="Trusted by leading organisations"
            description="AUZBIZ serves Pakistan's top corporations with MICE events, incentive tours, and business travel management."
            center
          />
          <div className="mt-10">
            <Partners />
          </div>
        </div>
      </section>

      {/* ── REFERRAL PROGRAM ── */}
      <ReferralSection />

      {/* ── QUOTE BUILDER ── */}
      <section className="py-16 sm:py-20 transition-colors duration-400" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <SectionHeader
              eyebrow="Custom Quote"
              title="Build your own package"
              description="Don't see what you're looking for? Tell us your preferences and get a custom quote in under 2 hours."
              center
            />
            <div className="mt-8">
              <QuoteBuilder />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAR ── */}
      <CTABar
        title="Ready to plan your next journey with AUZBIZ?"
        subtitle="Free consultation · No obligation · Response within 2 hours"
      />
    </>
  );
}
