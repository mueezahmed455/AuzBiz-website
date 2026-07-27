"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, X, Calendar, Search } from "lucide-react";
import { FadeInView, StaggerChildren, StaggerItem } from "@/components/ui";
import TiltCard from "@/components/TiltCard";
import HeroParticles from "@/components/HeroParticles";
import CTABar from "@/components/CTABar";
import PageMetadata from "@/components/PageMetadata";

interface DayItem {
  day: string;
  title: string;
  desc: string;
}

interface FeaturedPackage {
  id: string;
  flag: string;
  destination: string;
  tagline: string;
  price: string;
  tags: string[];
  includesYes: string[];
  includesNo: string[];
  itinerary: DayItem[];
  note: string;
  category: "international" | "umrah" | "domestic" | "corporate";
}

const featuredPackages: FeaturedPackage[] = [
  {
    id: "uzbekistan",
    category: "international",
    flag: "UZBEKISTAN · CENTRAL ASIA",
    destination: "Uzbekistan Discovery Tour",
    tagline: '"Where the Silk Road meets the soul"',
    price: "PKR 185,000",
    tags: ["7 Nights · 8 Days", "Tashkent · Samarkand · Bukhara", "Halal Food", "4-Star Hotels", "Visa Assistance", "Group Discount Available"],
    includesYes: [
      "Return airfare Lahore–Tashkent",
      "7 nights 4-star hotel accommodation",
      "Daily breakfast and dinner",
      "Airport transfers & intercity transport",
      "Guided tours: Registan, Shah-i-Zinda, Kalon Mosque",
      "Uzbekistan e-visa assistance",
      "Urdu/English-speaking tour guide",
      "24/7 AUZBIZ WhatsApp support",
    ],
    includesNo: ["Personal shopping expenses", "Travel insurance (recommended)"],
    itinerary: [
      { day: "D1", title: "Lahore → Tashkent", desc: "Departure, arrival, hotel check-in, welcome dinner." },
      { day: "D2", title: "Tashkent city tour", desc: "Khast Imam, Chorsu Bazaar, Independence Square, subway tour." },
      { day: "D3", title: "Tashkent → Samarkand", desc: "High-speed Afrosiyob train, Registan Square, Bibi-Khanym Mosque." },
      { day: "D4", title: "Samarkand deep dive", desc: "Gur-e-Amir, Shah-i-Zinda necropolis, Siab Bazaar." },
      { day: "D5", title: "Samarkand → Bukhara", desc: "Ark Fortress, Kalon Minaret, Lyabi-Hauz complex." },
      { day: "D6–7", title: "Bukhara exploration", desc: "Shopping, optional excursions, traditional Uzbek cuisine." },
      { day: "D8", title: "Return to Lahore", desc: "Transfer to Tashkent airport, flight home, safe arrival." },
    ],
    note: "Prices vary by travel dates & group size. Custom packages available for groups of 10+.",
  },
  {
    id: "thailand",
    category: "international",
    flag: "THAILAND · SOUTHEAST ASIA",
    destination: "Thailand Dual City Tour",
    tagline: '"Bangkok brilliance meets Phuket paradise"',
    price: "PKR 210,000",
    tags: ["6 Nights · 7 Days", "Bangkok · Phuket", "Island Excursion", "4-Star Hotels", "Visa on Arrival", "Halal Meals Available"],
    includesYes: [
      "Return airfare Lahore–Bangkok",
      "6 nights 4-star hotel (3 Bangkok + 3 Phuket)",
      "Daily breakfast included",
      "Bangkok → Phuket domestic flight",
      "Phi Phi / James Bond Island boat excursion",
      "Airport transfers and city transport",
      "Guided Bangkok city tour: Grand Palace, Wat Pho",
      "Visa on arrival assistance & documentation",
    ],
    includesNo: ["Lunches, dinners (own expense)", "Optional activities & personal expenses"],
    itinerary: [
      { day: "D1", title: "Lahore → Bangkok", desc: "Arrival, hotel check-in, Khao San Road evening walk." },
      { day: "D2", title: "Bangkok temples & culture", desc: "Grand Palace, Wat Pho, Chao Phraya river cruise." },
      { day: "D3", title: "Bangkok — free day", desc: "Shopping at MBK, Siam Paragon, optional floating market." },
      { day: "D4", title: "Bangkok → Phuket", desc: "Morning flight, beach hotel check-in, Patong Beach sunset." },
      { day: "D5", title: "Island excursion", desc: "Full-day Phi Phi or James Bond Island speedboat tour." },
      { day: "D6", title: "Phuket — beach & leisure", desc: "Big Buddha, Old Phuket Town, Promthep Cape sunset." },
      { day: "D7", title: "Return to Lahore", desc: "Transfer to airport, departure, arrival Lahore." },
    ],
    note: "Prices vary by season & group size. Bali extension available on request.",
  },
  {
    id: "umrah",
    category: "umrah",
    flag: "UMRAH · MAKKAH & MADINAH",
    destination: "Premium Umrah Package",
    tagline: '"Every step of your sacred journey, handled with care"',
    price: "PKR 320,000",
    tags: ["10 Nights · 11 Days", "Makkah · Madinah", "5-Star Haram-View Hotel", "MOFA Compliant", "Guided Ziyarat", "Ramadan Packages Available"],
    includesYes: [
      "Return airfare Lahore (LHE) to Jeddah",
      "5 nights 5-star Haram-proximity hotel, Makkah",
      "5 nights 5-star Masjid Nabawi-proximity hotel, Madinah",
      "Daily breakfast and dinner included",
      "Makkah → Madinah intercity transport",
      "Ziyarat: Jabal Noor, Jabal Thawr, Masjid Quba",
      "Umrah visa processing (MOFA verified)",
      "Experienced Umrah group guide",
      "Airport transfers Jeddah / Madinah",
      "24/7 WhatsApp support throughout",
    ],
    includesNo: [],
    itinerary: [
      { day: "D1", title: "Lahore → Makkah", desc: "Arrival, Ihram, proceed to Masjid al-Haram." },
      { day: "D2–3", title: "Ibadah in Makkah", desc: "Nafl prayers, Quran recitation, repeated Tawaf." },
      { day: "D4", title: "Makkah Ziyarat", desc: "Jabal Noor, Jabal Thawr, Masjid al-Jinn." },
      { day: "D5", title: "Makkah → Madinah", desc: "Coach to Madinah, hotel check-in, Masjid Nabawi visit." },
      { day: "D6–8", title: "Ibadah in Madinah", desc: "Prayers at Roza-e-Rasool (PBUH), Riyadh ul-Jannah." },
      { day: "D9", title: "Madinah Ziyarat", desc: "Masjid Quba, Masjid Qiblatayn, Uhud, dates market." },
      { day: "D10–11", title: "Departure → Lahore", desc: "Final prayers, airport transfer, safe return home." },
    ],
    note: "Economy & standard options from PKR 195,000. Ramadan packages priced separately.",
  },
];

