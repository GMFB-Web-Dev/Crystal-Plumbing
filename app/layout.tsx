import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crystalplumbing.co.nz"),
  title: {
    default: "Crystal Plumbing & Gas | Auckland Plumber",
    template: "%s | Crystal Plumbing & Gas",
  },
  description:
    "Clear, reliable residential plumbing and gas fitting across Auckland. Call James for honest advice and quality workmanship.",
  applicationName: "Crystal Plumbing & Gas",
  openGraph: {
    type: "website",
    locale: "en_NZ",
    siteName: "Crystal Plumbing & Gas",
    title: "Crystal Plumbing & Gas | Auckland Plumber",
    description:
      "Clear, reliable residential plumbing and gas fitting across Auckland.",
    images: [
      {
        url: "/images/home/hero.png",
        width: 1261,
        height: 1247,
        alt: "James from Crystal Plumbing beside the Crystal Plumbing van",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crystal Plumbing & Gas | Auckland Plumber",
    description: "Clear, reliable plumbing and gas fitting across Auckland.",
    images: ["/images/home/hero.png"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Crystal Plumbing & Gas Ltd",
  url: "https://crystalplumbing.co.nz",
  telephone: "+64276976797",
  email: "info@crystalplumbing.co.nz",
  image: "https://crystalplumbing.co.nz/images/home/hero.png",
  areaServed: {
    "@type": "City",
    name: "Auckland",
  },
  founder: {
    "@type": "Person",
    name: "James",
  },
  knowsAbout: ["Plumbing", "Gas fitting", "Hot water systems", "Bathroom renovations"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <ContactSection />
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
