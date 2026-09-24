import { services } from "@/lib/content";
import { Button, Chip, Container, Eyebrow, Heading, HudCorners } from "@/components/ui";
import { IconChart, IconChip, IconCode, IconRefresh, IconSpark, IconTarget } from "@/components/ui/Icons";

const icons = { chart: IconChart, spark: IconSpark, code: IconCode, target: IconTarget } as const;

export function Services() {
  return (
    <section id="sluzby" className="scroll-mt-20 bg-white">
      <Container className="flex flex-col gap-10 py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <Eyebrow>SLUŽBY</Eyebrow>
            <Heading>Co pro vás postavíme</Heading>
          </div>
          <div data-reveal="left" className="self-start"><Button href="/projekty" variant="outline">Naše projekty</Button></div>
        </div>

        {/* Featured */}
        <article data-scrub-scale data-tilt="3" className="group/feat relative grid gap-10 overflow-hidden rounded-card bg-ink-2 p-8 texture-dots texture-grain md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <HudCorners />
          <div className="relative flex flex-col gap-5">
            <span className="self-start rounded-full bg-lime px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink">{services.featured.badge}</span>
            <h3 className="font-display text-[28px] font-extrabold text-white md:text-[32px]">{services.featured.title}</h3>
            <p className="max-w-[480px] text-[15.5px] leading-relaxed text-white/65">{services.featured.text}</p>
            <div className="flex flex-wrap gap-2">
              {services.featured.chips.map((c) => <Chip key={c} tone="dark">{c}</Chip>)}
            </div>
          </div>
          <div className="relative flex gap-6 self-center">
            <div className="grid size-[130px] place-items-center rounded-[26px] rounded-tr-[70px] bg-gradient-to-br from-lime to-yellow text-ink transition-transform duration-700 ease-out group-hover/feat:-rotate-6 group-hover/feat:-translate-y-2 md:size-[180px]"><IconRefresh className="transition-transform duration-700 ease-out group-hover/feat:rotate-180" /></div>
            <div className="grid size-[130px] place-items-center rounded-[26px] rounded-tl-[70px] bg-gradient-to-br from-lime to-yellow text-ink transition-transform duration-700 ease-out group-hover/feat:rotate-6 group-hover/feat:translate-y-2 md:size-[180px]"><IconChip className="transition-transform duration-700 ease-out group-hover/feat:scale-110" /></div>
          </div>
        </article>

        <ul data-reveal-group className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.secondary.map((s, i) => {
            const Icon = icons[s.icon as keyof typeof icons];
            return (
              <li key={s.title} className="hairline-light card-hover group flex flex-col gap-4 rounded-card p-7">
                <span className={`grid size-11 place-items-center rounded-xl text-ink transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110 ${i % 2 ? "bg-yellow" : "bg-lime"}`}><Icon /></span>
                <h3 className="font-display text-[20px] font-extrabold text-ink">{s.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-muted">{s.text}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  {s.chips.map((c) => <Chip key={c}>{c}</Chip>)}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
