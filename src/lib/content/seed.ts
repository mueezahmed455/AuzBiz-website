import { blogPosts as legacyPosts } from "@/data/blog-posts";
import type { BlogPost, SiteContent, Tour } from "./types";

/**
 * Seed content.
 *
 * Blog articles come from the existing hand-written archive. Tours mirror the
 * package details that are already published on /packages — no new prices,
 * dates, or claims are invented here.
 */

const monthToIso: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

/** "June 2026" -> "2026-06-01" (ordering only; the display date is unchanged). */
function sortDateFromDisplay(display: string): string {
  const [monthName, year] = display.trim().split(/\s+/);
  const month = monthToIso[monthName?.toLowerCase() ?? ""];
  if (!month || !year || !/^\d{4}$/.test(year)) return "2026-01-01";
  return `${year}-${month}-01`;
}

const seedPosts: BlogPost[] = legacyPosts.map((post) => ({
  id: `seed-post-${post.slug}`,
  slug: post.slug,
  category: post.category,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  date: post.date,
  sortDate: sortDateFromDisplay(post.date),
  readTime: post.readTime.replace(/\s*read$/i, "").trim(),
  featured: Boolean(post.featured),
  image: post.image,
  imageAlt: post.image ? post.title : undefined,
  tags: post.tags,
  status: "published",
  author: "AUZBIZ Travel Desk",
  updatedAt: new Date().toISOString(),
}));

const seedTours: Tour[] = [
  {
    id: "seed-tour-uzbekistan",
    slug: "uzbekistan-discovery-tour",
    title: "Uzbekistan Discovery Tour",
    destination: "Tashkent · Samarkand · Bukhara",
    region: "International",
    summary:
      "Eight days across the Silk Road's greatest cities — Registan, Shah-i-Zinda, and the old town of Bukhara.",
    description: [
      "A small-group journey through Uzbekistan's Silk Road heartland, built for travellers who want depth without the rush. The route moves from Tashkent to Samarkand on the high-speed Afrosiyob train, then on to Bukhara.",
      "AUZBIZ handles the e-visa paperwork, airport transfers, intercity transport, and a Urdu/English-speaking guide so the group can focus on the places themselves.",
      "Prices vary by travel dates and group size. Custom departures are available for groups of 10 or more.",
    ],
    departure: "Dates on request",
    duration: "7 nights · 8 days",
    price: "PKR 185,000",
    highlights: [
      "Return airfare Lahore–Tashkent",
      "7 nights in 4-star hotels",
      "Daily breakfast and dinner",
      "Afrosiyob high-speed train to Samarkand",
      "Guided Registan, Shah-i-Zinda and Kalon Mosque visits",
      "Uzbekistan e-visa assistance",
      "Urdu/English-speaking tour guide",
    ],
    gallery: [],
    status: "published",
    featured: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seed-tour-thailand",
    slug: "thailand-dual-city-tour",
    title: "Thailand Dual City Tour",
    destination: "Bangkok · Phuket",
    region: "International",
    summary:
      "Bangkok's temples and markets, then Phuket's coastline — with the domestic flight and island excursion arranged.",
    description: [
      "Seven days split between Bangkok and Phuket. The first half covers the Grand Palace, Wat Pho, and a Chao Phraya river cruise; the second half moves to the Andaman coast for a full-day island excursion.",
      "The package includes return airfare, six nights in 4-star hotels, the Bangkok–Phuket domestic flight, airport transfers, and visa-on-arrival documentation support.",
      "Prices vary by season and group size. A Bali extension is available on request.",
    ],
    departure: "Dates on request",
    duration: "6 nights · 7 days",
    price: "PKR 210,000",
    highlights: [
      "Return airfare Lahore–Bangkok",
      "3 nights Bangkok + 3 nights Phuket",
      "Bangkok → Phuket domestic flight",
      "Phi Phi / James Bond Island boat excursion",
      "Grand Palace and Wat Pho guided tour",
      "Visa on arrival assistance",
      "Halal meals available",
    ],
    gallery: [],
    status: "published",
    featured: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seed-tour-umrah",
    slug: "premium-umrah-package",
    title: "Premium Umrah Package",
    destination: "Makkah · Madinah",
    region: "Umrah",
    summary:
      "Eleven days with Haram-proximity hotels, guided ziyarat, and Umrah visa processing.",
    description: [
      "A fully guided Umrah journey with five nights in Makkah and five nights in Madinah, both in 5-star hotels close to the Haram.",
      "The package covers return airfare, daily breakfast and dinner, intercity transport, ziyarat, Umrah visa processing, and an experienced group guide.",
      "Economy and standard options start from PKR 195,000. Ramadan departures are priced separately.",
    ],
    departure: "Dates on request",
    duration: "10 nights · 11 days",
    price: "PKR 320,000",
    highlights: [
      "Return airfare Lahore–Jeddah",
      "5 nights Haram-proximity hotel in Makkah",
      "5 nights Masjid Nabawi-proximity hotel in Madinah",
      "Daily breakfast and dinner",
      "Guided ziyarat in Makkah and Madinah",
      "Umrah visa processing and documentation support",
      "Airport transfers and WhatsApp support during office hours",
    ],
    gallery: [],
    status: "published",
    featured: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seed-tour-hunza",
    slug: "hunza-valley-tour",
    title: "Hunza Valley Tour",
    destination: "Karimabad · Attabad · Altit",
    region: "Domestic",
    summary:
      "Six days in Pakistan's northern valleys — forts, lakes, and mountain roads, with hotels and transport covered.",
    description: [
      "A five-night domestic departure through Hunza, based in Karimabad. The itinerary includes Altit Fort, Attabad Lake, and a guided mountain tour.",
      "Hotel accommodation and all transport are included. Group discounts are available.",
    ],
    departure: "Dates on request",
    duration: "5 nights · 6 days",
    price: "PKR 55,000",
    highlights: [
      "Karimabad and Altit Fort",
      "Attabad Lake",
      "Hotel accommodation",
      "All transport",
      "Guided mountain tour",
    ],
    gallery: [],
    status: "published",
    featured: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seed-tour-skardu",
    slug: "skardu-deosai-tour",
    title: "Skardu & Deosai Tour",
    destination: "Skardu · Deosai · Satpara",
    region: "Domestic",
    summary:
      "Five nights in Gilgit-Baltistan, including the Deosai Plains and Satpara Lake.",
    description: [
      "A five-night departure covering Skardu, the Deosai Plains, and Satpara Lake. The package includes hotel accommodation and jeep transport.",
      "Group discounts are available on request.",
    ],
    departure: "Dates on request",
    duration: "5 nights · 6 days",
    price: "PKR 65,000",
    highlights: [
      "Shangrila Resort area",
      "Deosai Plains safari",
      "Satpara Lake",
      "Hotel accommodation",
      "Jeep transport",
    ],
    gallery: [],
    status: "published",
    featured: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
  },
];

export const seedContent: SiteContent = {
  version: 1,
  blogPosts: seedPosts,
  tours: seedTours,
  inquiries: [],
  updatedAt: new Date().toISOString(),
};
