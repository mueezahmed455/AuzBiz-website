"use client";

import {
  Target,
  Eye,
  Star,
  GraduationCap,
  BookOpen,
  ScrollText,
  Calendar,
  Handshake,
  Globe,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { SectionHeader, FadeInView, StaggerChildren, StaggerItem } from "@/components/ui";
import TiltCard from "@/components/TiltCard";
import HeroParticles from "@/components/HeroParticles";
import CTABar from "@/components/CTABar";
import PageMetadata from "@/components/PageMetadata";

const vmCards = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To deliver seamless, premium travel and business facilitation services that empower individuals, families, and organisations to explore the world with confidence, comfort, and complete peace of mind.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To be Pakistan's most trusted one-stop travel and events partner — recognised for exceptional service quality, deep industry expertise, and a client-first culture.",
  },
  {
    icon: Star,
    title: "Our Values",
    desc: "Trust. Transparency. Excellence. We build relationships, not just itineraries. Every commitment we make — on pricing, timelines, and service — is honoured without exception.",
  },
];

const experience = [
  { company: "AUZBIZ — Dream Beyond Borders", role: "Chief Executive Officer (CEO) & Founder", period: "PRESENT — LAHORE" },
  { company: "Alliance Digital Partners (ADP)", role: "Founder & Digital Marketing Lead", period: "PRESENT — LAHORE" },
  { company: "Four Brothers Group", role: "Senior Marketing Manager", period: "PRIOR — AGRI-INPUT SECTOR" },
  { company: "Ali Akbar Group", role: "Senior Marketing Role", period: "PRIOR — FMCG & AGRI SECTOR" },
  { company: "Nonprofit & Development Sector", role: "Marketing & Communications", period: "MULTI-YEAR TENURE" },
];

const sectors = [
  "Travel & Tourism", "Agriculture", "FMCG", "Corporate",
  "Digital Marketing", "Nonprofit",
];

const differences = [
  { icon: Handshake, title: "Client-First Always", desc: "Every decision guided by what is best for the client — not the commission. Full transparency on pricing, inclusions, and timelines." },
  { icon: Globe, title: "Deep Industry Networks", desc: "From Lahore's top agri-input companies to international hotel chains and airlines — our network delivers better rates and priority service." },
  { icon: CheckCircle, title: "End-to-End Execution", desc: "One point of contact from your first enquiry to your safe return. No hand-offs, no confusion — just seamless, coordinated delivery." },
  { icon: TrendingUp, title: "Corporate Credibility", desc: "Trusted MICE and incentive tour partner for Pakistan's leading FMCG, pharmaceutical, and agri-input sector companies." },
];

