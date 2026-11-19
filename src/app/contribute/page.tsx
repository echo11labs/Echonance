import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import {
  buildContributeJsonLd,
  buildPageMetadata,
  CORE_KEYWORDS,
} from "@/lib/seo";
import Contribute from "./contribute";

export const metadata: Metadata = buildPageMetadata({
  title: "CA Knowledge Hub — Contribute Nepal Tax Guidance",
  description:
    "Submit verified Nepal tax Q&As, statutory section citations, and official IRD documents with Practicing CA & ICAN attribution for editorial review.",
  path: "/contribute",
  keywords: [
    ...CORE_KEYWORDS,
    "ICAN Chartered Accountant contribution Nepal",
    "Nepal CA Knowledge Hub",
    "IRD circular submission Nepal",
  ],
});

export default function ContributePage() {
  return (
    <>
      <JsonLd data={buildContributeJsonLd()} />
      <Contribute />
    </>
  );
}
