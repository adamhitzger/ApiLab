import { hero } from "@/lib/content";
import { Button, Container, Pill } from "@/components/ui";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container className="grid items-center gap-12 py-14 md:py-[72px] lg:grid-cols-[600px_1fr] lg:gap-14">
        <div className="flex flex-col gap-7">
          <div data-hero-item className="self-start"><Pill>{hero.eyebrow}</Pill></div>
          <h1 data-hero-title className="font-display text-[42px] font-extrabold leading-[0.98] text-ink md:text-[66px]">
            Procesy,
            <br />
            co <span className="text-gradient">makají</span>
            <br />
            za vás.
          </h1>
          <p data-hero-item className="max-w-[520px] text-[16px] leading-relaxed text-muted md:text-[18px]">{hero.lead}</p>
          <div data-hero-item className="flex flex-col gap-3.5 sm:flex-row">
            <Button href="/#kontakt">Domluvit konzultaci</Button>
            <Button href="/#sluzby" variant="outline" arrow={false}>Naše služby</Button>
          </div>
          <ul data-hero-item className="flex flex-col gap-2 text-[13px] font-medium text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
            {hero.stats.map((s, i) => (
              <li key={s} className="flex items-center gap-2 sm:gap-5">
                {i > 0 && <span className="hidden size-[3px] rounded-full bg-muted sm:block" />}
                <span className="size-1.5 rounded-full bg-lime sm:hidden" />
                <span data-count>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}
