import type { Metadata } from "next";
import "./globals.css";
import NavHeader from "@/components/global/navigation/NavHeader";
import Footer from "@/components/global/footer";
import SmoothScroll from "@/components/global/smooth-scroll";
import { montserrat, sourceSans } from "./styles/fonts";
import { GeistSans } from "geist/font/sans";
import "@/lib/gsap-setup";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "LEAD | Building the next generation of leaders across the Americas",
  description:
    "A student-led non-profit connecting students across the Americas in STEM learning, leadership, and opportunity.",
  openGraph: {
    type: "website",
    siteName: "LEAD",
    title: "LEAD | Building the next generation of leaders across the Americas",
    description:
      "A student-led non-profit connecting students across the Americas in STEM learning, leadership, and opportunity.",
    images: [
      {
        url: "/media/lead/og.jpg",
        width: 1200,
        height: 630,
        alt: "LEAD students across the Americas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAD | Building the next generation of leaders across the Americas",
    description:
      "A student-led non-profit connecting students across the Americas in STEM learning, leadership, and opportunity.",
    images: ["/media/lead/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${montserrat.variable} ${sourceSans.variable} ${GeistSans.variable}`}>
      <body className="antialiased">
        <SmoothScroll />
        <NavHeader />
        <main>{children}</main>
        <Footer />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
