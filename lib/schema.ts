import type { Project, ProjectDetail } from "@/types";
import { about, faq, pricing, services, site } from "./content";
import { siteTitle, siteUrl } from "./seo";

/**
 * schema.org data pro celý web. Každá stránka vykresluje jeden @graph:
 * Organization + WebSite jsou v něm vždy (přes @id se na ně ostatní uzly odkazují),
 * k tomu konkrétní typ stránky, drobečková navigace a případně FAQ / seznam projektů.
 */

const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

const url = (path: string) => (path === "/" ? siteUrl : `${siteUrl}${path}`);


const price = (raw: string) => Number(raw.replace(/[^\d]/g, ""));

/** Placeholdery typu "https://www.linkedin.com/" do sameAs nepatří — jsou to jen odkazy na síť. */
const profiles = site.socials.map((s) => s.href).filter((href) => new URL(href).pathname.replace(/\/$/, "").length > 0);

const organization = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: site.name,
  legalName: site.owner,
  description: site.tagline,
  url: siteUrl,
  logo: { "@type": "ImageObject", url: `${siteUrl}/apple-icon`, width: 180, height: 180 },
  image: `${siteUrl}/opengraph-image`,
  email: site.email,
  founder: { "@type": "Person", name: site.owner },
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ledečská 2984",
    postalCode: "580 01",
    addressLocality: "Havlíčkův Brod",
    addressCountry: "CZ",
  },
  // Jen IČO — DIČ fyzické osoby se z IČO neodvozuje, takže ho tu radši neuvádíme.
  identifier: { "@type": "PropertyValue", name: "IČO", value: site.ico },
  areaServed: { "@type": "Country", name: "Česko" },
  availableLanguage: [{ "@type": "Language", name: "Czech", alternateName: "cs" }],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    areaServed: "CZ",
    availableLanguage: ["cs"],
  },
  knowsAbout: [
    "automatizace firemních procesů",
    "automatizace výroby",
    "scraping dat",
    "integrace API",
    "CRM a mailing",
    "datové dashboardy",
    "AI nástroje pro firmy",
  ],
  priceRange: `${price(pricing.plans[0].price)}–${price(pricing.web.plans[2].price)} CZK`,
  ...(profiles.length > 0 && { sameAs: profiles }),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Služby",
    itemListElement: [services.featured, ...services.secondary].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.text, provider: { "@id": ORG_ID }, serviceType: s.chips.join(", ") },
    })),
  },
  makesOffer: [
  ...pricing.plans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: plan.note,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: price(plan.price),
      priceCurrency: "CZK",
      billingDuration: 1,
      billingIncrement: 1,
      unitCode: "MON",
      valueAddedTaxIncluded: false,
    },
    itemOffered: { "@type": "Service", name: `Automatizace — balíček ${plan.name}`, provider: { "@id": ORG_ID } },
  })),
  ...pricing.web.plans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: plan.note,
    priceSpecification: {
      "@type": "PriceSpecification",
      price: price(plan.price),
      priceCurrency: "CZK",
      valueAddedTaxIncluded: false,
      // "od 15 000 Kč" je spodní hranice, ne pevná cena
      ...(plan.price.startsWith("od") && { minPrice: price(plan.price) }),
    },
    itemOffered: { "@type": "Service", name: plan.name, serviceType: "Tvorba webových stránek", provider: { "@id": ORG_ID } },
  })),
  ],
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteUrl,
  name: site.name,
  description: site.tagline,
  inLanguage: "cs-CZ",
  publisher: { "@id": ORG_ID },
  copyrightHolder: { "@id": ORG_ID },
};

function breadcrumbs(trail: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url(trail[trail.length - 1].path)}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(item.path),
    })),
  };
}

function webPage({
  path,
  name,
  description,
  type = "WebPage",
  trail,
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage";
  trail?: Array<{ name: string; path: string }>;
}) {
  return {
    "@type": type,
    "@id": `${url(path)}#webpage`,
    url: url(path),
    name,
    description,
    inLanguage: "cs-CZ",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: `${siteUrl}/opengraph-image`,
    ...(trail && { breadcrumb: { "@id": `${url(path)}#breadcrumb` } }),
  };
}

const graph = (nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export function homeSchema() {
  return graph([
    organization,
    website,
    webPage({ path: "/", name: siteTitle, description: site.tagline }),
  ]);
}

export function aboutSchema() {
  const trail = [
    { name: "Úvod", path: "/" },
    { name: "O nás", path: "/o-nas" },
  ];
  return graph([
    organization,
    website,
    webPage({ path: "/o-nas", name: "O nás", description: about.title, type: "AboutPage", trail }),
    breadcrumbs(trail),
    {
      "@type": "FAQPage",
      "@id": `${url("/o-nas")}#faq`,
      inLanguage: "cs-CZ",
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ]);
}

export function projectsSchema(projects: Project[], description: string) {
  const trail = [
    { name: "Úvod", path: "/" },
    { name: "Projekty", path: "/projekty" },
  ];
  return graph([
    organization,
    website,
    webPage({ path: "/projekty", name: "Projekty", description, type: "CollectionPage", trail }),
    breadcrumbs(trail),
    {
      "@type": "ItemList",
      "@id": `${url("/projekty")}#projekty`,
      name: "Realizované automatizace",
      numberOfItems: projects.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          "@id": `${url(`/projekty/${p.slug}`)}#article`,
          url: url(`/projekty/${p.slug}`),
          name: p.heading,
          headline: p.heading2 || p.heading,
          description: p.overview,
          inLanguage: "cs-CZ",
          creator: { "@id": ORG_ID },
          ...(p.pills?.length > 0 && { keywords: p.pills.join(", ") }),
          ...(p.category && { about: { "@type": "Thing", name: p.category.name } }),
        },
      })),
    },
  ]);
}

export function projectSchema(p: ProjectDetail) {
  const path = `/projekty/${p.slug}`;
  const trail = [
    { name: "Úvod", path: "/" },
    { name: "Projekty", path: "/projekty" },
    { name: p.heading, path },
  ];
  return graph([
    organization,
    website,
    webPage({ path, name: p.heading, description: p.overview, trail }),
    breadcrumbs(trail),
    {
      "@type": "Article",
      "@id": `${url(path)}#article`,
      mainEntityOfPage: { "@id": `${url(path)}#webpage` },
      headline: p.heading,
      ...(p.heading2 && { alternativeHeadline: p.heading2 }),
      description: p.overview,
      image: `${siteUrl}/opengraph-image`,
      datePublished: p._createdAt,
      dateModified: p._updatedAt,
      inLanguage: "cs-CZ",
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      ...(p.category && { articleSection: p.category.name }),
      ...(p.pills?.length > 0 && { keywords: p.pills.join(", ") }),
    },
  ]);
}

export function legalSchema({ path, name, description }: { path: string; name: string; description: string }) {
  const trail = [
    { name: "Úvod", path: "/" },
    { name, path },
  ];
  return graph([organization, website, webPage({ path, name, description, trail }), breadcrumbs(trail)]);
}
