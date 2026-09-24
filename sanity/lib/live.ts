// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'
import { QueryParams } from 'next-sanity';

export const { SanityLive } = defineLive({
  client,
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}) {
  return client.fetch<QueryResponse>(query, params, {
    perspective: "published",
    useCdn: true,
    next: { revalidate: 30 },
  });
}
