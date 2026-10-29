import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import MotionProvider from "@/components/site/motion-provider";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Stanza by Whitelion — Whitelion · PARÉ · LUFT · LMT Automation";
const description =
  "Authorised distributor in Bengaluru for Whitelion AirQube smart-home controls, PARÉ wood-look surfaces, LUFT designer fans and LMT entrance automation. One partner for the complete space.";

export const metadata: Metadata = {
  title: { default: title, template: "%s — Stanza by Whitelion" },
  // Netlify sets URL at build time; update the fallback once the domain is live
  metadataBase: new URL(process.env.URL ?? "http://localhost:3000"),
  description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Stanza by Whitelion",
    title,
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "A warm, walnut-panelled lounge with soft armchairs and full-height windows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-full">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only z-[60] bg-brass px-5 py-3 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
