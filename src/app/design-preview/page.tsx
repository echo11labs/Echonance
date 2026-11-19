import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Colors & Typography | Taxora",
  robots: { index: false, follow: false },
};

export default async function Home() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const { default: DesignPreview } = await import("../design-preview");
  return <DesignPreview />;
}
