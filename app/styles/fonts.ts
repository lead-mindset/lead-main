import localFont from "next/font/local";

// Self-hosted from the LEAD design system (fonts/). Latin subset covers
// Spanish accents and ñ. Exposed as CSS variables used by globals.css.

export const montserrat = localFont({
  src: [
    { path: "./fonts/montserrat-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/montserrat-latin-700-normal.woff2", weight: "700" },
    { path: "./fonts/montserrat-latin-800-normal.woff2", weight: "800" },
    { path: "./fonts/montserrat-latin-900-normal.woff2", weight: "900" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const sourceSans = localFont({
  src: [
    { path: "./fonts/source-sans-3-latin-400-normal.woff2", weight: "400" },
    {
      path: "./fonts/source-sans-3-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    { path: "./fonts/source-sans-3-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/source-sans-3-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-source-sans",
  display: "swap",
});
