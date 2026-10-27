"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import WhatsAppWidget from "./WhatsAppWidget";
import MobileCTA from "./MobileCTA";
import ScrollProgress from "./ScrollProgress";
import PageLoader from "./PageLoader";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 pb-14 outline-none md:pb-0">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppWidget />
      <MobileCTA />
    </>
  );
}
