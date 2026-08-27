import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
import PageLoader from "@/components/PageLoader";
import CursorGlow from "@/components/CursorGlow";
import DealBanner from "@/components/DealBanner";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import MobileCTA from "@/components/MobileCTA";
import Analytics from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1A2A6C" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
  ],
};
export const metadata: Metadata = {
  title: "AUZBIZ — Dream Beyond Borders | Premium Travel & Events Agency Lahore",
  description:
    "Pakistan's most trusted travel, events, and business facilitation agency. Umrah packages, corporate MICE events, group tours, air ticketing, visa services, hotel bookings, and study abroad consultancy — all under one roof in Lahore.",
  keywords: [
    "AUZBIZ",
    "Dream Beyond Borders",
    "travel agency Lahore",
    "Umrah packages Pakistan",
    "corporate events Lahore",
    "group tours Pakistan",
    "visa services Lahore",
    "study abroad consultancy Pakistan",
    "air ticketing Pakistan",
    "hotel bookings",
    "MICE events Lahore",
    "Zubair Ahmad",
  ],
  openGraph: {
    title: "AUZBIZ — Dream Beyond Borders | Premium Travel & Events Agency",
    description:
      "Pakistan's most trusted one-stop travel and events partner. Umrah, tours, corporate events, visas, study abroad — we handle it all.",
    type: "website",
    siteName: "AUZBIZ — Dream Beyond Borders",
    url: "https://www.auzbizgroup.com",
  },
  metadataBase: new URL("https://www.auzbizgroup.com"),
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('auzbiz-theme');var d=t||window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.classList.add(d)}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AUZBIZ — Dream Beyond Borders",
              url: "https://www.auzbizgroup.com",
              logo: "https://www.auzbizgroup.com/logo.png",
              description:
                "Pakistan's most trusted travel, events, and business facilitation agency. Umrah packages, corporate MICE events, group tours, air ticketing, visa services, hotel bookings, and study abroad consultancy.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "DHA II (Rehbar) Lahore-Pakistan",
                addressLocality: "Lahore",
                addressCountry: "PK",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-346-4993122",
                contactType: "customer service",
                availableLanguage: ["English", "Urdu"],
              },
              sameAs: [
                "https://www.facebook.com/auzbizpak",
                "https://www.linkedin.com/company/auzbiz",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-400">
        <ThemeProvider>
          <Analytics />
          <PageLoader />
          <CursorGlow />
          <ScrollProgress />
          <Navbar />
          <DealBanner />
          <main className="flex-1 pb-14 md:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
          <WhatsAppWidget />
          <MobileCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
