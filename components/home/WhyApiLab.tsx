import { why } from "@/lib/content";
import { Container, Eyebrow, Heading, NumberBadge } from "@/components/ui";

export function WhyApiLab() {
  return (
    <section className="relative overflow-hidden bg-ink-2 texture-dots texture-grain">
      <div data-hazard className="hazard-stripe absolute inset-x-0 top-0 h-1.5" aria-hidden />
      <Container className="relative flex flex-col gap-14 py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-[520px_1fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <Eyebrow tone="light">{why.eyebrow}</Eyebrow>
            <span data-reveal="left" className="h-[3px] w-7 rounded-sm bg-lime" />
            <Heading tone="light">{why.title}</Heading>
          </div>
          <p data-reveal="up" className="max-w-[480px] text-[16px] leading-relaxed text-white/60 md:pt-11 md:text-[17px]">{why.lead}</p>
        </div>

        <ul data-reveal-group className="grid gap-6 md:grid-cols-3">
          {why.pillars.map((p, i) => (
            <li key={p.title} className="hairline-dark card-hover-dark group flex flex-col gap-4 rounded-card p-7 md:p-8">
              <NumberBadge n={i + 1} tone={i === 1 ? "yellow" : "lime"} />
              <h3 className="font-display text-[21px] font-extrabold text-white">{p.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-white/55">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
