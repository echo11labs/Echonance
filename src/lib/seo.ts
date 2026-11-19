import type { Metadata } from "next";
import { TAX_LIBRARY_DOCUMENTS } from "./tax-law-catalog";

export const SITE_NAME = "Taxora";
export const ORGANIZATION_NAME = "Eco Eleven Tech";
export const DEFAULT_SITE_URL = "https://taxora.echo11.tech";
export const SITE_TAGLINE = "Nepal Tax Law AI, Income Tax 2058, VAT & TDS";
export const SITE_DESCRIPTION =
  "Research Nepal's Income Tax Act 2058, VAT Act 2052, Finance Bill 2083, TDS rates & IRD directives with clause-exact citations in English and Nepali.";
export const LAST_UPDATED_ISO = "2026-11-19T00:00:00Z";

export const CORE_KEYWORDS = [
  "Taxora",
  "Nepal tax law",
  "Income Tax Act 2058 Nepal",
  "VAT Act 2052 Nepal",
  "Finance Bill 2083 Nepal",
  "Nepal TDS rates Section 88",
  "Inland Revenue Department Nepal directives",
  "Companies Act 2063 Nepal",
  "Nepal Chartered Accountant research",
  "CA Ora Nepal tax assistant",
];

function normalizeUrlCandidate(raw?: string): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    return parsed.origin;
  } catch {
    return null;
  }
}

export function getSiteUrl(): URL {
  const resolved =
    normalizeUrlCandidate(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeUrlCandidate(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    DEFAULT_SITE_URL;
  return new URL(resolved);
}

export function getSiteOrigin(): string {
  return getSiteUrl().origin;
}

export const OG_IMAGES = {
  workspace: {
    url: "/OG.png",
    width: 1734,
    height: 907,
    type: "image/png",
    alt: `${SITE_NAME} — Nepal Statutory Tax Workspace & Legal Intelligence`,
  },
  emblem: {
    url: "/taxora-OG.png",
    width: 1536,
    height: 1024,
    type: "image/png",
    alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
} as const;

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  absoluteTitle = false,
  noIndex = false,
  ogVariant = "workspace",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  absoluteTitle?: boolean;
  noIndex?: boolean;
  ogVariant?: "workspace" | "emblem";
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const orderedOgImages =
    ogVariant === "emblem"
      ? [OG_IMAGES.emblem, OG_IMAGES.workspace]
      : [OG_IMAGES.workspace, OG_IMAGES.emblem];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ?? CORE_KEYWORDS,
    alternates: noIndex
      ? undefined
      : {
          canonical: path,
          types: {
            "text/markdown": "/llms.txt",
          },
        },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["ne_NP"],
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: path,
      images: orderedOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [orderedOgImages[0].url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  const origin = getSiteOrigin();
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  };
}

export function buildRootJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: SITE_NAME,
        legalName: ORGANIZATION_NAME,
        url: origin,
        logo: `${origin}/taxora-logo.png`,
        image: `${origin}/OG.png`,
        description: SITE_DESCRIPTION,
        areaServed: {
          "@type": "Country",
          name: "Nepal",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: SITE_NAME,
        url: origin,
        description: SITE_DESCRIPTION,
        inLanguage: ["en", "ne"],
        publisher: {
          "@id": `${origin}/#organization`,
        },
      },
    ],
  };
}

export function buildHomeJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${origin}/#webpage`,
        url: `${origin}/`,
        name: `${SITE_NAME} — ${SITE_TAGLINE}`,
        description: SITE_DESCRIPTION,
        inLanguage: ["en", "ne"],
        dateModified: LAST_UPDATED_ISO,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#software` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${origin}/#software`,
        name: "Taxora (CA Ora)",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: `${origin}/`,
        description: SITE_DESCRIPTION,
        inLanguage: ["en", "ne"],
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "NPR",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Bilingual English and Nepali Nepal tax research",
          "Income Tax Act 2058 and Section 88 TDS schedules",
          "VAT Act 2052 thresholds and Finance Bill 2083 amendments",
          "Clause-exact citations linked to official statutory sources",
          "CA Knowledge Hub practitioner contributions and verification",
        ],
        publisher: { "@id": `${origin}/#organization` },
      },
    ],
  };
}

export function buildAboutJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${origin}/about#webpage`,
        url: `${origin}/about`,
        name: "About Taxora | Purpose & Principles",
        description:
          "Mission, statutory architecture, and comparison of Taxora against general-purpose AI for Nepal tax compliance.",
        inLanguage: ["ne", "en"],
        dateModified: LAST_UPDATED_ISO,
        isPartOf: { "@id": `${origin}/#website` },
        mainEntity: { "@id": `${origin}/#organization` },
      },
      buildBreadcrumbJsonLd([
        { name: "Taxora", path: "/" },
        { name: "About Taxora", path: "/about" },
      ]),
    ],
  };
}

export function buildLibraryJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${origin}/tax-law-library#webpage`,
        url: `${origin}/tax-law-library`,
        name: "Tax Law Library | Taxora",
        description:
          "Browse verified Acts, Rules, Finance Acts, IRD procedural directives, and Ministry of Finance policies in Nepal.",
        inLanguage: ["en", "ne"],
        dateModified: LAST_UPDATED_ISO,
        isPartOf: { "@id": `${origin}/#website` },
        mainEntity: { "@id": `${origin}/tax-law-library#collection` },
      },
      {
        "@type": "ItemList",
        "@id": `${origin}/tax-law-library#collection`,
        name: "Nepal Tax Statutes & Official Publications",
        numberOfItems: TAX_LIBRARY_DOCUMENTS.length,
        itemListElement: TAX_LIBRARY_DOCUMENTS.map((doc, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "DigitalDocument",
            name: doc.title,
            description: doc.description,
            encodingFormat: "application/pdf",
            temporalCoverage: doc.enactmentDate,
            publisher: {
              "@type": "Organization",
              name: doc.authority,
            },
            url: `${origin}${doc.sourceUrl}`,
          },
        })),
      },
      buildBreadcrumbJsonLd([
        { name: "Taxora", path: "/" },
        { name: "Tax Law Library", path: "/tax-law-library" },
      ]),
    ],
  };
}

export function buildContributeJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${origin}/contribute#webpage`,
        url: `${origin}/contribute`,
        name: "CA Knowledge & Resource Hub | Taxora",
        description:
          "Research and resource contribution portal where Nepal Chartered Accountants, auditors, and tax advisors submit verified statutory Q&As and official tax documents.",
        inLanguage: ["en", "ne"],
        dateModified: LAST_UPDATED_ISO,
        isPartOf: { "@id": `${origin}/#website` },
      },
      buildBreadcrumbJsonLd([
        { name: "Taxora", path: "/" },
        { name: "CA Knowledge Hub", path: "/contribute" },
      ]),
    ],
  };
}
