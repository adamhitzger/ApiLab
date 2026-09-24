import type { Metadata } from "next";
import { site } from "./content";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/**
 * Sdílený OG obrázek (app/opengraph-image.tsx). Uvádíme ho explicitně —
 * jakmile stránka definuje vlastní `openGraph`, Next už obrázek z file
 * convention nedoplní a og:image by chyběl.
 */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "AUTOMA — automatizace firemních a výrobních procesů",
};

/** Canonical + Open Graph + Twitter pro jednu stránku. */
export function pageSeo({
  path,
  title,
  description,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  return {
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: site.name, locale: "cs_CZ", url: path, title, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
