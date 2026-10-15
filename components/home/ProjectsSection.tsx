import Link from "next/link";
import type { Project } from "@/types";
import { Button, Chip, Container, Eyebrow, Heading, NumberBadge } from "@/components/ui";

export function ProjectCard({ project, index, chipTone = "light" }: { project: Project; index: number; chipTone?: "light" | "outline" }) {
  return (
    <article className="card-hover group flex h-full flex-col gap-4 rounded-card border border-line bg-white p-7 md:p-9">
      <div className="flex items-center gap-3">
        <NumberBadge n={index + 1} tone={index % 2 ? "yellow" : "lime"} size={38} radius={11} />
        {project.category && <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{project.category.name}</span>}
      </div>
      <h3 className="font-display text-[22px] font-extrabold leading-tight text-ink md:text-[23px]">{project.heading}</h3>
      {project.heading2 && <p className="text-[14px] font-semibold text-muted">{project.heading2}</p>}
      <p className="text-[15.5px] leading-relaxed text-muted">{project.overview}</p>
      {project.pills?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.pills.map((p) => <Chip key={p} tone={chipTone}>{p}</Chip>)}
        </div>
      )}
      <Link href={`/projekty/${project.slug}`} className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[14px] font-medium text-ink">
        Detail projektu <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      </Link>
    </article>
  );
}

export function ProjectsSection({ projects, tone = "paper" }: { projects: Project[]; tone?: "paper" | "white" }) {
  if (projects.length === 0) return null;
  return (
    <section id="projekty" className={`relative scroll-mt-20 overflow-hidden ${tone === "paper" ? "bg-paper" : "bg-white"}`}>
      <div data-parallax="0.5" className="glow-lime-soft pointer-events-none absolute -top-20 left-[10%] h-[460px] w-[560px]" />
      <Container className="relative flex flex-col gap-12 py-20 md:py-28">
        <div className="flex flex-col gap-4">
          <Eyebrow>PROJEKTY</Eyebrow>
          <Heading className="max-w-[700px]">Automatizace, které už běží u klientů</Heading>
        </div>
        <ul data-reveal-group className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p._id}><ProjectCard project={p} index={i} chipTone={tone === "paper" ? "outline" : "light"} /></li>
          ))}
        </ul>
        <div data-reveal="up" className="self-start"><Button href="/projekty" variant="outline">Všechny projekty</Button></div>
      </Container>
    </section>
  );
}