export default function AboutPage() {
  return (
    <>
      <PageMetadata
        title="About AUZBIZ — Premium Travel & Events Agency Lahore | Dream Beyond Borders"
        description="Meet Zubair Ahmad and the AUZBIZ team. 12+ years of expertise in travel, corporate MICE events, Umrah, study abroad, and business facilitation. Discover our mission, vision, and values."
      />
      {/* Hero */}
      <section className="bg-navy-800 dark:bg-[#0a0a1a] relative overflow-hidden">
        <HeroParticles />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
          <FadeInView>
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              About AUZBIZ — Dream Beyond Borders
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              Lahore-Based. Client-First.
              <span className="block text-gold-500">12+ Years in Travel & Events.</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
              12+ years in travel, events, and corporate services. We handle flights, hotels,
              visas, and logistics — so you can focus on the journey.
            </p>
          </FadeInView>
        </div>
        <div className="h-1 bg-gold-500" />
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <FadeInView>
              <SectionHeader eyebrow="Our Story" title="Who we are" />
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                AUZBIZ — Dream Beyond Borders is a Lahore-based premium travel, events, and
                business facilitation agency.Our goal is straightforward: make quality travel and event management accessible for Pakistanis. Over the years, we've become a trusted name among individuals, families, and corporate organisations.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                We operate at the intersection of travel, tourism, and corporate services.
                Whether you&apos;re a family planning an international holiday, a young professional
                seeking study abroad opportunities, or a CEO organising a flagship corporate
                retreat, AUZBIZ delivers with precision, professionalism, and genuine care.
                Our tagline — <em className="text-gold-500">Dream Beyond Borders™</em> — is what
                we deliver every day.
              </p>
            </FadeInView>

            <FadeInView delay={0.15}>
              <div className="bg-navy-800 rounded-2xl p-6 sm:p-8 mb-5">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed italic mb-4">
                  &ldquo;We don&apos;t just book flights and hotels. We craft experiences that
                  stay with you long after the journey ends — because every traveller deserves
                  a story worth telling.&rdquo;
                </p>
                <p className="text-gold-500 text-xs font-semibold">
                  — Zubair Ahmad, Chief Executive Officer (CEO), AUZBIZ
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { n: "500+", l: "Happy Clients" },
                  { n: "12+", l: "Years Expertise" },
                  { n: "30+", l: "Destinations" },
                  { n: "8", l: "Core Services" },
                ].map((s) => (
                  <div key={s.l} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-navy-800">{s.n}</div>
                    <div className="text-[10px] text-gray-400 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-100" />
      </div>

      {/* Mission Vision Values */}
      <section className="py-16 sm:py-20 transition-colors duration-400" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Foundations"
            title="Mission, Vision & Values"
          />
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {vmCards.map((card) => (
              <StaggerItem key={card.title}>
                <TiltCard tiltAmount={4} scale={1.02}>                      <div className="border rounded-xl p-6 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300 h-full" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="w-12 h-12 bg-navy-800 icon-box rounded-xl flex items-center justify-center mb-4 text-gold-500">
                    <card.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-navy-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Meet the Leader */}
      <section className="py-16 sm:py-20 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Meet the Leader"
            title="The mind behind AUZBIZ"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 items-start">
            <FadeInView>
              <div className="border rounded-2xl overflow-hidden shadow-sm" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <div className="bg-navy-800 px-6 py-7 flex items-end gap-5">
                  <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0 text-navy-800 font-bold text-xl">
                    ZA
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Zubair Ahmad</h3>
                    <p className="text-gold-500 text-xs font-semibold">
                      Chief Executive Officer (CEO) — AUZBIZ — Dream Beyond Borders
                    </p>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Zubair Ahmad is a seasoned Marketing, Tourism, and Corporate Sector expert
                    with over 12 years of transformative experience spanning Pakistan&apos;s most
                    competitive industries — agriculture, FMCG, and the corporate sector.
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    His academic foundation is exceptional: an MBA in Marketing, an MA in
                    English Literature and Language, and a Postgraduate Diploma in International
                    Relations — a rare combination that gives him both analytical rigour and
                    communication finesse.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: GraduationCap, label: "Qualification", val: "MBA in Marketing" },
                      { icon: BookOpen, label: "Qualification", val: "MA English Literature" },
                      { icon: ScrollText, label: "Diploma", val: "International Relations" },
                      { icon: Calendar, label: "Experience", val: "12+ Years" },
                    ].map((cred) => (
                      <div key={cred.val} className="bg-gray-50 rounded-lg p-3 flex gap-2.5 items-start">
                        <cred.icon size={20} strokeWidth={1.5} className="text-navy-800" />
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase tracking-wider">{cred.label}</div>
                          <div className="text-xs font-semibold text-navy-800">{cred.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={0.15}>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-4">
                    Professional Journey
                  </h4>
                  <div className="space-y-4">
                    {experience.map((exp, i) => (
                      <div key={i} className="flex gap-3 items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-navy-800">{exp.company}</p>
                          <p className="text-xs text-gray-500">{exp.role}</p>
                          <p className="text-[10px] text-gold-500 font-medium mt-0.5">{exp.period}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-3">
                    Sectors Served
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sectors.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-gray-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-100" />
      </div>

      {/* AUZBIZ Difference */}
      <section className="py-16 sm:py-20 transition-colors duration-400" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Makes Us Different"
            title="The AUZBIZ difference"
          />
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {differences.map((d) => (
              <StaggerItem key={d.title}>
                <TiltCard tiltAmount={4} scale={1.015}>                      <div className="border rounded-xl p-5 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300 h-full" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="w-10 h-10 icon-box rounded-lg flex items-center justify-center mb-4 text-navy-800 group-hover:bg-navy-800 group-hover:text-gold-500 transition-colors duration-300">
                    <d.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-sm text-navy-800 mb-2">{d.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <CTABar
        title="Ready to plan your next journey with AUZBIZ?"
        subtitle="Free consultation · No obligation · Response within 2 hours"
        primaryHref="/packages"
        primaryLabel="View Our Packages"
      />
    </>
  );
}
