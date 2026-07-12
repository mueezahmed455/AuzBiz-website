import { NextRequest, NextResponse } from "next/server";

const EMAIL_TO = process.env.EMAIL_TO || "auzbizpak@gmail.com";

// ── In-memory rate limiter (per-IP, 1-minute window) ──
const hits = new Map<string, { n: number; reset: number }>();
const LIMIT = 10;
const WINDOW = 60_000;

function limited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now > h.reset) {
    hits.set(ip, { n: 1, reset: now + WINDOW });
    return false;
  }
  h.n++;
  return h.n > LIMIT;
}

// ── Input sanitization ──
// Strips control characters (including \r \n) to prevent email header injection,
// trims whitespace, and enforces max length.
function clean(raw: unknown, max: number): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/[\x00-\x1f\x7f]/g, "").trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate and sanitize all inputs with length caps
    const firstName = clean(body.firstName, 100);
    const lastName = clean(body.lastName, 100);
    const phone = clean(body.phone, 30);
    const email = clean(body.email, 200);
    const service = clean(body.service, 100);
    const destination = clean(body.destination, 200);
    const travelDates = clean(body.travelDates, 100);
    const groupSize = clean(body.groupSize, 50);
    const message = clean(body.message, 2000);

    if (!firstName || !phone) {
      return NextResponse.json(
        { error: "First name and phone number are required." },
        { status: 400 }
      );
    }

    // Build email content — all values already sanitized (no control chars)
    const subject = `New Inquiry from ${firstName} ${lastName} - ${service || "General"}`.slice(0, 200);
    const text = `
New Inquiry via AUZBIZ Website
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact Information:
  Name: ${firstName} ${lastName}
  Phone: ${phone}
  Email: ${email || "Not provided"}

Inquiry Details:
  Service: ${service || "Not specified"}
  Destination: ${destination || "Not specified"}
  Travel Dates: ${travelDates || "Not specified"}
  Group Size: ${groupSize || "Not specified"}

Message:
${message || "No message provided"}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from auzbizgroup.com
    `.trim();

    // Try to send email if nodemailer is configured
    let emailSent = false;
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"AUZBIZ Website" <${process.env.EMAIL_USER || "noreply@auzbizgroup.com"}>`,
        to: EMAIL_TO,
        replyTo: email || phone,
        subject,
        text,
      });
      emailSent = true;
    } catch (emailErr) {
      // Log message only — never log credentials or full error objects
      console.warn("Email send failed:", emailErr instanceof Error ? emailErr.message : "unknown");
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: "Inquiry received successfully! We will respond via WhatsApp within 2 hours.",
    });
  } catch (err) {
    console.error("Inquiry API error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or WhatsApp us directly." },
      { status: 500 }
    );
  }
}
