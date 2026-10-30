import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { PreviewBanner } from "@/components/PreviewBanner";
import { person } from "@/content/person";
import { siteConfig } from "@/lib/config";
import { assertLaunchReady } from "@/lib/launch";
import "./globals.css";

// next/font self-hosts these at build time; no requests go to Google at runtime.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  // Preview builds stay out of search results; production removes this.
  robots: siteConfig.isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  assertLaunchReady();
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <PreviewBanner />
        <Header name={person.name} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <PersonJsonLd />
      </body>
    </html>
  );
}
