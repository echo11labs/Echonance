import type { Metadata } from "next";
import About from "./about";

export const metadata: Metadata = {
  title: "About Taxora | Purpose & Principles",
  description:
    "Learn about the mission, principles, and statutory architecture behind Taxora — Nepal’s authoritative tax intelligence and research platform.",
};

export default function AboutPage() {
  return <About />;
}
