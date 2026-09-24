import type { Metadata } from "next";
import { AboutExtended } from "@/components/about/AboutExtended";
import { Process } from "@/components/about/Process";
import { CtaBanner } from "@/components/about/CtaBanner";
import { Faq } from "@/components/about/Faq";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { getFeaturedProjects } from "@/lib/data";
import { pageSeo } from "@/lib/seo";
import { aboutSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const description =
  "Vznikli jsme, protože nás štvala ruční práce, co má dělat software. Jak pracujeme, co umíme a na co se nás klienti ptají nejčastěji.";

export const metadata: Metadata = {
  title: "O nás",
  ...pageSeo({ path: "/o-nas", title: "O nás", description }),
};

export default async function AboutPage() {
  const projects = await getFeaturedProjects();
  return (
    <>
      <JsonLd data={aboutSchema()} />
      <AboutExtended />
      <Process />
      <ProjectsSection projects={projects} tone="white" />
      <CtaBanner />
      <Faq />
    </>
  );
}
