import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo";

const PUBLIC_PATHS = [
  "/",
  "/about",
  "/tax-law-library",
  "/contribute",
  "/llms.txt",
  "/llms-full.txt",
];

const DISALLOWED_PATHS = [
  "/api/admin/",
  "/api/qa/",
  "/api/resources/upload",
  "/api/waitlist",
  "/sign-in",
  "/sign-up",
  "/design-preview",
  "/background-beams-demo",
];

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: PUBLIC_PATHS,
        disallow: DISALLOWED_PATHS,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: PUBLIC_PATHS,
        disallow: DISALLOWED_PATHS,
      })),
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
