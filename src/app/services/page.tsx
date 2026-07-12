"use client";

import Link from "next/link";
import {
  Building2,
  Plane,
  Globe,
  Moon,
  Hotel,
  IdCard,
  GraduationCap,
  ClipboardCheck,
  Check,
} from "lucide-react";
import { SectionHeader, FadeInView } from "@/components/ui";
import TiltCard from "@/components/TiltCard";
import HeroParticles from "@/components/HeroParticles";
import CTABar from "@/components/CTABar";
import PageMetadata from "@/components/PageMetadata";
import Button from "@/components/Button";

interface ServiceData {
  num: number;
  eyebrow: string;
  title: string;
  location: string;
  desc: string;
  includes: string[];
  tags: string[];
  idealFor: string;
  primaryLabel: string;
}

const services: ServiceData[] = [
  {
    num: 1,
    eyebrow: "Corporate Events & MICE",
    title: "Meetings, Incentives, Conferences & Exhibitions",
    location: "LAHORE · NATIONWIDE · INTERNATIONAL",
    desc: "AUZBIZ is the preferred MICE and corporate events partner for Pakistan's leading FMCG, agri-input, pharmaceutical, and financial sector organisations. We design and execute events that motivate teams, reward performance, and elevate your brand — from intimate leadership retreats to large-scale incentive group tours for 200+ participants.",
    includes: [
      "Domestic and international incentive tour planning and execution",
      "Conference and meeting venue sourcing, booking, and AV setup",
      "Corporate dinners, gala nights, and award ceremony management",
      "Team-building retreats to Murree, Galliyat, Hunza, Bali, KL & beyond",
      "Group air ticketing, hotel blocks, and transport coordination",
      "Custom branding, event decor, and on-ground management",
    ],
    tags: ["Incentive Tours", "Team Retreats", "Conferences", "Corporate Dinners", "Award Ceremonies"],
    idealFor: "FMCG companies, agri-input firms, pharmaceutical corporates, banks, insurance companies, and NGOs seeking professional event and incentive tour management.",
    primaryLabel: "Request a Proposal",
  },
  {
    num: 2,
    eyebrow: "Air Ticketing",
    title: "Domestic & International Air Tickets",
    location: "ALL AIRLINES · ALL DESTINATIONS",
    desc: "We source the best-available airfares across all major airlines operating to and from Pakistan — PIA, Turkish Airlines, Emirates, Qatar Airways, Air Arabia, flydubai, and more. Whether you need a single economy ticket or a block booking for a corporate group of 100+, AUZBIZ delivers speed, accuracy, and competitive pricing.",
    includes: [
      "Domestic and international ticketing for individuals, families, and groups",
      "Best-fare search across all major airlines and routes",
      "Group block bookings with preferential rates for 10+ passengers",
      "Umrah and Hajj charter and scheduled flight arrangements",
      "Rebooking, cancellation, and refund assistance",
      "Business class and premium economy upgrades",
    ],
    tags: ["Economy", "Business Class", "Group Bookings", "Open-Jaw Tickets"],
    idealFor: "Individuals, families, corporate travellers, Umrah groups, and companies managing frequent business travel needs.",
    primaryLabel: "Get Best Fare Quote",
  },
  {
    num: 3,
    eyebrow: "Group Tours",
    title: "Curated International & Domestic Group Travel",
    location: "30+ DESTINATIONS WORLDWIDE",
    desc: "From the ancient Silk Road cities of Uzbekistan to the golden beaches of Thailand and the cultural grandeur of Türkiye — AUZBIZ crafts handpicked group tour packages that balance adventure, comfort, and cultural discovery. Every itinerary is thoughtfully designed with Pakistani travellers in mind: halal food, Muslim-friendly accommodations, and knowledgeable local guides.",
    includes: [
      "Fully curated itineraries covering Southeast Asia, Central Asia & Europe",
      "Return airfare, 4–5 star hotel accommodation included",
      "Halal food arrangements and Muslim-friendly hotel selection",
      "Guided sightseeing, city tours, and cultural experiences",
      "Domestic tours to Murree, Hunza, Skardu, Swat, and Galliyat",
      "Group discounts for 10+ passengers",
    ],
    tags: ["Uzbekistan", "Thailand", "Bali", "Malaysia", "Türkiye", "Europe", "Pakistan"],
    idealFor: "Families, friend groups, university alumni groups, corporate teams, and travel enthusiasts looking for curated, worry-free international experiences.",
    primaryLabel: "Explore All Tours",
  },
  {
    num: 4,
    eyebrow: "Umrah Packages",
    title: "Spiritually Enriching Umrah Journeys",
    location: "MAKKAH · MADINAH · FULL GUIDED SUPPORT",
    desc: "We understand that Umrah is not just a journey — it is a profound spiritual milestone. AUZBIZ treats every Umrah package with the reverence it deserves. From economy packages for budget-conscious pilgrims to luxury 5-star experiences for those who wish to focus entirely on worship in comfort, we offer a full range of carefully verified, MOFA-compliant packages.",
    includes: [
      "Return flights from Lahore (LHE) to Jeddah or Madinah",
      "3-star to 5-star hotel options near Haram, Makkah & Madinah",
      "Ziyarat tours in Makkah and Madinah",
      "Umrah visa processing and documentation support",
      "Airport transfers and inter-city transport",
      "Experienced Umrah guides with full pilgrimage support",
      "Special Ramadan Umrah packages available",
    ],
    tags: ["Economy", "Standard", "Premium", "Luxury 5-Star", "Ramadan"],
    idealFor: "Individuals, couples, families, and group pilgrimages seeking a spiritually focused, logistically seamless Umrah experience from Pakistan.",
    primaryLabel: "View Umrah Packages",
  },
  {
    num: 5,
    eyebrow: "Hotel Bookings",
    title: "Worldwide Hotel Reservations at Best Rates",
    location: "BUDGET TO LUXURY · WORLDWIDE",
    desc: "Whether you need a single night's stay for a business trip or a block booking of 50 rooms for a corporate incentive group, AUZBIZ sources verified, quality-assured hotel accommodations worldwide — at rates that consistently beat online booking platforms. Our industry relationships with hotel chains across the Middle East, Southeast Asia, Central Asia, and Europe give you a genuine pricing advantage.",
    includes: [
      "Individual, family, and group hotel reservations worldwide",
      "Budget, standard, and luxury property options in all key destinations",
      "Preferential corporate rates for company travel programmes",
      "Haram-view and proximity hotels for Makkah and Madinah stays",
      "Domestic hotel sourcing for Murree, Hunza, Lahore, Islamabad",
      "Booking modifications, cancellations, and refund coordination",
    ],
    tags: ["3-Star", "4-Star", "5-Star", "Group Blocks", "Corporate Rates"],
    idealFor: "Business travellers, tour groups, Umrah pilgrims, and corporate HR and admin teams managing employee travel accommodation.",
    primaryLabel: "Get Hotel Quote",
  },
  {
    num: 6,
    eyebrow: "Visa Services",
    title: "Expert Visa Documentation & Advisory",
    location: "SCHENGEN · UAE · UK · MALAYSIA & MORE",
    desc: "Navigating visa requirements is often the most stressful part of travel planning — especially for Pakistani passport holders. AUZBIZ simplifies the entire process. Our expert visa advisory team provides accurate, up-to-date guidance on documentation requirements, appointment scheduling, and application submission, dramatically improving approval rates for our clients.",
    includes: [
      "Schengen visa (tourist, business, and transit) documentation support",
      "UAE, Saudi Arabia, Malaysia, and Thailand visa assistance",
      "UK and Europe visa advisory and document preparation",
      "Student visa support for Türkiye, Malaysia, and European universities",
      "Umrah and Hajj visa processing via authorised channels",
      "Document checklist preparation and pre-submission review",
    ],
    tags: ["Tourist Visa", "Business Visa", "Student Visa", "Umrah Visa", "Transit Visa"],
    idealFor: "Individuals and families planning international travel, students applying abroad, and corporate clients requiring business visa support for executives.",
    primaryLabel: "Start Visa Advisory",
  },
  {
    num: 7,
    eyebrow: "Study Abroad",
    title: "University Admissions & International Education Guidance",
    location: "TÜRKIYE · MALAYSIA · EUROPE & BEYOND",
    desc: "A world-class education is one of the most powerful investments a family can make. AUZBIZ guides Pakistani students through the entire study abroad journey — from choosing the right university and programme, to submitting a winning application, securing a student visa, and arranging accommodation and travel. We specialise in destinations offering strong academic quality and accessible pathways.",
    includes: [
      "University selection advisory for Türkiye, Malaysia, EU & Central Asia",
      "Undergraduate and postgraduate programme guidance",
      "Scholarship identification and application support",
      "Student visa documentation, interview prep, and submission",
      "Student accommodation sourcing at the destination",
      "Pre-departure briefing and travel arrangement",
    ],
    tags: ["Undergraduate", "Postgraduate", "Scholarship Guidance", "Student Visa"],
    idealFor: "Pakistani students aged 17–28 and their families seeking affordable, high-quality international university education with visa and travel support included.",
    primaryLabel: "Book Free Consultation",
  },
  {
    num: 8,
    eyebrow: "End-to-End Management",
    title: "Complete Travel & Event Management — Start to Finish",
    location: "ONE POINT OF CONTACT · ZERO GAPS",
    desc: "Our flagship offering — and the philosophy that underpins everything we do at AUZBIZ. End-to-end management means you have one dedicated point of contact who handles every element of your travel or event experience, from the first planning call to the moment you return home. No juggling multiple vendors. No last-minute surprises. Just seamless, expertly coordinated delivery.",
    includes: [
      "Single point of contact for entire travel or event lifecycle",
      "Needs assessment, itinerary design, and budget planning",
      "All bookings: flights, hotels, visas, transport, activities",
      "On-ground coordination and 24/7 WhatsApp support during travel",
      "Emergency handling — rebooking, medical support, lost documents",
      "Post-trip feedback, invoicing, and future trip planning",
    ],
    tags: ["Planning", "Booking", "Coordination", "On-Ground", "Post-Trip"],
    idealFor: "Corporates, large families, and VIP clients who want a completely worry-free experience managed by a single expert team from planning to homecoming.",
    primaryLabel: "Enquire Now",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageMetadata
        title="Our Services — Corporate Events, Travel & Study Abroad | AUZBIZ Lahore"
        description="Explore AUZBIZ's 8 premium services: Corporate MICE events, air ticketing, group tours, Umrah packages, hotel bookings, visa services, study abroad consultancy & end-to-end management — all under one roof in Lahore."
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
              Our Services — 8 Specialisations Under One Roof
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              8 Services.
              <span className="block text-gold-500">One Team. All Under One Roof.</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
              From your first enquiry to your safe return home — AUZBIZ handles every detail
              with professionalism, precision, and genuine care. Eight expert services. One
              trusted partner.
            </p>
          </FadeInView>
        </div>
        <div className="h-1 bg-gold-500" />
      </section>

      {/* Service Pill Navigation */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex gap-2 flex-wrap">
          {services.map((s) => (
            <a
              key={s.num}
              href={`#service-${s.num}`}
              className="text-xs px-3.5 py-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-gold-500 hover:text-gold-500 transition-colors cursor-pointer font-medium"
            >
              {s.eyebrow}
            </a>
          ))}
        </div>
      </section>

      {/* Services */}
      {services.map((svc, i) => (
        <section
          key={svc.num}
          id={`service-${svc.num}`}
          className={`py-14 sm:py-18 transition-colors duration-400 ${i % 2 === 1 ? "bg-[#F9F9FB] dark:bg-[#12122a]" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4 mb-7">
              <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0 text-navy-800 font-bold text-sm">
                {svc.num}
              </div>
              <div>
                <span className="text-xs font-semibold text-gold-500 uppercase tracking-wider">
                  {svc.eyebrow}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mt-0.5">
                  {svc.title}
                </h2>
              </div>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8`}>
              {/* Visual Card */}
              <FadeInView>
                <TiltCard tiltAmount={3} scale={1.01}>                      <div className="bg-navy-800 dark:bg-[#12122a] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="w-14 h-14 bg-gold-500/15 rounded-xl flex items-center justify-center mb-4 text-gold-500">
                      {svc.num === 1 && <Building2 size={28} strokeWidth={1.5} />}
                      {svc.num === 2 && <Plane size={28} strokeWidth={1.5} />}
                      {svc.num === 3 && <Globe size={28} strokeWidth={1.5} />}
                      {svc.num === 4 && <Moon size={28} strokeWidth={1.5} />}
                      {svc.num === 5 && <Hotel size={28} strokeWidth={1.5} />}
                      {svc.num === 6 && <IdCard size={28} strokeWidth={1.5} />}
                      {svc.num === 7 && <GraduationCap size={28} strokeWidth={1.5} />}
                      {svc.num === 8 && <ClipboardCheck size={28} strokeWidth={1.5} />}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1.5">{svc.eyebrow}</h3>
                    <p className="text-gold-500 text-[11px] font-semibold tracking-wider">{svc.location}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-5">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 bg-white/8 border border-white/10 rounded-full text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>                  </div>
                </TiltCard>
              </FadeInView>

              {/* Content */}
              <FadeInView delay={0.1}>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{svc.desc}</p>
                <ul className="space-y-3 mb-5">
                  {svc.includes.map((inc) => (
                    <li key={inc} className="text-sm text-gray-500 flex items-start gap-2.5 leading-relaxed">
                      <Check size={14} stroke="#1D9E75" strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <div className="text-[10px] text-gold-500 font-semibold uppercase tracking-wider mb-1.5">
                    Ideal For
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{svc.idealFor}</p>
                </div>
                <div className="flex gap-3">
                  <Button href="/contact" size="sm">
                    {svc.primaryLabel}
                  </Button>
                  <Button href="https://wa.me/923464993122" variant="whatsapp" size="sm">
                    WhatsApp
                  </Button>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>
      ))}

      <CTABar
        title="Not sure which service is right for you?"
        subtitle="Talk to our team — free consultation · Response within 2 hours on WhatsApp"
      />
    </>
  );
}
