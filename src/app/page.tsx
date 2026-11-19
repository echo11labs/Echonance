import type { Metadata } from "next";
import Dashboard from "./dashboard";

export const metadata: Metadata = {
  title: "Taxora | Nepal Tax Intelligence",
  description:
    "A workspace for researching Nepal’s tax laws and regulatory guidance.",
};

export default function Home() {
  return <Dashboard />;
}
