import BackgroundBeamsDemo from "@/components/background-beams-demo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Background Beams Demo | Taxora",
  robots: { index: false, follow: false },
};

export default function BackgroundBeamsPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <BackgroundBeamsDemo />
    </main>
  );
}
