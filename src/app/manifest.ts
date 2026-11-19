import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Nepal Tax Intelligence`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#060807",
    theme_color: "#00df81",
    icons: [
      {
        src: "/taxora-logo.png",
        sizes: "816x816",
        type: "image/png",
      },
    ],
  };
}
