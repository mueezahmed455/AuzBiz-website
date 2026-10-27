import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck, Image as ImageIcon, Newspaper, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import LoginForm from "@/components/admin/LoginForm";
import { isAdminConfigured, isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Staff sign in",
  robots: { index: false, follow: false },
};

const points = [
  {
    icon: Newspaper,
    title: "Publish travel guides",
    body: "Write, edit, and publish articles straight from the dashboard.",
  },
  {
    icon: ImageIcon,
    title: "Upload group tour photos",
    body: "Build a gallery from each departure — no developer needed.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Drafts stay hidden until you choose to publish them.",
  },
];

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/dashboard");

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-background">
      <section className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-slate-950 px-12 py-12 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-amber-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-sky-500/10 blur-3xl"
        />

        <div className="relative">
          <Logo size="md" variant="light" />
        </div>

        <div className="relative max-w-md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-400">
            AUZBIZ Control Room
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight">
            The stories and journeys, managed in one place.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Publish guides, upload photos from recent departures, and keep the
            public site current — without touching code.
          </p>

          <ul className="mt-10 space-y-5">
            {points.map((point) => (
              <li key={point.title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-400">
                  <point.icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold">{point.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/60">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/"
          className="relative inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
        >
          Back to auzbizgroup.com <ArrowUpRight size={13} />
        </Link>
      </section>

      <section className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Logo size="md" variant="auto" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-600 dark:text-amber-400">
            Staff access
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="mt-2 mb-8 text-sm text-muted-foreground">
            Sign in to manage the blog and group tour galleries.
          </p>

          <LoginForm configured={isAdminConfigured()} />
        </div>
      </section>
    </div>
  );
}
