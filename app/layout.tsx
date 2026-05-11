
import type { Metadata } from "next";
import "./globals.css";
import NavHeader from "@/components/global/navigation/NavHeader";
import Footer from "@/components/global/footer";
import { Raleway } from "next/font/google";
import "@/lib/gsap-setup";
import { GoogleAnalytics } from "@next/third-parties/google";

const outfit = Raleway({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Raleway({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Raleway({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" className={outfit.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavHeader />
        <main>{children}</main>
        <Footer />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
