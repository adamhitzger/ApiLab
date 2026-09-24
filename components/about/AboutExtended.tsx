import { about } from "@/lib/content";
import { Container, Eyebrow, Heading, NumberBadge } from "@/components/ui";

export function AboutExtended() {
  return (
    <section className="bg-paper">
      <Container className="flex flex-col gap-14 py-16 md:py-24">
        <div className="flex max-w-[820px] flex-col gap-5">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <span data-reveal="left" className="h-[3px] w-7 rounded-sm bg-lime" />
          <Heading as="h1" className="md:text-[44px]">{about.title}</Heading>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} data-reveal="up" className="text-[16px] leading-relaxed text-muted md:text-[17px]">{p}</p>
          ))}
          <ul data-reveal="up" className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[13.5px] font-medium text-muted">
            {about.stats.map((s, i) => (
              <li key={s} className="flex items-center gap-5">
                {i > 0 && <span className="size-[3px] rounded-full bg-muted" />}
                <span data-count>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul data-reveal-group className="grid gap-6 md:grid-cols-3">
          {about.pillars.map((p, i) => (
            <li key={p.title} className="hairline-light card-hover group flex flex-col gap-4 rounded-card p-7 md:p-8">
              <NumberBadge n={i + 1} tone={i === 1 ? "yellow" : "lime"} />
              <h3 className="font-display text-[21px] font-extrabold text-ink">
                {p.accent ? (<><span className="text-gradient">{p.accent}</span>{p.title.slice(p.accent.length)}</>) : p.title}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
