import type { Metadata } from "next";
import TaxLawLibrary from "./tax-law-library";

export const metadata: Metadata = {
  title: "Tax Law Library | Taxora",
  description:
    "Browse verified Acts, Rules, Finance Acts, and individual legal provisions under official Nepal Rajpatra publications.",
};

export default function TaxLawLibraryPage() {
  return <TaxLawLibrary />;
}
