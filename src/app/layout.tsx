import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import SiteChrome from "@/components/SiteChrome";
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
  title: "AUZBIZ Group — Dream Beyond Borders | Travel & Events Agency Lahore",
  description:
    "Pakistan's trusted travel, events, and business facilitation agency. Umrah packages, corporate MICE, group tours, air ticketing, visa services, hotel bookings, and study abroad consultancy — Lahore.",
  keywords: [
    "AUZBIZ",
    "AUZBIZ Group",
    "Dream Beyond Borders",
    "travel agency Lahore",
    "Umrah packages Pakistan",
    "visa services Lahore",
    "group tours Pakistan",
  ],
  openGraph: {
    title: "AUZBIZ Group — Dream Beyond Borders",
    description:
      "Umrah, tours, visas, corporate events — end-to-end travel partner in Lahore.",
    type: "website",
    siteName: "AUZBIZ Group",
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
              name: "AUZBIZ Group",
              url: "https://www.auzbizgroup.com",
              logo: "https://www.auzbizgroup.com/logo.svg",
              description:
                "Pakistan's trusted travel, events, and business facilitation agency.",
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
          <SiteChrome>
            <PageTransition>{children}</PageTransition>
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
