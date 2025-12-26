
import type { Metadata } from "next";
import "./globals.css";
import NavHeader from "@/components/global/navigation/NavHeader";
import { Raleway } from "next/font/google";
import "../lib/gsap-setup"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { GoogleAnalytics } from '@next/third-parties/google'

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
  title: "LEAD PERU",
  description: "Learn. Explore. Aspire. Discover.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavHeader />
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
