"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowLeft, ExternalLink, Info } from "lucide-react";
import type { BlogPost } from "@/lib/content/types";
import { savePostAction, type FormState } from "@/app/dashboard/actions";
import { Input, Label, Select, Textarea } from "@/components/ui";
import ImageUploader from "./ImageUploader";
import SaveButton from "./SaveButton";

const categories = [
  "Destination Guide",
  "Visa News",
  "Umrah Tips",
  "Study Abroad",
  "Travel Update",
  "Corporate Travel",
  "Travel Tips",
  "AUZBIZ News",
];

export default function PostForm({ post }: { post?: BlogPost }) {
  const [state, formAction] = useActionState<FormState, FormData>(savePostAction, {});
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <input type="hidden" name="id" value={post?.id ?? ""} />

      <div className="lg:col-span-2 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/dashboard/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} /> Back to blog
        </Link>
        <div className="flex items-center gap-3">
          {post?.status === "published" && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              View live <ExternalLink size={12} />
            </Link>
          )}
          <SaveButton label={post ? "Save changes" : "Create post"} />
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
          <h2 className="text-base font-semibold text-foreground">Article</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Write the headline and body. The excerpt is what appears on the blog index.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                maxLength={140}
                defaultValue={post?.title}
                placeholder="e.g. A first-timer's guide to Uzbekistan"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                required
                maxLength={320}
                rows={3}
                defaultValue={post?.excerpt}
                placeholder="One or two sentences that make the reader want to open the article."
              />
              <p className="mt-1 text-[11px] text-muted-foreground">Up to 320 characters.</p>
            </div>

            <div>
              <Label htmlFor="content">Article body</Label>
              <Textarea
                id="content"
                name="content"
                required
                rows={18}
                defaultValue={post?.content.join("\n\n")}
                placeholder={"Write one paragraph per block.\n\n## Use this for a section heading\n\n- Bullet points work too\n- Like this\n\n> And this creates a pull quote."}
                className="font-[inherit] leading-relaxed"
              />
              <p className="mt-1.5 flex gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
                <Info size={12} className="mt-0.5 shrink-0" />
                Separate paragraphs with a blank line. Start a line with ## for a heading,
                - for a bullet, or &gt; for a quote.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-base font-semibold text-foreground">Cover image</h2>
          <p className="mt-1 mb-5 text-xs text-muted-foreground">
            Landscape images work best (roughly 1600 × 900).
          </p>
          <ImageUploader
            name="image"
            label="Cover photo"
            hint="Optional"
            initialValue={post?.image}
          />
          <div className="mt-4">
            <Label htmlFor="imageAlt">Image description</Label>
            <Input
              id="imageAlt"
              name="imageAlt"
              maxLength={160}
              defaultValue={post?.imageAlt}
              placeholder="Describe the photo for screen readers"
            />
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold text-foreground">Publishing</h2>

          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="status">Visibility</Label>
              <Select id="status" name="status" defaultValue={post?.status ?? "draft"}>
                <option value="draft">Draft — hidden from the site</option>
                <option value="published">Published — live on the blog</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Publish date</Label>
              <Input id="date" name="date" type="date" defaultValue={post?.sortDate ?? today} />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface px-3.5 py-3">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={post?.featured}
                className="mt-0.5 h-4 w-4 rounded border-input accent-amber-500"
              />
              <span>
                <span className="block text-sm font-medium text-foreground">Feature this article</span>
                <span className="block text-[11px] text-muted-foreground">
                  Highlights it on the blog page.
                </span>
              </span>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold text-foreground">Organise</h2>

          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                list="post-categories"
                defaultValue={post?.category}
                placeholder="Destination Guide"
              />
              <datalist id="post-categories">
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                defaultValue={post?.tags.join(", ")}
                placeholder="Uzbekistan, Silk Road, Visa"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">Comma separated.</p>
            </div>

            <div>
              <Label htmlFor="slug">URL slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={post?.slug}
                placeholder="auto-generated-from-title"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Leave blank to build it from the title.
              </p>
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                defaultValue={post?.author ?? "AUZBIZ Travel Desk"}
              />
            </div>
          </div>
        </section>
      </aside>
    </form>
  );
}
