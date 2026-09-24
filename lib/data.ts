import { sanityFetch } from "@/sanity/lib/live";
import { CATEGORIES_QUERY, FEATURED_PROJECTS_QUERY, PROJECTS_QUERY, PROJECTS_UPDATED_QUERY, REVIEWS_QUERY, TOOLS_QUERY } from "@/sanity/lib/queries";
import type { Categories, Projects, Reviews, Tools } from "@/types";

/**
 * Thin wrappers around sanityFetch. A failed request logs and returns an
 * empty list so the page still renders — sections hide themselves when empty.
 */
async function safe<T>(fn: () => Promise<T[]>, label: string): Promise<T[]> {
  try {
    return (await fn()) ?? [];
  } catch (error) {
    console.error(`Sanity fetch failed (${label}):`, error);
    return [];
  }
}

export const getProjects = () => safe(() => sanityFetch<Projects>({ query: PROJECTS_QUERY }), "projects");
export const getFeaturedProjects = () => safe(() => sanityFetch<Projects>({ query: FEATURED_PROJECTS_QUERY }), "featured projects");
export const getReviews = () => safe(() => sanityFetch<Reviews>({ query: REVIEWS_QUERY }), "reviews");
export const getTools = () => safe(() => sanityFetch<Tools>({ query: TOOLS_QUERY }), "tools");
export const getCategories = () => safe(() => sanityFetch<Categories>({ query: CATEGORIES_QUERY }), "categories");

/** Datum poslední změny projektů pro sitemap; při chybě raději nic než špatné datum. */
export async function getProjectsLastModified(): Promise<Date | undefined> {
  try {
    const iso = await sanityFetch<string | null>({ query: PROJECTS_UPDATED_QUERY });
    return iso ? new Date(iso) : undefined;
  } catch (error) {
    console.error("Sanity fetch failed (projects lastModified):", error);
    return undefined;
  }
}
