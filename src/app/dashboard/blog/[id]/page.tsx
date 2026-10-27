import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { requireAdminPage } from "@/lib/auth";
import { getContent } from "@/lib/content/store";
import type { BlogPost } from "@/lib/content/types";

export const metadata: Metadata = { title: "Edit article", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;

  let post: BlogPost | undefined;
  try {
    post = (await getContent()).blogPosts.find((entry) => entry.id === id);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
          Blog
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">Edit article</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Changes go live as soon as you save a published article.</p>
      </header>
      <PostForm post={post} />
    </div>
  );
}
