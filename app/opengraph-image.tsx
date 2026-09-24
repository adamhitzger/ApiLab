import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "AUTOMA — automatizace firemních a výrobních procesů";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpengraphImage() {
  return renderOgImage({
    title: "Automatizace firemních a výrobních procesů",
    description: "Scraping dat, napojení na CRM, dashboardy pro výrobu — za měsíční paušál bez hvězdiček.",
  });
}
