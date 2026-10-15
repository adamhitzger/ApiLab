import type { MetadataRoute } from "next";
import { getProjectSlugs, getProjectsLastModified } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectsUpdated, projects] = await Promise.all([getProjectsLastModified(), getProjectSlugs()]);
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projekty`, lastModified: projectsUpdated ?? now, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({ url: `${siteUrl}/projekty/${p.slug}`, lastModified: new Date(p._updatedAt), changeFrequency: "yearly" as const, priority: 0.7 })),
    { url: `${siteUrl}/o-nas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/obchodni-podminky`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/ochrana-osobnich-udaju`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
