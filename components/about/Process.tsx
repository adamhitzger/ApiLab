import { process } from "@/lib/content";
import { Container, Eyebrow, Heading, NumberBadge } from "@/components/ui";

export function Process() {
  return (
    <section className="relative overflow-hidden bg-ink-2 texture-dots texture-grain">
      <Container className="relative flex flex-col gap-12 py-20 md:py-28">
        <div className="flex flex-col gap-4">
          <Eyebrow tone="light">{process.eyebrow}</Eyebrow>
          <Heading tone="light" className="max-w-[700px]">{process.title}</Heading>
        </div>
        <ol data-reveal-group className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {process.steps.map((s, i) => (
            <li key={s.title} className="card-hover group flex flex-col gap-4 rounded-card border border-transparent bg-white p-7">
              <div className="flex items-center justify-between gap-3">
                <NumberBadge n={i + 1} tone={i % 2 ? "yellow" : "lime"} size={40} radius={11} />
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{s.when}</span>
              </div>
              <h3 className="font-display text-[19px] font-extrabold text-ink">{s.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
