import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "auzbiz_admin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

function sign(value: string): string {
  const secret = sessionSecret();
  if (!secret) throw new Error("Admin session secret is not configured.");
  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  // Hash both sides so the comparison is always fixed-length and constant-time.
  const given = createHash("sha256").update(input).digest("hex");
  const wanted = createHash("sha256").update(expected).digest("hex");
  return safeEqual(given, wanted);
}

export async function createSession(): Promise<void> {
  const expires = Date.now() + SESSION_MS;
  const token = `${expires}.${sign(String(expires))}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_MS / 1000),
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  // Always touch cookies first. If this runs before cookies() it can be
  // evaluated during the build and the resulting redirect gets baked into a
  // static page, locking every staff member out in production.
  const store = await cookies();
  if (!sessionSecret()) return false;

  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return false;

  const [expiresRaw, signature] = raw.split(".");
  if (!expiresRaw || !signature) return false;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;

  try {
    return safeEqual(sign(expiresRaw), signature);
  } catch {
    return false;
  }
}

/** Use inside dashboard pages/layouts to send signed-out visitors to login. */
export async function requireAdminPage(): Promise<void> {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

/** Use inside server actions and route handlers. Throws instead of redirecting. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized. Sign in again to continue.");
  }
}
