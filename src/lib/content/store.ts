import fs from "node:fs/promises";
import path from "node:path";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { get, put } from "@vercel/blob";
import { seedContent } from "./seed";
import type { BlogPost, Inquiry, SiteContent, Tour } from "./types";

const BLOB_PATHNAME = "auzbiz/site-content.json";
const ENCRYPTED_PREFIX = "AUZBIZ1:";
const LOCAL_DIR = path.join(process.cwd(), ".data");
const LOCAL_FILE = path.join(LOCAL_DIR, "content.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export class StorageConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageConfigurationError";
  }
}

export type StorageMode = "blob" | "local" | "unconfigured";

export function getStorageMode(): StorageMode {
  if (process.env.BLOB_READ_WRITE_TOKEN) return "blob";
  if (process.env.VERCEL) return "unconfigured";
  return "local";
}

function cloneSeed(): SiteContent {
  return JSON.parse(JSON.stringify(seedContent)) as SiteContent;
}

/** Fill fields added after a content file was first written. */
function normalise(raw: SiteContent): SiteContent {
  return {
    version: 1,
    blogPosts: Array.isArray(raw.blogPosts) ? raw.blogPosts : [],
    tours: Array.isArray(raw.tours) ? raw.tours : [],
    inquiries: Array.isArray(raw.inquiries) ? raw.inquiries : [],
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  };
}

async function readLocal(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return normalise(JSON.parse(raw) as SiteContent);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/**
 * Vercel Blob URLs are public. The content file includes inquiries, so the
 * payload is encrypted before it leaves the server. The key is derived from
 * ADMIN_SESSION_SECRET, which must stay stable for existing content to remain
 * readable.
 */
function contentKey(): Buffer {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new StorageConfigurationError(
      "ADMIN_SESSION_SECRET is required to encrypt content stored in Vercel Blob.",
    );
  }
  return createHash("sha256").update(`auzbiz-content:${secret}`).digest();
}

function encryptContent(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", contentKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${ENCRYPTED_PREFIX}${iv.toString("base64url")}.${tag.toString("base64url")}.${ciphertext.toString("base64url")}`;
}

