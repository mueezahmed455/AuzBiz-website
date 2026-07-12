"use client";

import { useEffect } from "react";

interface PageMetadataProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

const SITE_URL = "https://www.auzbizgroup.com";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

export default function PageMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  noindex,
}: PageMetadataProps) {
  useEffect(() => {
    const setOrCreateMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const removeMeta = (name: string, property = false) => {
      const attr = property ? "property" : "name";
      const el = document.querySelector(`meta[${attr}="${name}"]`);
      if (el) el.remove();
    };

    const setOrCreateLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    const removeLink = (rel: string) => {
      const el = document.querySelector(`link[rel="${rel}"]`);
      if (el) el.remove();
    };

    // Title
    document.title = title;

    // Description
    setOrCreateMeta("description", description);

    // OG Tags
    setOrCreateMeta("og:title", ogTitle || title, true);
    setOrCreateMeta("og:description", ogDescription || description, true);
    setOrCreateMeta("og:image", ogImage || `${SITE_URL}${DEFAULT_OG_IMAGE}`, true);
    setOrCreateMeta("og:url", canonical || window.location.href, true);
    setOrCreateMeta("og:type", "website", true);
    setOrCreateMeta("og:site_name", "AUZBIZ — Dream Beyond Borders", true);

    // Twitter Card
    setOrCreateMeta("twitter:card", "summary_large_image");
    setOrCreateMeta("twitter:title", ogTitle || title);
    setOrCreateMeta("twitter:description", ogDescription || description);
    setOrCreateMeta("twitter:image", ogImage || `${SITE_URL}${DEFAULT_OG_IMAGE}`);

    // Canonical URL
    if (canonical) {
      setOrCreateLink("canonical", canonical);
    } else {
      removeLink("canonical");
    }

    // Robots
    if (noindex) {
      setOrCreateMeta("robots", "noindex, nofollow");
    } else {
      setOrCreateMeta("robots", "index, follow");
    }

    // Keywords (improved)
    const keywords = [
      "AUZBIZ",
      "Dream Beyond Borders",
      "travel agency Lahore",
      "Umrah packages Pakistan",
      "corporate events Lahore",
      "group tours Pakistan",
      "visa services Lahore",
      "study abroad consultancy",
      "air ticketing Pakistan",
      "hotel bookings",
      "MICE events Lahore",
    ];
    setOrCreateMeta("keywords", keywords.join(", "));

    return () => {
      // Cleanup on unmount (optional, but good practice)
    };
  }, [title, description, ogTitle, ogDescription, ogImage, canonical, noindex]);

  return null;
}
