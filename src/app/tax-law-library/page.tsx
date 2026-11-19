import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import {
  buildLibraryJsonLd,
  buildPageMetadata,
  CORE_KEYWORDS,
} from "@/lib/seo";
import TaxLawLibrary from "./tax-law-library";

export const metadata: Metadata = buildPageMetadata({
  title: "Nepal Tax Law Library — Acts, Rules & Finance Bill",
  description:
    "Browse Income Tax Act 2058, VAT Act 2052, Companies Act 2063, Finance Bill 2083, IRD TDS guides, and AML Rules from official Nepal Rajpatra sources.",
  path: "/tax-law-library",
  keywords: [
    ...CORE_KEYWORDS,
    "Nepal Rajpatra tax PDF",
    "Income Tax Act 2058 PDF",
    "Value Added Tax Act 2052 PDF",
    "Finance Bill 2083 PDF Nepal",
  ],
});

export default function TaxLawLibraryPage() {
  return (
    <>
      <JsonLd data={buildLibraryJsonLd()} />
      <TaxLawLibrary />
    </>
  );
}
