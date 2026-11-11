import type { Metadata } from "next";
import AUZCampaignFlyer from "@/components/promo/AUZCampaignFlyer";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const VARIANTS = ["umrah", "education", "group", "visa"] as const;

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ variant?: string }> },
): Promise<Metadata> {
  const params = await searchParams;
  const variant = (params.variant ?? "umrah") as typeof VARIANTS[number];
  if (!VARIANTS.includes(variant)) notFound();

  const titles: Record<typeof VARIANTS[number], string> = {
    umrah: "AUZBIZ campaign — Sacred Umrah Journey",
    education: "AUZBIZ campaign — Global Education",
    group: "AUZBIZ campaign — Group Tours",
    visa: "AUZBIZ campaign — Visa Solutions",
  };

  return {
    title: titles[variant],
    description:
      "AUZBIZ campaign flyer with a WhatsApp-ready message. Open the single promo and tap Chat on WhatsApp to start the enquiry.",
  };
}

export default async function CampaignPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const params = await searchParams;
  const variant = (params.variant ?? "umrah") as typeof VARIANTS[number];
  if (!VARIANTS.includes(variant)) notFound();

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <AUZCampaignFlyer variant={variant} />
      </main >
    </div >
  );
}
