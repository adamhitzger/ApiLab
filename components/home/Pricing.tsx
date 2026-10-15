import { pricing } from "@/lib/content";
import { Button, Container, cx, Eyebrow, Heading } from "@/components/ui";
import { IconCheck } from "@/components/ui/Icons";

type Plan = (typeof pricing.plans)[number];

function PlanGrid({ plans, period }: { plans: Plan[]; period: string }) {
  return (
    <ul data-reveal-group className="grid gap-6 lg:grid-cols-3">
      {plans.map((plan) => (
        <li
          key={plan.name}
          className={cx("group flex flex-col gap-6 rounded-card p-8 md:p-9", plan.featured ? "card-hover-dark bg-ink-2 text-white lg:-translate-y-3" : "card-hover hairline-light text-ink")}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[22px] font-extrabold">{plan.name}</h3>
            {plan.featured && <span className="shrink-0 rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-ink">Doporučujeme</span>}
          </div>
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span data-count className="font-display text-[34px] font-extrabold">{plan.price}</span>
            <span className={cx("text-[13px]", plan.featured ? "text-white/50" : "text-muted")}>{period}</span>
          </p>
          <p className={cx("text-[14.5px] leading-relaxed", plan.featured ? "text-white/60" : "text-muted")}>{plan.note}</p>
          <hr className={plan.featured ? "border-white/10" : "border-line"} />
          <ul className="flex flex-col gap-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px]">
                <IconCheck className="mt-0.5 shrink-0 text-lime transition-transform duration-300 group-hover:scale-125" /> {f}
              </li>
            ))}
          </ul>
          <Button href="/#kontakt" variant={plan.featured ? "lime" : "outline"} arrow={false} className="mt-auto w-full">
            {plan.cta}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export function Pricing() {
  return (
    <section id="cenik" className="scroll-mt-20 bg-paper">
      <Container className="flex flex-col gap-14 py-20 md:py-28">
        <div className="flex flex-col gap-4">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <Heading>{pricing.title}</Heading>
          <p data-reveal="up" className="max-w-[680px] text-[16px] leading-relaxed text-muted">{pricing.lead}</p>
        </div>
        <PlanGrid plans={pricing.plans} period={pricing.period} />

        <div id="cenik-weby" className="flex scroll-mt-24 flex-col gap-4 border-t border-line pt-14 md:pt-20">
          <h3 data-split className="font-display text-[28px] font-extrabold leading-[1.1] text-ink md:text-[34px]">{pricing.web.title}</h3>
          <p data-reveal="up" className="max-w-[680px] text-[16px] leading-relaxed text-muted">{pricing.web.lead}</p>
        </div>
        <PlanGrid plans={pricing.web.plans} period={pricing.web.period} />
      </Container>
    </section>
  );
}
