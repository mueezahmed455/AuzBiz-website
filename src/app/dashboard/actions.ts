"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, createSession, destroySession, verifyPassword, isAdminConfigured } from "@/lib/auth";
import { updateContent } from "@/lib/content/store";
import type { BlogPost, InquiryStatus, Tour, TourRegion } from "@/lib/content/types";

export type LoginState = { error?: string };
export type FormState = { error?: string };

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function uniqueSlug(base: string, existing: string[]): string {
  const root = base || `item-${Date.now()}`;
  if (!existing.includes(root)) return root;

  let counter = 2;
  while (existing.includes(`${root}-${counter}`)) counter += 1;
  return `${root}-${counter}`;
}

function parseBlocks(value: string): string[] {
  return value
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function parseLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function parseGallery(value: string): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0).slice(0, 40);
  } catch {
    return [];
  }
}

function displayDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readTimeFor(blocks: string[]): string {
  const words = blocks.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function touchPublicPages(): void {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/group-tours");
  revalidatePath("/dashboard");
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export async function loginAction(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return {
      error:
        "Admin access is not configured yet. Add ADMIN_PASSWORD to .env.local (or your Vercel environment variables).",
    };
  }

  const password = text(formData, "password");
  if (!password) return { error: "Enter your admin password." };
  if (!verifyPassword(password)) return { error: "That password is not correct." };

  await createSession();
  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export async function savePostAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const excerpt = text(formData, "excerpt");
  const category = text(formData, "category") || "Travel Guide";
  const contentText = text(formData, "content");
  const blocks = parseBlocks(contentText);
  const dateInput = text(formData, "date");
  const sortDate = /^\d{4}-\d{2}-\d{2}$/.test(dateInput)
    ? dateInput
    : new Date().toISOString().slice(0, 10);
  const requestedSlug = text(formData, "slug") || title;
  const image = text(formData, "image");
  const imageAlt = text(formData, "imageAlt");
  const author = text(formData, "author") || "AUZBIZ Travel Desk";

  if (!title) return { error: "A title is required." };
  if (title.length > 140) return { error: "Keep the title under 140 characters." };
  if (!excerpt) return { error: "A short excerpt is required — it appears on the blog cards." };
  if (excerpt.length > 320) return { error: "Keep the excerpt under 320 characters." };
  if (blocks.length === 0) return { error: "Add at least one paragraph of content." };
  if (!slugify(requestedSlug)) return { error: "Add a slug using letters or numbers." };

  const status = text(formData, "status") === "published" ? "published" : "draft";
  const featured = bool(formData, "featured");
  const tags = parseTags(text(formData, "tags"));
  const now = new Date().toISOString();

  await updateContent((draft) => {
    const others = draft.blogPosts.filter((post) => post.id !== id);
    const slug = uniqueSlug(
      slugify(requestedSlug),
      others.map((post) => post.slug),
    );

    const entry: BlogPost = {
      id: id || `post-${Date.now()}`,
      slug,
      title,
      excerpt,
      category,
      content: blocks,
      date: displayDate(sortDate),
      sortDate,
      readTime: readTimeFor(blocks),
      featured,
      image: image || undefined,
      imageAlt: image ? imageAlt || title : undefined,
      tags,
      status,
      author,
      updatedAt: now,
    };

    const index = draft.blogPosts.findIndex((post) => post.id === id);
    if (index >= 0) draft.blogPosts[index] = entry;
    else draft.blogPosts.unshift(entry);
  });

  touchPublicPages();
  redirect(`/dashboard/blog?saved=${id ? "updated" : "created"}`);
}

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;

  await updateContent((draft) => {
    draft.blogPosts = draft.blogPosts.filter((post) => post.id !== id);
  });

  touchPublicPages();
  redirect("/dashboard/blog?deleted=1");
}

export async function togglePostStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;

  await updateContent((draft) => {
    const post = draft.blogPosts.find((entry) => entry.id === id);
    if (post) {
      post.status = post.status === "published" ? "draft" : "published";
      post.updatedAt = new Date().toISOString();
    }
  });

  touchPublicPages();
  redirect("/dashboard/blog");
}

