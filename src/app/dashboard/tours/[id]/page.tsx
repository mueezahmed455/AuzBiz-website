import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourForm from "@/components/admin/TourForm";
import { requireAdminPage } from "@/lib/auth";
import { getContent } from "@/lib/content/store";
import type { Tour } from "@/lib/content/types";

export const metadata: Metadata = { title: "Edit group tour", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;

  let tour: Tour | undefined;
  try {
    tour = (await getContent()).tours.find((entry) => entry.id === id);
  } catch {
    notFound();
  }

  if (!tour) notFound();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
          Group tours
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">Edit group tour</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Add photos, update the departure date, or hide the tour from the site.
        </p>
      </header>
      <TourForm tour={tour} />
    </div>
  );
}