function decryptContent(payload: string): string {
  // Accept an unencrypted file written by an earlier build so a deployment
  // can upgrade in place; the next save writes the encrypted format.
  if (!payload.startsWith(ENCRYPTED_PREFIX)) return payload;

  const [ivRaw, tagRaw, ciphertextRaw] = payload.slice(ENCRYPTED_PREFIX.length).split(".");
  if (!ivRaw || !tagRaw || !ciphertextRaw) {
    throw new Error("The stored content file is encrypted but malformed.");
  }

  const decipher = createDecipheriv(
    "aes-256-gcm",
    contentKey(),
    Buffer.from(ivRaw, "base64url"),
  );
  decipher.setAuthTag(Buffer.from(tagRaw, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertextRaw, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

async function readBlob(): Promise<SiteContent | null> {
  // useCache: false makes an edit visible immediately after it is saved.
  const result = await get(BLOB_PATHNAME, { access: "public", useCache: false });
  if (!result || result.statusCode !== 200) return null;

  const payload = await new Response(result.stream).text();
  return normalise(JSON.parse(decryptContent(payload)) as SiteContent);
}

export async function getContent(): Promise<SiteContent> {
  const mode = getStorageMode();
  if (mode === "unconfigured") {
    throw new StorageConfigurationError(
      "Content storage is not configured for this deployment. Connect a Vercel Blob store and set BLOB_READ_WRITE_TOKEN.",
    );
  }

  const stored = mode === "blob" ? await readBlob() : await readLocal();
  return stored ?? cloneSeed();
}

/**
 * Public pages should stay online even if the content store is temporarily
 * unreachable. Admin pages use getContent() so problems are visible.
 */
export async function getContentSafe(): Promise<SiteContent> {
  try {
    return await getContent();
  } catch (error) {
    console.error("Content store unavailable, serving seed content:", error);
    return cloneSeed();
  }
}

async function persist(content: SiteContent): Promise<void> {
  const mode = getStorageMode();
  if (mode === "unconfigured") {
    throw new StorageConfigurationError(
      "Saving is disabled because this deployment has no persistent content store. Connect a Vercel Blob store and set BLOB_READ_WRITE_TOKEN.",
    );
  }

  if (mode === "blob") {
    await put(BLOB_PATHNAME, encryptContent(JSON.stringify(content, null, 2)), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      // Deliberately not application/json: the payload is ciphertext.
      contentType: "application/octet-stream",
      cacheControlMaxAge: 60,
    });
    return;
  }

  await fs.mkdir(LOCAL_DIR, { recursive: true });
  const temp = `${LOCAL_FILE}.${process.pid}.tmp`;
  await fs.writeFile(temp, JSON.stringify(content, null, 2), "utf8");
  await fs.rename(temp, LOCAL_FILE);
}

// Serialise writes inside this process so two rapid saves cannot clobber
// each other. A single-editor admin is the expected usage.
let writeQueue: Promise<unknown> = Promise.resolve();

export async function updateContent(
  mutate: (draft: SiteContent) => void,
): Promise<SiteContent> {
  const run = writeQueue.then(async () => {
    const current = await getContent();
    const draft = JSON.parse(JSON.stringify(current)) as SiteContent;
    mutate(draft);
    draft.updatedAt = new Date().toISOString();
    await persist(draft);
    return draft;
  });

  writeQueue = run.catch(() => undefined);
  return run;
}

// ── Reads ────────────────────────────────────────────────────────────────────

export function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const content = await getContentSafe();
  return sortPosts(content.blogPosts.filter((post) => post.status === "published"));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getRelatedPosts(
  slug: string,
  category: string,
  limit = 3,
): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.category === category,
  );
  const others = posts.filter(
    (post) => post.slug !== slug && post.category !== category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export async function getPublishedTours(): Promise<Tour[]> {
  const content = await getContentSafe();
  return content.tours.filter((tour) => tour.status === "published");
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  const tours = await getPublishedTours();
  return tours.find((tour) => tour.slug === slug);
}

// ── Inquiries ────────────────────────────────────────────────────────────────

export async function addInquiry(
  inquiry: Omit<Inquiry, "id" | "status" | "createdAt">,
): Promise<Inquiry> {
  let created: Inquiry | undefined;

  await updateContent((draft) => {
    created = {
      ...inquiry,
      id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    draft.inquiries.unshift(created);
    // Keep the dashboard fast; the archive lives in email.
    draft.inquiries = draft.inquiries.slice(0, 500);
  });

  if (!created) {
    throw new Error("The inquiry could not be created.");
  }
  return created;
}

// ── Image uploads ────────────────────────────────────────────────────────────

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export async function saveImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES[file.type]) {
    throw new Error("Only JPG, PNG, WebP, AVIF, or GIF images are allowed.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Images must be smaller than 8 MB.");
  }

  const extension = ALLOWED_TYPES[file.type];
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60) || "image";
  const filename = `${base}-${Date.now()}.${extension}`;
  const mode = getStorageMode();

  if (mode === "unconfigured") {
    throw new StorageConfigurationError(
      "Image uploads need persistent storage. Connect a Vercel Blob store and set BLOB_READ_WRITE_TOKEN.",
    );
  }

  if (mode === "blob") {
    const blob = await put(`auzbiz/uploads/${filename}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });
    return blob.url;
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  // Served by /api/uploads/[name] rather than /uploads/... because Next's
  // production server does not pick up files added to public/ after boot.
  return `/api/uploads/${filename}`;
}

export function localUploadPath(filename: string): string {
  // basename() prevents path traversal from the request URL.
  return path.join(UPLOAD_DIR, path.basename(filename));
}
