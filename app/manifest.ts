import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Automatizace firemních a výrobních procesů`,
    short_name: site.name,
    description: site.tagline,
    lang: "cs",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8f1",
    theme_color: "#14160f",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
