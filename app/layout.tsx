import type { Metadata } from "next";
import "./globals.css";
import NavHeader from "@/components/global/navigation/NavHeader";
import Footer from "@/components/global/footer";
import { montserrat, sourceSans } from "./styles/fonts";
import { GeistSans } from "geist/font/sans";
import "@/lib/gsap-setup";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "LEAD",
  description: "Learn. Explore. Aspire. Discover.",
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
        <NavHeader />
        <main>{children}</main>
        <Footer />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
