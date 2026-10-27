import type { Metadata } from "next";
import PostForm from "@/components/admin/PostForm";
import { requireAdminPage } from "@/lib/auth";

export const metadata: Metadata = { title: "New article", robots: { index: false } };

export default async function NewPostPage() {
  await requireAdminPage();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
          Blog
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">Write a new article</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Save as a draft first, then publish when it is ready.
        </p>
      </header>
      <PostForm />
    </div>
  );
}
