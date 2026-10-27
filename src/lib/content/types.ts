export type PostStatus = "draft" | "published";
export type TourStatus = "draft" | "published";
export type TourRegion = "International" | "Umrah" | "Domestic" | "Corporate";
export type InquiryStatus = "new" | "contacted" | "quoted" | "closed";

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  /** One entry per block. Supports "## Heading", "- bullet" lists and "> quote". */
  content: string[];
  /** Display date, e.g. "June 2026" for legacy posts or "26 October 2026". */
  date: string;
  /** ISO date used only for ordering. */
  sortDate: string;
  readTime: string;
  featured: boolean;
  image?: string;
  imageAlt?: string;
  tags: string[];
  status: PostStatus;
  author: string;
  updatedAt: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  destination: string;
  region: TourRegion;
  summary: string;
  /** One entry per block. Same lightweight formatting as blog posts. */
  description: string[];
  /** Free text so it can hold "Monthly departures" or a specific date. */
  departure: string;
  duration: string;
  /** Free text so it can hold "PKR 185,000" or "On request". */
  price: string;
  groupSize?: string;
  highlights: string[];
  coverImage?: string;
  coverAlt?: string;
  gallery: string[];
  status: TourStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  destination: string;
  travelDates: string;
  groupSize: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface SiteContent {
  version: 1;
  blogPosts: BlogPost[];
  tours: Tour[];
  inquiries: Inquiry[];
  updatedAt: string;
}
