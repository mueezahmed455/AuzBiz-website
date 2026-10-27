import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Images,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { requireAdminPage } from "@/lib/auth";
import { getContent } from "@/lib/content/store";
import type { Tour } from "@/lib/content/types";
import { deleteTourAction, toggleTourStatusAction } from "@/app/dashboard/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import TourArtwork from "@/components/TourArtwork";

export const dynamic = "force-dynamic";

export default async function DashboardToursPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  await requireAdminPage();
  const params = await searchParams;

  let tours: Tour[] = [];
  let error = "";
  try {
    tours = (await getContent()).tours;
  } catch (readError) {
    error = readError instanceof Error ? readError.message : "Could not load tours.";
    tours = [];
  }

  const published = tours.filter((tour) => tour.status === "published").length;
  const drafts = tours.length - published;

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Group tours
          </p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Tour galleries
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {published} live · {drafts} draft · {tours.reduce((total, tour) => total + tour.gallery.length, 0)} gallery photos
          </p>
        </div>
        <Link
          href="/dashboard/tours/new"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
        >
          <Plus size={15} /> Add group tour
        </Link>
      </header>

      {params.saved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
          <CheckCircle2 size={16} /> Tour {params.saved === "created" ? "created" : "updated"} successfully.
        </div>
      )}
      {params.deleted && (
        <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          Tour deleted.
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      {tours.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-muted-foreground">
            <Images size={22} />
          </span>
          <h2 className="mt-4 text-base font-semibold text-foreground">No group tours yet</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Add your first tour, upload the photos, and publish it to the public gallery.
          </p>
          <Link
            href="/dashboard/tours/new"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-amber-500 dark:text-slate-950"
          >
            <Plus size={15} /> Add a group tour
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {tours.map((tour) => (
            <article
              key={tour.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                {tour.coverImage ? (
                  <Image
                    src={tour.coverImage}
                    alt={tour.coverAlt || tour.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    unoptimized
                  />
                ) : (
                  <TourArtwork destination={tour.destination} region={tour.region} compact />
                )}
                <span
                  className={`absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur ${
                    tour.status === "published"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-amber-400/90 text-slate-950"
                  }`}
                >
                  {tour.status}
                </span>
                {tour.gallery.length > 0 && (
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
                    <Images size={10} /> {tour.gallery.length}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {tour.region} · {tour.duration}
                </p>
                <h2 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">{tour.title}</h2>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{tour.summary}</p>
                <p className="mt-3 text-sm font-bold text-foreground">{tour.price}</p>

                <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border pt-3">
                  <Link
                    href={`/dashboard/tours/${tour.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-amber-400"
                  >
                    <Pencil size={12} /> Edit
                  </Link>
                  {tour.status === "published" && (
                    <Link
                      href={`/group-tours/${tour.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Eye size={12} /> View
                    </Link>
                  )}
                  <form action={toggleTourStatusAction}>
                    <input type="hidden" name="id" value={tour.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {tour.status === "published" ? <EyeOff size={12} /> : <Eye size={12} />}
                      {tour.status === "published" ? "Hide" : "Publish"}
                    </button>
                  </form>
                  <form action={deleteTourAction} className="ml-auto">
                    <input type="hidden" name="id" value={tour.id} />
                    <ConfirmButton
                      label={`Delete ${tour.title}`}
                      message={`Delete “${tour.title}”? This cannot be undone.`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                    >
                      <Trash2 size={12} />
                    </ConfirmButton>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={15} /> Overview
        </Link>
        <Link
          href="/group-tours"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Public gallery <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