const domesticTours = [
  {
    dest: "Murree & Galliyat",
    dur: "2 Nights · 3 Days",
    price: "PKR 28,000",
    features: ["3-star hotel stay", "Ayubia & Nathiagali", "Transport included", "Group discounts"],
  },
  {
    dest: "Hunza Valley",
    dur: "5 Nights · 6 Days",
    price: "PKR 55,000",
    features: ["Karimabad & Altit Fort", "Attabad Lake cruise", "Hotel + all transport", "Guided mountain tour"],
  },
  {
    dest: "Skardu & Deosai",
    dur: "5 Nights · 6 Days",
    price: "PKR 65,000",
    features: ["Shangrila Resort area", "Deosai Plains safari", "Satpara Lake visit", "Hotel + jeep transport"],
  },
  {
    dest: "Swat & Kalam",
    dur: "3 Nights · 4 Days",
    price: "PKR 35,000",
    features: ["Malam Jabba & Madyan", "Mahodand Lake trip", "Hotel + transport", "Group discounts avail."],
  },
];

const filterOptions = [
  { key: "all", label: "All Packages" },
  { key: "international", label: "International" },
  { key: "umrah", label: "Umrah" },
  { key: "domestic", label: "Domestic" },
  { key: "corporate", label: "Corporate" },
];

