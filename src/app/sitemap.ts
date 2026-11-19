import type { MetadataRoute } from "next";
import { getSiteOrigin, LAST_UPDATED_ISO } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  const lastModified = new Date(LAST_UPDATED_ISO);

  return [
    {
      url: `${origin}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${origin}/tax-law-library`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${origin}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${origin}/contribute`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
