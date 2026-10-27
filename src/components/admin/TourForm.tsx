"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowLeft, ExternalLink, Info } from "lucide-react";
import type { Tour } from "@/lib/content/types";
import { saveTourAction, type FormState } from "@/app/dashboard/actions";
import { Input, Label, Select, Textarea } from "@/components/ui";
import ImageUploader from "./ImageUploader";
import SaveButton from "./SaveButton";

export default function TourForm({ tour }: { tour?: Tour }) {
  const [state, formAction] = useActionState<FormState, FormData>(saveTourAction, {});

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <input type="hidden" name="id" value={tour?.id ?? ""} />

      <div className="lg:col-span-2 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/dashboard/tours"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} /> Back to group tours
        </Link>
        <div className="flex items-center gap-3">
          {tour?.status === "published" && (
            <Link
              href={`/group-tours/${tour.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              View live <ExternalLink size={12} />
            </Link>
          )}
          <SaveButton label={tour ? "Save changes" : "Create tour"} />
        </div>
      </div>

      {state.error && (
        <div
          role="alert"
          className="lg:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
        >
          {state.error}
        </div>
      )}

      <div className="space-y-6">
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-base font-semibold text-foreground">Tour details</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            These fields power the public group tours page and the tour cards.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="title">Tour title</Label>
              <Input
                id="title"
                name="title"
                required
                maxLength={140}
                defaultValue={tour?.title}
                placeholder="e.g. Hunza Valley Autumn Departure"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  name="destination"
                  required
                  defaultValue={tour?.destination}
                  placeholder="Karimabad · Attabad · Altit"
                />
              </div>
              <div>
                <Label htmlFor="region">Region</Label>
                <Select id="region" name="region" defaultValue={tour?.region ?? "International"}>
                  <option value="International">International</option>
                  <option value="Umrah">Umrah</option>
                  <option value="Domestic">Domestic</option>
                  <option value="Corporate">Corporate</option>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="summary">Card summary</Label>
              <Textarea
                id="summary"
                name="summary"
                required
                rows={3}
                maxLength={240}
                defaultValue={tour?.summary}
                placeholder="Two short sentences about the trip."
              />
              <p className="mt-1 text-[11px] text-muted-foreground">Up to 240 characters.</p>
            </div>

            <div>
              <Label htmlFor="description">Full description</Label>
              <Textarea
                id="description"
                name="description"
                rows={12}
                defaultValue={tour?.description.join("\n\n")}
                placeholder={"One paragraph per block.\n\n## Optional heading\n\n- Bullet points\n- Work too"}
              />
              <p className="mt-1.5 flex gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
                <Info size={12} className="mt-0.5 shrink-0" />
                Blank line between paragraphs. ## for a heading, - for a bullet.
              </p>
            </div>

            <div>
              <Label htmlFor="highlights">What&apos;s included</Label>
              <Textarea
                id="highlights"
                name="highlights"
                rows={8}
                defaultValue={tour?.highlights.join("\n")}
                placeholder={"Return airfare\n4-star hotels\nDaily breakfast\nGuided tours"}
              />
              <p className="mt-1 text-[11px] text-muted-foreground">One item per line.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-base font-semibold text-foreground">Photos</h2>
          <p className="mt-1 mb-5 text-xs text-muted-foreground">
            Upload the cover photo first, then add the rest of the group photos.
          </p>

          <div className="space-y-5">
            <ImageUploader
              name="coverImage"
              label="Cover photo"
              hint="Shown on cards"
              initialValue={tour?.coverImage}
            />
            <div>
              <Label htmlFor="coverAlt">Cover photo description</Label>
              <Input
                id="coverAlt"
                name="coverAlt"
                maxLength={160}
                defaultValue={tour?.coverAlt}
                placeholder="Describe the photo for screen readers"
              />
            </div>
            <div className="border-t border-border pt-5">
              <ImageUploader
                name="gallery"
                label="Group photo gallery"
                hint="Up to 20 photos"
                multiple
                initialValues={tour?.gallery}
              />
            </div>
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold text-foreground">Publishing</h2>

          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="status">Visibility</Label>
              <Select id="status" name="status" defaultValue={tour?.status ?? "draft"}>
                <option value="draft">Draft — hidden from the site</option>
                <option value="published">Published — live on group tours</option>
              </Select>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface px-3.5 py-3">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={tour?.featured}
                className="mt-0.5 h-4 w-4 rounded border-input accent-amber-500"
              />
              <span>
                <span className="block text-sm font-medium text-foreground">Feature this tour</span>
                <span className="block text-[11px] text-muted-foreground">
                  Considered for the homepage.
                </span>
              </span>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold text-foreground">Departure &amp; pricing</h2>

          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="departure">Departure</Label>
              <Input
                id="departure"
                name="departure"
                defaultValue={tour?.departure}
                placeholder="e.g. 12 March 2027 or Dates on request"
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                required
                defaultValue={tour?.duration}
                placeholder="7 nights · 8 days"
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                defaultValue={tour?.price}
                placeholder="PKR 185,000 or On request"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Shown exactly as typed. Leave blank to display “On request”.
              </p>
            </div>

            <div>
              <Label htmlFor="groupSize">Group size</Label>
              <Input
                id="groupSize"
                name="groupSize"
                defaultValue={tour?.groupSize}
                placeholder="Optional, e.g. 12–16 travellers"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={tour?.slug}
                placeholder="auto-generated-from-title"
              />
            </div>
          </div>
        </section>
      </aside>
    </form>
  );
}
