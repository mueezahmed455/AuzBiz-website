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

    const name = clean(body.name, 100);
    const contact = clean(body.contact, 200);

    if (!name || !contact) {
      return NextResponse.json(
        { error: "Name and email/WhatsApp number are required." },
        { status: 400 }
      );
    }

    const subject = `New Newsletter Subscriber: ${name}`.slice(0, 200);
    const text = `
New Newsletter Subscriber
━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Contact: ${contact}

Source: auzbizgroup.com Blog
━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

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
        subject,
        text,
      });
      emailSent = true;
    } catch (emailErr) {
      console.warn("Email send failed:", emailErr instanceof Error ? emailErr.message : "unknown");
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: "You're subscribed! We'll send travel alerts weekly.",
    });
  } catch (err) {
    console.error("Subscribe API error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
