import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { site } from "@/lib/content";
import { ogImage, siteTitle, siteUrl } from "@/lib/seo";
import "./globals.css";
import Hotjar from "@/components/layout/Hotjar";
import {GoogleTagManager} from "@next/third-parties/google"
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Softwarová agentura pro automatizaci firemních a výrobních procesů, dat a AI. Scraping dat, napojení na CRM, dashboardy pro výrobu — měsíční paušál bez hvězdiček.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s · ${site.name}` },
  description,
  applicationName: site.name,
  generator: "Next.js",
  keywords: [
    "automatizace procesů",
    "automatizace firemních procesů",
    "automatizace výroby",
    "scraping dat",
    "napojení na CRM",
    "datové pipeline",
    "integrace API",
    "dashboardy pro výrobu",
    "AI nástroje pro firmy",
    "softwarová agentura",
  ],
  authors: [{ name: site.owner, url: siteUrl }],
  creator: site.owner,
  publisher: site.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, telephone: false, address: false },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: site.name, statusBarStyle: "black-translucent" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "cs_CZ",
    url: "/",
    title: siteTitle,
    description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description, images: [ogImage.url] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Ikony doplňuje file convention: app/icon.svg a app/apple-icon.tsx.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f1" },
    { media: "(prefers-color-scheme: dark)", color: "#14160f" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="cs"
      className={`${bricolage.variable} ${instrument.variable} h-full antialiased`}
    >
      <head>
        {/* Obrázky nástrojů i projektů chodí ze Sanity CDN — spojení otevřeme dřív, než na ně narazí parser. */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <noscript>
          <style>{`[data-reveal],[data-split],[data-hero-item],[data-hero-title],[data-hero-card],[data-hero-pop],[data-hero-row],[data-reveal-group]>*{visibility:visible!important}`}</style>
        </noscript>
        {cookiebotId && (
          <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={cookiebotId}
            data-blockingmode="auto"
            data-culture="cs"
            strategy="beforeInteractive"
          />
        )}
        <Hotjar/>
         <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_KEY as string}/>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
