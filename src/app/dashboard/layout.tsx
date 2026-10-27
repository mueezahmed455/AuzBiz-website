import type { Metadata } from "next";
import DashboardShell from "@/components/admin/DashboardShell";
import { requireAdminPage } from "@/lib/auth";
import { getContentSafe } from "@/lib/content/store";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminPage();

  const content = await getContentSafe();
  const newInquiries = content.inquiries.filter((inquiry) => inquiry.status === "new").length;

  return (
    <DashboardShell newInquiries={newInquiries}>{children}</DashboardShell>
  );
}
