import type { Metadata } from "next";
import TourForm from "@/components/admin/TourForm";
import { requireAdminPage } from "@/lib/auth";

export const metadata: Metadata = { title: "New group tour", robots: { index: false } };

export default async function NewTourPage() {
  await requireAdminPage();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
          Group tours
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">Add a group tour</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Upload the photos from a departure and publish a gallery page.
        </p>
      </header>
      <TourForm />
    </div>
  );
}
