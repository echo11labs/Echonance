import type { Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/noto-sans-devanagari";
import { AppSplash } from "@/components/app-splash";
import { AuthProvider } from "@/components/auth-provider";

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
        <AppSplash />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