export default function PackagesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPackages = useMemo(() => {
    return featuredPackages.filter((pkg) => {
      const matchesFilter = activeFilter === "all" || pkg.category === activeFilter;
      const matchesSearch = !searchQuery || 
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.flag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const filteredDomestic = useMemo(() => {
    const showDomestic = activeFilter === "all" || activeFilter === "domestic";
    if (!showDomestic) return [];
    return domesticTours.filter((tour) =>
      !searchQuery || tour.dest.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeFilter, searchQuery]);

  return (
    <>
      <PageMetadata
        title="Travel Packages — Umrah, International & Domestic Tours | AUZBIZ"
        description="Explore AUZBIZ's handcrafted travel packages: Uzbekistan from PKR 185K, Thailand from PKR 210K, Umrah from PKR 320K, and domestic tours from PKR 28K. Halal-friendly, all-inclusive, and expertly guided."
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
              Travel Packages — Curated for Pakistani Travellers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-3">
              Uzbekistan, Thailand, Umrah & More
              <span className="block text-gold-500">— Packages From Lahore.</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
              Every AUZBIZ package is thoughtfully designed — halal-friendly, value-for-money,
              and delivered with end-to-end care. Choose your destination, and let us handle
              everything else.
            </p>
          </FadeInView>
        </div>
        <div className="h-1 bg-gold-500" />
      </section>

      {/* Filter bar */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-wrap gap-2 items-center">
            {filterOptions.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`text-xs px-3.5 py-2 rounded-full border font-medium transition-colors ${
                  activeFilter === f.key
                    ? "bg-navy-800 text-gold-500 border-navy-800"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gold-500 hover:text-gold-500"
                }`}
              >
                {f.label}
              </button>
            ))}
            {/* Search input */}
            <div className="relative ml-auto hidden sm:block">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 w-48"
              />
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
          {/* Mobile search */}
          <div className="relative mt-2 sm:hidden">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20"
            />
          </div>
        </div>
      </section>

      {/* No results */}
      {filteredPackages.length === 0 && filteredDomestic.length === 0 && (
        <section className="py-14 text-center">
          <Search size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="text-sm text-gray-500 mb-2">No packages found for "{searchQuery}"</p>
          <button onClick={() => { setActiveFilter("all"); setSearchQuery(""); }} className="text-xs text-gold-500 hover:underline">
            Clear all filters
          </button>
        </section>
      )}

      {/* Featured packages */}
      {filteredPackages.map((pkg, pkgIdx) => (
        <section key={pkg.id} className={`py-14 transition-colors duration-400 ${pkgIdx % 2 === 1 ? "bg-[#F9F9FB] dark:bg-[#12122a]" : ""}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInView>
              <span className="text-xs font-semibold text-gold-500 uppercase tracking-wider block mb-2">
                Featured Package {String(pkgIdx + 1).padStart(2, "0")}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-2">
                {pkg.destination.split(" ").slice(0, -1).join(" ")} —{" "}
                {pkg.destination.split(" ").slice(-1)}
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                {pkgIdx === 0 && "Step into the ancient heart of Central Asia. Samarkand, Bukhara, and Tashkent offer a breathtaking blend of Islamic heritage, Timurid architecture, and warm Central Asian hospitality."}
                {pkgIdx === 1 && "From Bangkok's glittering temples and street food paradise to Phuket's turquoise waters and white sand beaches — Thailand delivers an unmatched mix of culture, cuisine, and coastal beauty."}
                {pkgIdx === 2 && "AUZBIZ approaches Umrah with the reverence it deserves. Our packages minimise logistics and maximise your time in worship — with verified, MOFA-compliant arrangements."}
              </p>
            </FadeInView>

            <FadeInView delay={0.1}>
              <div className="mt-8 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                {/* Banner */}
                <div className="bg-navy-800 px-6 sm:px-8 py-7 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <span className="text-gold-500 text-[10px] font-semibold tracking-[0.2em] uppercase block mb-1.5">
                      {pkg.flag}
                    </span>
                    <h3 className="text-white font-bold text-xl mb-1">{pkg.destination}</h3>
                    <p className="text-white/50 text-xs italic">{pkg.tagline}</p>
                  </div>
                  <div className="text-right sm:text-right">
                    <span className="text-gold-500/60 text-[10px] uppercase tracking-wider">Starting From</span>
                    <div className="text-gold-500 text-3xl font-bold">{pkg.price}</div>
                    <span className="text-white/40 text-[10px]">per person · twin sharing</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="px-6 sm:px-8 py-4 flex gap-2 flex-wrap border-b border-gray-50">
                  {pkg.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-full text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                  {/* Inclusions */}
                  <div className="p-6 sm:p-7">
                    <h4 className="text-xs font-semibold text-navy-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Check size={14} stroke="#D4AF37" strokeWidth={2} />
                      Package inclusions
                    </h4>
                    <ul className="space-y-2.5">
                      {pkg.includesYes.map((inc) => (
                        <li key={inc} className="text-sm text-gray-500 flex items-start gap-2.5">
                          <Check size={13} stroke="#1D9E75" strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />
                          {inc}
                        </li>
                      ))}
                      {pkg.includesNo.map((inc) => (
                        <li key={inc} className="text-sm text-gray-400 flex items-start gap-2.5 line-through decoration-gray-300">
                          <X size={13} stroke="#E24B4A" strokeWidth={2} className="mt-0.5 flex-shrink-0" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Itinerary */}
                  <div className="p-6 sm:p-7">
                    <h4 className="text-xs font-semibold text-navy-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Calendar size={14} stroke="#D4AF37" strokeWidth={2} />
                      Sample itinerary
                    </h4>
                    <div className="space-y-3.5">
                      {pkg.itinerary.map((item) => (
                        <div key={item.day} className="flex gap-3 items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                          <div className="w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center flex-shrink-0 text-gold-500 text-[10px] font-bold">
                            {item.day}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy-800">{item.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 sm:px-7 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">{pkg.note}</p>
                  <div className="flex gap-2.5">
                    <Link
                      href="/contact"
                      className="bg-gold-500 text-navy-800 text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-400 transition-colors"
                    >
                      Book This Package
                    </Link>
                    <Link
                      href={`https://wa.me/923464993122?text=Hi%20AUZBIZ!%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.destination)}%20package.%20Please%20share%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-1.5"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </section>
      ))}

      {/* Domestic tours */}
      {filteredDomestic.length > 0 && (
        <section className="py-14 bg-[#F9F9FB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInView>
              <span className="text-xs font-semibold text-gold-500 uppercase tracking-wider block mb-2">
                Domestic Tours — Explore Pakistan
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-2">
                Discover the beauty in your own backyard
              </h2>
              <p className="text-sm text-gray-500 max-w-xl mb-8">
                Pakistan is home to some of the world&apos;s most dramatic landscapes. AUZBIZ domestic
                tour packages are ideal for quick getaways, corporate retreats, and groups.
              </p>
            </FadeInView>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredDomestic.map((tour) => (
                <StaggerItem key={tour.dest}>
                  <TiltCard tiltAmount={4} scale={1.02}>
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gold-500/30 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="bg-navy-800 px-5 py-4">
                      <h3 className="text-gold-500 font-bold text-sm mb-0.5">{tour.dest}</h3>
                      <p className="text-white/50 text-[11px]">{tour.dur}</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-lg font-bold text-navy-800 mb-1">
                        {tour.price}{" "}
                        <span className="text-[10px] text-gray-400 font-normal">/ person</span>
                      </p>
                      <ul className="space-y-1.5 mb-4">
                        {tour.features.map((f) => (
                          <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
                            <Check size={11} stroke="#1D9E75" strokeWidth={2.5} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className="text-xs font-semibold text-navy-800 hover:text-gold-500 transition-colors"
                      >
                        Enquire Now →
                      </Link>
                    </div>                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      <CTABar
        title="Need a custom package? We build bespoke itineraries too."
        subtitle="Tell us your destination, dates, group size & budget — we'll design it for you."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
