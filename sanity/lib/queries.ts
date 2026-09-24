import { defineQuery } from "next-sanity";

const CATEGORY_FIELDS = /* groq */ `
  _id,
  name,
  "slug": slug.current
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "projects" && defined(slug.current)] | order(_createdAt asc) {
    _id,
    heading,
    "slug": slug.current,
    heading2,
    overview,
    pills,
    text,
    category->{ ${CATEGORY_FIELDS} }
  }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "projects" && defined(slug.current)] | order(_createdAt asc) [0...4] {
    _id,
    heading,
    "slug": slug.current,
    heading2,
    overview,
    pills,
    category->{ ${CATEGORY_FIELDS} }
  }
`);

export const REVIEWS_QUERY = defineQuery(`
  *[_type == "reviews"] | order(_createdAt asc) {
    _id,
    text,
    person,
    role,
    company
  }
`);

export const TOOLS_QUERY = defineQuery(`
  *[_type == "tools"] | order(_createdAt asc) {
    _id,
    url,
    "api_image": api_image.asset->url,
    category->{ ${CATEGORY_FIELDS} }
  }
`);

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "categories"] | order(name asc) { ${CATEGORY_FIELDS} }
`);

export const PROJECTS_UPDATED_QUERY = defineQuery(`
  *[_type == "projects" && defined(slug.current)] | order(_updatedAt desc)[0]._updatedAt
`);
