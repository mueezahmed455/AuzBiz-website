import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import SiteChrome from "@/components/SiteChrome";
import Analytics from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "AUZBIZ Group — Travel, Tours & Flight Tools | Lahore",
    template: "%s | AUZBIZ Group",
  },
  description:
    "AUZBIZ Group is a Lahore-based travel agency for Umrah, group tours, visas, air ticketing, hotels, corporate MICE and study abroad — with a sample fare comparison tool, booking status requests and live plane radar.",
  keywords: [
    "AUZBIZ",
    "AUZBIZ Group",
    "Dream Beyond Borders",
    "travel agency Lahore",
    "Umrah packages Pakistan",
    "visa services Lahore",
    "group tours Pakistan",
    "corporate MICE Lahore",
    "flight price analysis",
    "live flight tracking",
  ],
  authors: [{ name: "AUZBIZ Group" }],
  creator: "AUZBIZ Group",
  openGraph: {
    title: "AUZBIZ Group — Dream Beyond Borders",
    description:
      "Umrah, tours, visas and corporate events — a Lahore travel agency with sample fare comparison and live plane radar.",
    type: "website",
    siteName: "AUZBIZ Group",
    url: "https://www.auzbizgroup.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AUZBIZ Group — Dream Beyond Borders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUZBIZ Group — Dream Beyond Borders",
    description: "Travel, tours and flight tools from Lahore.",
  },
  metadataBase: new URL("https://www.auzbizgroup.com"),
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('auzbiz-theme');var d=t==='dark'||t==='light'?t:(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark', d === 'dark')}catch(e){}})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem('auzbiz-loaded')==='1'){document.documentElement.setAttribute('data-auzbiz-loaded','1')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "AUZBIZ Group",
              alternateName: "AUZBIZ",
              url: "https://www.auzbizgroup.com",
              logo: "https://www.auzbizgroup.com/icon-512.png",
              image: "https://www.auzbizgroup.com/og-image.jpg",
              description:
                "Travel agency in Lahore, Pakistan, handling Umrah, group tours, visas, air ticketing, hotels, corporate travel and study-abroad guidance.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "DHA II (Rehbar), Lahore, Pakistan",
                addressLocality: "Lahore",
                addressCountry: "PK",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "09:00",
                  closes: "20:00",
                },
              ],
              email: "auzbizpak@gmail.com",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-346-4993122",
                contactType: "customer service",
                email: "auzbizpak@gmail.com",
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
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
