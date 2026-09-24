import type { Metadata } from "next";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { CtaBanner } from "@/components/about/CtaBanner";
import { getProjects } from "@/lib/data";
import { Container } from "@/components/ui";
import { pageSeo } from "@/lib/seo";
import { projectsSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const description =
  "Automatizace, které už běží v provozu — CNC výroba, scraping leadů, synchronizace CRM a mailingu, ověřování QR plateb.";

export const metadata: Metadata = {
  title: "Projekty",
  ...pageSeo({ path: "/projekty", title: "Projekty · AUTOMA", description }),
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <JsonLd data={projectsSchema(projects, description)} />
      <ProjectsHero count={projects.length} />
      {projects.length > 0 ? (
        <ProjectsList projects={projects} />
      ) : (
        <section className="bg-paper">
          <Container className="py-20 md:py-28">
            <div data-reveal="up" className="hairline-light flex flex-col items-start gap-4 rounded-card p-8 md:p-12">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-muted">Připravujeme</p>
              <h2 className="font-display text-[26px] font-extrabold leading-tight text-ink md:text-[32px]">Případové studie právě sepisujeme.</h2>
              <p className="max-w-[560px] text-[16px] leading-relaxed text-muted">
                První automatizace už běží u klientů — detaily s popisem problému, řešení a výsledků tu přistanou v nejbližších týdnech. Mezitím se ozvěte a probereme rovnou tu vaši.
              </p>
            </div>
          </Container>
        </section>
      )}
      <CtaBanner
        title="Máte podobný proces, který zatím děláte ručně?"
        text="Řekneme vám na rovinu, jestli se automatizace vyplatí — a za kolik měsíčně."
      />
    </>
  );
}
