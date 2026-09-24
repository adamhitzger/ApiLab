import type { Metadata } from "next";
import { pageSeo, siteTitle } from "@/lib/seo";
import { homeSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { WhyApiLab } from "@/components/home/WhyApiLab";
import { Services } from "@/components/home/Services";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { Integrations } from "@/components/home/Integrations";
import { Testimonials } from "@/components/home/Testimonials";
import { Pricing } from "@/components/home/Pricing";
import { getCategories, getFeaturedProjects, getReviews, getTools } from "@/lib/data";

const description =
  "Navrhujeme a stavíme automatizace, datové pipeline a AI nástroje pro výrobní i obchodní firmy — od scrapingu dat přes napojení na CRM až po dashboardy pro CNC výrobu.";

export const metadata: Metadata = {
  title: { absolute: siteTitle },
  ...pageSeo({ path: "/", title: siteTitle, description, withBrand: false }),
};

export default async function Home() {
  const [projects, tools, categories, reviews] = await Promise.all([getFeaturedProjects(), getTools(), getCategories(), getReviews()]);

  return (
    <>
      <JsonLd data={homeSchema()} />
      <Hero />
      <WhyApiLab />
      <Services />
      <ProjectsSection projects={projects} />
      <Integrations tools={tools} categories={categories} />
      <Testimonials reviews={reviews} />
      <Pricing />
    </>
  );
}
