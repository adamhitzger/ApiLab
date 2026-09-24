import type { Metadata } from "next";
import { site } from "./content";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/**
 * Hlavní titulek webu. Drž ho jen tady — byl dřív napsaný natvrdo
 * v layoutu, na homepage i v JSON-LD a při přejmenování se rozešel.
 */
export const siteTitle = `${site.name} — Automatizace firemních a výrobních procesů`;

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
  alt: `${site.name} — automatizace firemních a výrobních procesů`,
};

/**
 * Canonical + Open Graph + Twitter pro jednu stránku.
 *
 * `title` se předává holý ("Projekty") — značku připojí tahle funkce, aby
 * nebyla rozepsaná po jednotlivých stránkách. Homepage, která má značku
 * rovnou v titulku, si suffix vypne přes `withBrand: false`.
 */
export function pageSeo({
  path,
  title,
  description,
  type = "website",
  withBrand = true,
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  withBrand?: boolean;
}): Metadata {
  const socialTitle = withBrand ? `${title} · ${site.name}` : title;
  return {
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: site.name, locale: "cs_CZ", url: path, title: socialTitle, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [ogImage.url] },
  };
}
