"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DealBanner from "./DealBanner";
import BackToTop from "./BackToTop";
import WhatsAppWidget from "./WhatsAppWidget";
import MobileCTA from "./MobileCTA";
import ScrollProgress from "./ScrollProgress";
import PageLoader from "./PageLoader";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <DealBanner />
      <main className="flex-1 pb-14 md:pb-0">{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppWidget />
      <MobileCTA />
    </>
  );
}
