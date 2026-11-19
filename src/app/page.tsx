import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import {
  buildHomeJsonLd,
  buildPageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/seo";
import Dashboard from "./dashboard";

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
      <Dashboard />
    </>
  );
}
