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
  title: "Crystal Plumbing & Gas | Auckland Plumber",
  description:
    "Clear, reliable residential plumbing and gas fitting across Auckland. Call James for honest advice and quality workmanship.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main>{children}</main>
        <ContactSection />
        <SiteFooter />
      </body>
    </html>
  );
}
