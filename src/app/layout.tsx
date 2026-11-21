import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/noto-sans-devanagari";
import { AppSplash } from "@/components/app-splash";
import { AuthProvider } from "@/components/auth-provider";
import { JsonLd } from "@/components/json-ld";
import {
  buildRootJsonLd,
  CORE_KEYWORDS,
  getSiteUrl,
  OG_IMAGES,
  ORGANIZATION_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: CORE_KEYWORDS,
  authors: [{ name: ORGANIZATION_NAME }],
  creator: ORGANIZATION_NAME,
  publisher: ORGANIZATION_NAME,
  category: "legal",
  icons: {
    icon: "/icon.png",
    apple: "/taxora-logo.png",
  },
  alternates: {
    types: {
      "text/markdown": "/llms.txt",
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ne_NP"],
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGES.workspace, OG_IMAGES.emblem],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGES.workspace.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ WebkitTextSizeAdjust: "100%" }}>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="942768f4-6cd1-490c-a74b-36f156aa5d07"
          data-domains="taxora.echo11.tech"
          data-exclude-search="true"
          data-exclude-hash="true"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@500;600;700&display=swap"
        />
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Hide dev issue indicator/overlay during recording
          dangerouslySetInnerHTML={{
            __html: `
              nextjs-portal,
              [data-nextjs-toast],
              [data-nextjs-dialog-overlay] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }
            `,
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          background: "#060807",
          color: "#f4f5f4",
          colorScheme: "dark",
          fontFamily:
            '"Instrument Sans Variable", "Noto Sans Devanagari Variable", "Instrument Sans", system-ui, -apple-system, sans-serif',
        }}
      >
        <JsonLd data={buildRootJsonLd()} />
        <AppSplash />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