// ── Tours ────────────────────────────────────────────────────────────────────

const REGIONS: TourRegion[] = ["International", "Umrah", "Domestic", "Corporate"];

export async function saveTourAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const destination = text(formData, "destination");
  const summary = text(formData, "summary");
  const descriptionText = text(formData, "description");
  const description = parseBlocks(descriptionText);
  const regionRaw = text(formData, "region");
  const region = (REGIONS.includes(regionRaw as TourRegion) ? regionRaw : "International") as TourRegion;
  const departure = text(formData, "departure") || "Dates on request";
  const duration = text(formData, "duration");
  const price = text(formData, "price") || "On request";
  const groupSize = text(formData, "groupSize");
  const highlights = parseLines(text(formData, "highlights"));
  const coverImage = text(formData, "coverImage");
  const coverAlt = text(formData, "coverAlt");
  const gallery = parseGallery(text(formData, "gallery"));
  const status = text(formData, "status") === "published" ? "published" : "draft";
  const featured = bool(formData, "featured");
  const requestedSlug = text(formData, "slug") || title;
  const now = new Date().toISOString();

  if (!title) return { error: "A tour title is required." };
  if (!destination) return { error: "Add the destination or cities covered." };
  if (!summary) return { error: "Add a one-line summary for the tour card." };
  if (summary.length > 240) return { error: "Keep the summary under 240 characters." };
  if (!duration) return { error: "Add the duration, e.g. “7 nights · 8 days”." };
  if (!slugify(requestedSlug)) return { error: "Add a slug using letters or numbers." };

  await updateContent((draft) => {
    const existing = draft.tours.find((tour) => tour.id === id);
    const others = draft.tours.filter((tour) => tour.id !== id);
    const slug = uniqueSlug(
      slugify(requestedSlug),
      others.map((tour) => tour.slug),
    );

    const entry: Tour = {
      id: id || `tour-${Date.now()}`,
      slug,
      title,
      destination,
      region,
      summary,
      description: description.length > 0 ? description : [summary],
      departure,
      duration,
      price,
      groupSize: groupSize || undefined,
      highlights,
      coverImage: coverImage || undefined,
      coverAlt: coverImage ? coverAlt || title : undefined,
      gallery,
      status,
      featured,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    const index = draft.tours.findIndex((tour) => tour.id === id);
    if (index >= 0) draft.tours[index] = entry;
    else draft.tours.unshift(entry);
  });

  touchPublicPages();
  redirect(`/dashboard/tours?saved=${id ? "updated" : "created"}`);
}

export async function deleteTourAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;

  await updateContent((draft) => {
    draft.tours = draft.tours.filter((tour) => tour.id !== id);
  });

  touchPublicPages();
  redirect("/dashboard/tours?deleted=1");
}

export async function toggleTourStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;

  await updateContent((draft) => {
    const tour = draft.tours.find((entry) => entry.id === id);
    if (tour) {
      tour.status = tour.status === "published" ? "draft" : "published";
      tour.updatedAt = new Date().toISOString();
    }
  });

  touchPublicPages();
  redirect("/dashboard/tours");
}

// ── Inquiries ────────────────────────────────────────────────────────────────

const INQUIRY_STATUSES: InquiryStatus[] = ["new", "contacted", "quoted", "closed"];

export async function updateInquiryStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = text(formData, "id");
  const statusRaw = text(formData, "status");
  if (!id || !INQUIRY_STATUSES.includes(statusRaw as InquiryStatus)) return;

  await updateContent((draft) => {
    const inquiry = draft.inquiries.find((entry) => entry.id === id);
    if (inquiry) inquiry.status = statusRaw as InquiryStatus;
  });

  revalidatePath("/dashboard/inquiries");
  revalidatePath("/dashboard");
  redirect("/dashboard/inquiries");
}
