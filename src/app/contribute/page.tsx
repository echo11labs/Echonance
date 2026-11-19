import type { Metadata } from "next";
import Contribute from "./contribute";

export const metadata: Metadata = {
  title: "CA Knowledge & Resource Hub | Taxora",
  description:
    "A dedicated research and resource collection hub where Nepal’s Chartered Accountants, auditors, and tax consultants contribute verified guidance, circular interpretations, and reference documents.",
};

export default function ContributePage() {
  return <Contribute />;
}
