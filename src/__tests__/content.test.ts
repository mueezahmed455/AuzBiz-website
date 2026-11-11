import { seedContent } from "@/lib/content/seed";
import type { BlogPost, Tour } from "@/lib/content/types";
import { visas } from "@/data/visas";

describe("seed blog posts", () => {
  const posts = seedContent.blogPosts;

  test("the seed ships content to render", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  test("slugs are unique and URL-safe", () => {
    const slugs = posts.map((p: BlogPost) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  test("every post has required display metadata", () => {
    for (const post of posts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.excerpt.length).toBeGreaterThan(0);
      expect(post.content.filter(Boolean).length).toBeGreaterThan(0);
      expect(post.date.length).toBeGreaterThan(0);
      expect(post.author.length).toBeGreaterThan(0);
      expect(post.tags.length).toBeGreaterThan(0);
      expect(["draft", "published"]).toContain(post.status);
    }
  });
});

describe("seed tours", () => {
  const tours = seedContent.tours;

  test("slugs are unique and URL-safe", () => {
    const slugs = tours.map((t: Tour) => t.slug);
    // The seed may ship zero tours; uniqueness only applies to what exists.
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  test("every tour has required display metadata and a valid region", () => {
    for (const tour of tours) {
      expect(tour.title.length).toBeGreaterThan(0);
      expect(tour.summary.length).toBeGreaterThan(0);
      expect(tour.description.filter(Boolean).length).toBeGreaterThan(0);
      expect(tour.price.length).toBeGreaterThan(0);
      expect(["International", "Umrah", "Domestic", "Corporate"]).toContain(tour.region);
      expect(["draft", "published"]).toContain(tour.status);
      expect(Array.isArray(tour.gallery)).toBe(true);
    }
  });
});

describe("visa catalogue", () => {
  test("ids are unique and required fields are present", () => {
    const ids = visas.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const visa of visas) {
      expect(visa.country.length).toBeGreaterThan(0);
      expect(visa.priceFrom.length).toBeGreaterThan(0);
      expect(visa.processing.length).toBeGreaterThan(0);
      expect(visa.documents.length).toBeGreaterThan(0);
    }
  });
});
