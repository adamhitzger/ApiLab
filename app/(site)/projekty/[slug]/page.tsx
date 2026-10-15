import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/about/CtaBanner";
import { ProjectCard } from "@/components/home/ProjectsSection";
import { ProjectArticle } from "@/components/projects/ProjectArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button, Chip, Container, Eyebrow, Heading } from "@/components/ui";
import { getProject, getProjects, getProjectSlugs } from "@/lib/data";
import { projectSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.heading,
    ...pageSeo({ path: `/projekty/${project.slug}`, title: project.heading, description: project.overview, type: "article" }),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  // Další projekty: nejdřív ze stejné kategorie, pak ostatní — max. dva.
  const others = projects.filter((p) => p._id !== project._id);
  const related = [
    ...others.filter((p) => p.category?.slug === project.category?.slug),
    ...others.filter((p) => p.category?.slug !== project.category?.slug),
  ].slice(0, 2);

  return (
    <>
      <JsonLd data={projectSchema(project)} />

      <section className="bg-white">
        <Container className="flex flex-col gap-7 pb-12 pt-10 md:pb-16 md:pt-[72px]">
          <nav aria-label="Drobečková navigace" data-hero-item className="text-[13px] font-medium text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-ink">Úvod</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/projekty" className="hover:text-ink">Projekty</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="line-clamp-1 text-ink">{project.heading}</li>
            </ol>
          </nav>
          {project.category && (
            <p data-hero-item className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-muted">{project.category.name}</p>
          )}
          <h1 data-hero-title className="max-w-[900px] font-display text-[38px] font-extrabold leading-[1.04] text-ink md:text-[60px]">
            {project.heading}
          </h1>
          {project.heading2 && <p data-hero-item className="text-[15px] font-semibold text-muted md:text-[16px]">{project.heading2}</p>}
          {project.overview && (
            <p data-hero-item className="max-w-[720px] text-[17px] leading-relaxed text-ink/75 md:text-[19px]">{project.overview}</p>
          )}
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_340px] lg:gap-20">
          <article>
            {project.text?.length ? (
              <ProjectArticle value={project.text} />
            ) : (
              <p className="max-w-[720px] text-[17px] leading-[1.7] text-ink/80">Podrobný popis projektu právě sepisujeme.</p>
            )}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal="up" className="flex flex-col gap-6 rounded-card bg-ink-2 p-7 text-white ring-1 ring-white/10 texture-dots md:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40">V kostce</p>
              {project.category && (
                <div className="flex flex-col gap-1">
                  <span className="text-[12.5px] text-white/50">Oblast</span>
                  <span className="text-[15px] font-semibold">{project.category.name}</span>
                </div>
              )}
              {project.heading2 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[12.5px] text-white/50">Tok dat</span>
                  <span className="text-[15px] font-semibold leading-snug">{project.heading2}</span>
                </div>
              )}
              {project.pills?.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <span className="text-[12.5px] text-white/50">Technologie</span>
                  <div className="flex flex-wrap gap-2">
                    {project.pills.map((c) => <Chip key={c} tone="dark">{c}</Chip>)}
                  </div>
                </div>
              )}
              <hr className="border-white/10" />
              <p className="text-[14.5px] leading-relaxed text-white/60">Máte podobný proces? Řekneme vám na rovinu, jestli se automatizace vyplatí.</p>
              <Button href="/#kontakt" variant="lime" className="w-full">Chci podobné řešení</Button>
            </div>
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-white">
          <Container className="flex flex-col gap-10 py-20 md:py-24">
            <div className="flex flex-col gap-4">
              <Eyebrow>DALŠÍ PROJEKTY</Eyebrow>
              <Heading>Co dalšího už běží</Heading>
            </div>
            <ul data-reveal-group className="grid gap-6 lg:grid-cols-2">
              {related.map((p, i) => (
                <li key={p._id}><ProjectCard project={p} index={i} /></li>
              ))}
            </ul>
            <div data-reveal="up" className="self-start"><Button href="/projekty" variant="outline">Všechny projekty</Button></div>
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
