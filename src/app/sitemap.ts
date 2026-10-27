import type { MetadataRoute } from "next";
import { getContentSafe, sortPosts } from "@/lib/content/store";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.auzbizgroup.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContentSafe();
  const posts = sortPosts(
    content.blogPosts.filter((post) => post.status === "published"),
  );
  const tours = content.tours.filter((tour) => tour.status === "published");
  const newestContent = [
    content.updatedAt,
    ...posts.map((post) => post.updatedAt),
    ...tours.map((tour) => tour.updatedAt),
  ]
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: BASE_URL, changeFrequency: "daily", priority: 1 },
      { url: `${BASE_URL}/group-tours`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${BASE_URL}/visas`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${BASE_URL}/ticket-analysis`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${BASE_URL}/about`, changeFrequency: "yearly", priority: 0.6 },
      { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
      { url: `${BASE_URL}/live-tracking`, changeFrequency: "monthly", priority: 0.5 },
      { url: `${BASE_URL}/plane-tracking`, changeFrequency: "monthly", priority: 0.5 },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) =>
    newestContent ? { ...route, lastModified: newestContent } : route,
  );

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${BASE_URL}/group-tours/${tour.slug}`,
    lastModified: new Date(tour.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...tourRoutes, ...postRoutes];
}
