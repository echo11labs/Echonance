import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { buildAboutJsonLd, buildPageMetadata, CORE_KEYWORDS } from "@/lib/seo";
import About from "./about";

export const metadata: Metadata = buildPageMetadata({
  title: "About Taxora — Nepal Tax Intelligence vs General AI",
  description:
    "Explore the statutory architecture, practitioner verification standards, and comparison showing how Taxora delivers Nepal tax law precision.",
  path: "/about",
  absoluteTitle: true,
  ogVariant: "emblem",
  keywords: [
    ...CORE_KEYWORDS,
    "Taxora vs ChatGPT Nepal tax",
    "Eco Eleven Tech Taxora",
    "नेपाल कर कानून AI",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildAboutJsonLd()} />
      <About />
    </>
  );
}
